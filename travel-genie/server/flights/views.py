from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime, date

from .data import KAM_AIR_CITIES, KAM_AIR_SCHEDULES, BAGGAGE_RULES, OFFICIAL_SUPPORT_CHANNELS
from .models import PassengerBooking
from .serializers import PassengerBookingSerializer
from .ai_assistant import answer_passenger_query


@api_view(["GET"])
@permission_classes([AllowAny])
def get_cities(request):
    """
    Returns list of verified Kam Air network cities and airport hubs.
    """
    return Response({
        "status": "success",
        "count": len(KAM_AIR_CITIES),
        "cities": KAM_AIR_CITIES,
    })


@api_view(["GET"])
@permission_classes([AllowAny])
def search_flights(request):
    """
    Flight search service layer (Prototype / Mock Service).
    Easily replaceable with GDS / Kam Air API in production.
    """
    origin = request.query_params.get("origin", "").strip().upper()
    destination = request.query_params.get("destination", "").strip().upper()
    dep_date = request.query_params.get("date", date.today().isoformat())
    passengers = int(request.query_params.get("passengers", 1))
    cabin_class = request.query_params.get("cabinClass", "Economy")
    multiplier = 2.2 if cabin_class == "Business" else 1.0

    matching = []
    for f in KAM_AIR_SCHEDULES:
        if origin and f["origin"] != origin:
            continue
        if destination and f["destination"] != destination:
            continue
        
        price = round(f["basePriceUSD"] * multiplier)
        matching.append({
            **f,
            "cabinClass": cabin_class,
            "passengers": passengers,
            "priceUSD": price,
            "priceAFN": round(f["basePriceAFN"] * multiplier),
            "totalPriceUSD": price * passengers,
            "baggage": BAGGAGE_RULES["business"] if cabin_class == "Business" else BAGGAGE_RULES["economy"],
            "airline": "Kam Air",
            "airlineCode": "RQ",
            "isDemo": True,
        })

    return Response({
        "status": "success",
        "query": {
            "origin": origin,
            "destination": destination,
            "departureDate": dep_date,
            "passengers": passengers,
            "cabinClass": cabin_class,
        },
        "count": len(matching),
        "flights": matching,
        "disclosure": "Kam Air Digital Prototype — Demo Flight Data Service Layer",
    })


@api_view(["GET"])
@permission_classes([AllowAny])
def flight_status(request):
    """
    Flight status lookup endpoint by flight number or route.
    """
    flight_number = request.query_params.get("flightNumber", "").strip().upper()
    origin = request.query_params.get("origin", "").strip().upper()
    destination = request.query_params.get("destination", "").strip().upper()

    results = []
    for f in KAM_AIR_SCHEDULES:
        match_flight = not flight_number or f["flightNumber"] == flight_number or f["flightNumber"].replace("-", "") == flight_number
        match_origin = not origin or f["origin"] == origin
        match_dest = not destination or f["destination"] == destination

        if match_flight and (match_origin or match_dest):
            results.append({
                "flightNumber": f["flightNumber"],
                "airline": "Kam Air",
                "origin": f["origin"],
                "originCity": f["originCity"],
                "destination": f["destination"],
                "destinationCity": f["destinationCity"],
                "scheduledDeparture": f["departureTime"],
                "scheduledArrival": f["arrivalTime"],
                "estimatedDeparture": f["departureTime"],
                "estimatedArrival": f["arrivalTime"],
                "status": f.get("status", "On Time"),
                "aircraft": f["aircraft"],
                "terminalDeparture": f.get("terminalDeparture", "Main Terminal"),
                "terminalArrival": f.get("terminalArrival", "Main Terminal"),
                "gate": "Gate 04",
                "isDemo": True,
            })

    return Response({
        "status": "success",
        "count": len(results),
        "results": results,
        "disclaimer": "Flight status is simulated for demonstration and proposal review.",
    })


@api_view(["POST"])
@permission_classes([AllowAny])
def create_booking(request):
    """
    Simulates passenger booking and generates a verifiable PNR and e-ticket.
    """
    data = request.data.copy()
    user = request.user if request.user.is_authenticated else None
    
    serializer = PassengerBookingSerializer(data=data)
    if serializer.is_valid():
        booking = serializer.save(user=user)
        return Response({
            "status": "success",
            "message": "Kam Air ticket reserved successfully.",
            "booking": PassengerBookingSerializer(booking).data,
            "eTicket": {
                "ticketNumber": f"246-{booking.id:06d}-901",
                "airline": "Kam Air (RQ)",
                "pnr": booking.pnr,
                "passenger": booking.passenger_name,
                "flight": booking.flight_number,
                "date": booking.departure_date,
                "route": f"{booking.origin_city} ({booking.origin}) → {booking.destination_city} ({booking.destination})",
                "seat": booking.seat_number,
                "baggage": booking.baggage_allowance,
                "status": booking.status,
            }
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([AllowAny])
def lookup_pnr(request, pnr):
    """
    Passenger lookup by PNR reference code.
    """
    pnr_clean = pnr.strip().upper()
    try:
        booking = PassengerBooking.objects.get(pnr__iexact=pnr_clean)
        return Response({
            "status": "success",
            "booking": PassengerBookingSerializer(booking).data,
        })
    except PassengerBooking.DoesNotExist:
        # Fallback to simulated booking if matching known demo PNR format
        return Response({
            "status": "not_found",
            "message": f"No active reservation found for booking reference {pnr_clean}.",
        }, status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_user_bookings(request):
    """
    Returns all bookings associated with the authenticated passenger.
    """
    bookings = PassengerBooking.objects.filter(user=request.user).order_by("-created_at")
    serializer = PassengerBookingSerializer(bookings, many=True)
    return Response({
        "status": "success",
        "count": bookings.count(),
        "bookings": serializer.data,
    })


@api_view(["POST"])
@permission_classes([AllowAny])
def ai_assistant_chat(request):
    """
    Secure gateway for the Kam Air Passenger AI Assistant.
    """
    query = request.data.get("query") or request.data.get("prompt") or ""
    context = request.data.get("context", {})
    response_data = answer_passenger_query(query, context)
    return Response(response_data)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def staff_analytics(request):
    """
    Restricted analytics endpoint for Kam Air staff and management.
    """
    return Response({
        "status": "success",
        "portal": "Kam Air Executive & Route Intelligence",
        "summary": {
            "totalInquiries": 36700,
            "topRoute": "Kabul (KBL) → Dubai (DXB)",
            "aiConversionRate": "62.4%",
            "activeAircraft": 8,
        },
        "topRoutes": [
            {"route": "KBL → DXB", "share": 34, "searches": 12450},
            {"route": "KBL → DEL", "share": 21, "searches": 7820},
            {"route": "KBL → IST", "share": 15, "searches": 5490},
            {"route": "KBL → JED", "share": 12, "searches": 4380},
            {"route": "KBL → TAS", "share": 10, "searches": 3650},
        ]
    })
