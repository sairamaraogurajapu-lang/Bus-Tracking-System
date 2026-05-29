from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter(
    prefix="/routes",
    tags=["Routes"]
)

# Route Model
class Route(BaseModel):
    route_id: int
    bus_number: str
    route_name: str
    starting_point: str
    ending_point: str
    middle_stops: List[str]
    total_distance_km: float
    estimated_time: str

# GET ALL ROUTES
@router.get("/")
def get_routes():
    return {
        "message": "All routes fetched successfully"
    }

# ADD ROUTE
@router.post("/")
def add_route(route: Route):
    return {
        "message": "Route added successfully",
        "route_data": route
    }

# UPDATE ROUTE
@router.put("/{route_id}")
def update_route(route_id: int, route: Route):
    return {
        "message": f"Route {route_id} updated successfully",
        "updated_route": route
    }

# DELETE ROUTE
@router.delete("/{route_id}")
def delete_route(route_id: int):
    return {
        "message": f"Route {route_id} deleted successfully"
    }

# GET SINGLE ROUTE
@router.get("/{route_id}")
def get_single_route(route_id: int):
    return {
        "route_id": route_id,
        "bus_number": "BUS-101",
        "route_name": "Miyapur Route",
        "starting_point": "Point A",
        "ending_point": "Point I",
        "middle_stops": [
            "Point B",
            "Point C",
            "Point D",
            "Point E",
            "Point F",
            "Point G",
            "Point H"
        ],
        "total_distance_km": 35,
        "estimated_time": "1 Hour 30 Minutes"
    }