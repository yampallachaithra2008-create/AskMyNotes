from fastapi import FastAPI
app = FastAPI()
@app.get("/")
def read_root():
    return{"message":"Hello,FastAPI!"}
@app.get("/greet")
def greet_user(name:str):
    return{"message":"Hello,"+name+"!"}