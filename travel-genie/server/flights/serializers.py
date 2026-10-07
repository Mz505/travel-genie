from rest_framework import serializers
from .models import PassengerBooking

class PassengerBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = PassengerBooking
        fields = [
            "id",
            "pnr",
            "passenger_name",
            "passenger_email",
            "passenger_phone",
            "passport_number",
            "passport_expiry",
            "nationality",
            "flight_number",
            "origin",
            "origin_city",
            "destination",
            "destination_city",
            "departure_date",
            "departure_time",
            "arrival_time",
            "cabin_class",
            "seat_number",
            "baggage_allowance",
            "total_price_usd",
            "status",
            "is_demo",
            "special_requests",
            "created_at",
        ]
        read_only_fields = ["id", "pnr", "is_demo", "created_at"]
