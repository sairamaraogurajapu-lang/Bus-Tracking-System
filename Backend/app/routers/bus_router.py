from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(
    prefix="/buses",
    tags=["Buses"]
)

class Bus(BaseModel):
    bus_id: int
    bus_number: str
    driver_name: str
    route_name: str
    capacity: int
    start_time: str
    end_time: str

# GET Buses
@router.get("/")
def get_buses():
    return {
        "message": "Buses fetched successfully"
    }

# ADD Bus
@router.post("/")
def add_bus(bus: Bus):
    return {
        "message": "Bus added successfully",
        "bus": bus
    }

# UPDATE Bus
@router.put("/{bus_id}")
def update_bus(bus_id: int, bus: Bus):
    return {
        "message": f"Bus {bus_id} updated successfully",
        "updated_data": bus
    }

# DELETE Bus
@router.delete("/{bus_id}")
def delete_bus(bus_id: int):
    return {
        "message": f"Bus {bus_id} deleted successfully"
    }