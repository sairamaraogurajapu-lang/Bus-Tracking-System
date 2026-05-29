from pydantic import BaseModel


class StudentCreate(BaseModel):
    name: str
    class_name: str
    phone: str
    address: str
    bus_id: int


class StudentResponse(StudentCreate):
    id: int

    class Config:
        orm_mode = True