from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship

from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String, nullable=False)

    email = Column(String, unique=True, nullable=False)

    phone_number = Column(String, unique=True, nullable=False)

    password = Column(String, nullable=False)

    role = Column(String, nullable=False)
    # admin / driver / student

    is_active = Column(Boolean, default=True)

    # Relationships
    notifications = relationship(
        "Notification",
        back_populates="user",
        cascade="all, delete"
    )