from django.urls import path
from .views import (
    get_cities,
    search_flights,
    flight_status,
    create_booking,
    lookup_pnr,
    list_user_bookings,
    ai_assistant_chat,
    staff_analytics,
)

urlpatterns = [
    path("cities/", get_cities, name="flight_cities"),
    path("search/", search_flights, name="flight_search"),
    path("status/", flight_status, name="flight_status"),
    path("book/", create_booking, name="create_booking"),
    path("pnr/<str:pnr>/", lookup_pnr, name="lookup_pnr"),
    path("my-bookings/", list_user_bookings, name="user_bookings"),
    path("assistant/", ai_assistant_chat, name="ai_assistant_chat"),
    path("analytics/", staff_analytics, name="staff_analytics"),
]
