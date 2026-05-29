from sqlalchemy import Column, Integer, DateTime
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from app.core.database import Base


class StopHistory(Base):
    __tablename__ = "stop_history"

    id = Column(Integer, primary_key=True, index=True)

    trip_id = Column(Integer, ForeignKey("trips.id"))

    stop_id = Column(Integer, ForeignKey("stops.id"))

    arrival_time = Column(DateTime, nullable=True)

    departure_time = Column(DateTime, nullable=True)

    delay_minutes = Column(Integer, default=0)

    created_at = Column(DateTime, default=datetime.utcnow)

    trip = relationship("Trip", back_populates="stop_histories")

    stop = relationship("Stop")