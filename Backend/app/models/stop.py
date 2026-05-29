from sqlalchemy import Column, Integer, String
from sqlalchemy import ForeignKey, Float
from sqlalchemy.orm import relationship

from app.core.database import Base


class Stop(Base):
    __tablename__ = "stops"

    id = Column(Integer, primary_key=True, index=True)

    stop_name = Column(String, nullable=False)

    stop_order = Column(Integer, nullable=False)

    latitude = Column(Float, nullable=True)

    longitude = Column(Float, nullable=True)

    landmark = Column(String, nullable=True)

    estimated_time = Column(String, nullable=True)

    route_id = Column(Integer, ForeignKey("routes.id"))

    route = relationship("Route", back_populates="stops")