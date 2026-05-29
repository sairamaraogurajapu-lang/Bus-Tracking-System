from sqlalchemy import Column, Integer, String
from sqlalchemy import ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from app.core.database import Base


class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)

    student_id = Column(Integer, ForeignKey("students.id"))

    bus_id = Column(Integer, ForeignKey("buses.id"))

    trip_id = Column(Integer, ForeignKey("trips.id"))

    status = Column(String, default="Absent")
    # Present / Absent / Picked / Dropped

    pickup_time = Column(DateTime, nullable=True)

    drop_time = Column(DateTime, nullable=True)

    attendance_date = Column(DateTime, default=datetime.utcnow)

    student = relationship("Student", back_populates="attendance")

    bus = relationship("Bus")

    trip = relationship("Trip")