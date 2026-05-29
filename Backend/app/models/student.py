from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

from app.core.database import Base


class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    stop_id = Column(Integer, ForeignKey("stops.id"))

    bus_id = Column(Integer, ForeignKey("buses.id"))

    user = relationship("User")

    stop = relationship("Stop")

    bus = relationship("Bus")