from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(
    prefix="/tracking",
    tags=["Tracking"]
)

class LiveLocation(BaseModel):
    bus_number: str
    latitude: float
    longitude: float
    speed: float
    current_location: str
    status: str

class TravelHistory(BaseModel):
    bus_number: str
    driver_name: str
    start_time: str
    end_time: str
    total_travel_time: str
    total_distance: str

# LIVE LOCATION
@router.post("/live-location")
def update_live_location(location: LiveLocation):
    return {
        "message": "Live location updated successfully",
        "location_data": location
    }

# GET LIVE LOCATION
@router.get("/live-location")
def get_live_location():
    return {
        "bus_number": "BUS-101",
        "latitude": 17.3850,
        "longitude": 78.4867,
        "speed": 45,
        "current_location": "Hyderabad",
        "status": "Running"
    }

# TRAVEL HISTORY
@router.post("/travel-history")
def add_travel_history(history: TravelHistory):
    return {
        "message": "Travel history added successfully",
        "travel_history": history
    }

# GET TRAVEL HISTORY
@router.get("/travel-history")
def get_travel_history():
    return {
        "bus_number": "BUS-101",
        "driver_name": "Ramesh",
        "start_time": "7:00 AM",
        "end_time": "9:00 AM",
        "total_travel_time": "2 Hours",
        "total_distance": "40 KM"
    }