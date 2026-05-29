from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(
    prefix="/students",
    tags=["Students"]
)

# Student Model
class Student(BaseModel):
    student_id: int
    name: str
    class_name: str
    section: str
    phone: str
    parent_name: str
    address: str
    assigned_bus: str

# GET Students
@router.get("/")
def get_students():
    return {
        "message": "Students fetched successfully"
    }

# ADD Student
@router.post("/")
def add_student(student: Student):
    return {
        "message": "Student added successfully",
        "student": student
    }

# UPDATE Student
@router.put("/{student_id}")
def update_student(student_id: int, student: Student):
    return {
        "message": f"Student {student_id} updated successfully",
        "updated_data": student
    }

# DELETE Student
@router.delete("/{student_id}")
def delete_student(student_id: int):
    return {
        "message": f"Student {student_id} deleted successfully"
    }