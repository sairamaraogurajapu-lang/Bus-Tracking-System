from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

class Register(BaseModel):
    username: str
    email: str
    password: str
    role: str

class Login(BaseModel):
    email: str
    password: str

# REGISTER
@router.post("/register")
def register(user: Register):
    return {
        "message": "Registration successful",
        "user": user
    }

# LOGIN
@router.post("/login")
def login(user: Login):
    return {
        "message": "Login successful",
        "user": user
    }