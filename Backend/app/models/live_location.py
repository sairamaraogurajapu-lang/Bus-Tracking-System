from sqlalchemy import Column, Integer, Float, DateTime

from datetime import datetime

from app.database import Base


class LiveLocation(Base):
    __tablename__ = "live_locations"

    id = Column(Integer, primary_key=True, index=True)

    bus_id = Column(Integer)

    latitude = Column(Float)
    longitude = Column(Float)

    speed = Column(Float)

    timestamp = Column(DateTime, default=datetime.utcnow)