from pydantic import BaseModel


class DriverCreate(BaseModel):
    name: str
    phone: str
    license_number: str
    bus_id: int