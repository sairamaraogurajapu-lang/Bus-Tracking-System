from sqlalchemy import Column, Integer, String

from app.database import Base


class Bus(Base):
    __tablename__ = "buses"

    id = Column(Integer, primary_key=True, index=True)
    bus_number = Column(String, nullable=False)
    capacity = Column(Integer)
    driver_id = Column(Integer)
    route_id = Column(Integer)