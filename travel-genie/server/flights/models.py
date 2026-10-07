import uuid
from django.db import models
from django.contrib.auth.models import User

def generate_pnr():
    return f"KAM-{uuid.uuid4().hex[:6].upper()}"

class PassengerBooking(models.Model):
    STATUS_CHOICES = [
        ("CONFIRMED", "Confirmed"),
        ("CHECKED_IN", "Checked In"),
        ("COMPLETED", "Completed"),
        ("CANCELLED", "Cancelled"),
    ]

    CABIN_CHOICES = [
        ("Economy", "Economy Class"),
        ("Business", "Business Class"),
    ]

    pnr = models.CharField(max_length=12, unique=True, default=generate_pnr)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="kam_air_bookings", null=True, blank=True)
    
    # Passenger Details
    passenger_name = models.CharField(max_length=200)
    passenger_email = models.EmailField()
    passenger_phone = models.CharField(max_length=50, blank=True)
    passport_number = models.CharField(max_length=50, blank=True)
    passport_expiry = models.DateField(null=True, blank=True)
    nationality = models.CharField(max_length=100, default="Afghan")

    # Flight Details
    flight_number = models.CharField(max_length=20)
    origin = models.CharField(max_length=10)
    origin_city = models.CharField(max_length=100)
    destination = models.CharField(max_length=10)
    destination_city = models.CharField(max_length=100)
    departure_date = models.DateField()
    departure_time = models.CharField(max_length=20)
    arrival_time = models.CharField(max_length=20)
    cabin_class = models.CharField(max_length=20, choices=CABIN_CHOICES, default="Economy")
    seat_number = models.CharField(max_length=10, default="12A")
    baggage_allowance = models.CharField(max_length=100, default="30 kg checked + 7 kg cabin")
    
    # Pricing & Status
    total_price_usd = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="CONFIRMED")
    is_demo = models.BooleanField(default=True)
    special_requests = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.pnr} - {self.passenger_name} ({self.flight_number})"
