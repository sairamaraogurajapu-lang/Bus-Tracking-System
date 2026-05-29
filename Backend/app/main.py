from fastapi import FastAPI

from app.routers.student_router import router as student_router
from app.routers.driver_router import router as driver_router
from app.routers.auth_router import router as auth_router
from app.routers.bus_router import router as bus_router
from app.routers.tracking_router import router as tracking_router

app = FastAPI(title="School Bus Tracking System")

# Include Routers
app.include_router(student_router)
app.include_router(driver_router)
app.include_router(auth_router)
app.include_router(bus_router)
app.include_router(tracking_router)

@app.get("/")
def home():
    return {
        "message": "School Bus Tracking System API Running Successfully"
    }