from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

from app.core.database import Base


class Driver(Base):
    __tablename__ = "drivers"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    bus_id = Column(Integer, ForeignKey("buses.id"))

    license_number = Column(String, nullable=False)

    user = relationship("User")

    bus = relationship("Bus")