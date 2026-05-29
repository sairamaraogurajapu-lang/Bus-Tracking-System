from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(
    prefix="/drivers",
    tags=["Drivers"]
)

class Driver(BaseModel):
    driver_id: int
    name: str
    phone: str
    license_number: str
    experience_years: int
    assigned_bus: str

# GET Drivers
@router.get("/")
def get_drivers():
    return {
        "message": "Drivers fetched successfully"
    }

# ADD Driver
@router.post("/")
def add_driver(driver: Driver):
    return {
        "message": "Driver added successfully",
        "driver": driver
    }

# UPDATE Driver
@router.put("/{driver_id}")
def update_driver(driver_id: int, driver: Driver):
    return {
        "message": f"Driver {driver_id} updated successfully",
        "updated_data": driver
    }

# DELETE Driver
@router.delete("/{driver_id}")
def delete_driver(driver_id: int):
    return {
        "message": f"Driver {driver_id} deleted successfully"
    }