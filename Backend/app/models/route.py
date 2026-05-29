from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.core.database import Base


class Route(Base):
    __tablename__ = "routes"

    id = Column(Integer, primary_key=True, index=True)

    route_name = Column(String, nullable=False)

    bus_id = Column(Integer, ForeignKey("buses.id"))

    start_point = Column(String, nullable=False)

    end_point = Column(String, nullable=False)

    # Example:
    # A,B,C,D,E,F,G
    middle_stops = Column(String, nullable=True)

    total_stops = Column(Integer, default=0)

    bus = relationship("Bus", back_populates="routes")