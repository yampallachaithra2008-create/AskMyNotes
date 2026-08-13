from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


app = FastAPI()


# CORS configuration
# This allows frontend running on localhost:5500 to call this backend.
origins = [
    "http://localhost:5500",
    "http://127.0.0.1:5500"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Pydantic model
# This defines the structure of the JSON request body.
# Basemodel - base class used to define data schemas, enforce type safety, and handle data validation or serialization.
class Feedback(BaseModel):
    student_name: str = Field(..., min_length=2)
    topic: str = Field(..., min_length=2)
    rating: int = Field(..., ge=1, le=5)
    comment: str = Field(..., min_length=5)
    
'''
tudent_name is required
It must be a string
Minimum length should be 2 characters
... means, the field is required.
ge = greater than or equal to
le = less than or equal to
'''

# Temporary in-memory storage
feedback_list = []


@app.get("/")
def home():
    return {
        "message": "FastAPI backend is running",
        "docs": "Open http://127.0.0.1:8000/docs"
    }


@app.post("/feedback", status_code=status.HTTP_201_CREATED)
def submit_feedback(feedback: Feedback):
    feedback_list.append(feedback)

    return {
        "message": "Feedback submitted successfully",
        "data": feedback
    }


@app.get("/feedback")
def get_all_feedback():
    return {
        "total_feedback": len(feedback_list),
        "feedback": feedback_list
    }