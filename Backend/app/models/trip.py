from sqlalchemy import Column, Integer, String, DateTime

from datetime import datetime

from app.database import Base


class Trip(Base):
    __tablename__ = "trips"

    id = Column(Integer, primary_key=True, index=True)
    bus_id = Column(Integer)
    driver_id = Column(Integer)

    start_time = Column(DateTime, default=datetime.utcnow)
    end_time = Column(DateTime)

    status = Column(String, default="Started")