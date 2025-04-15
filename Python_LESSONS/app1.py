from fastapi import FastAPI
from pydantic import BaseModel
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from fastapi.middleware.cors import CORSMiddleware
from main3 import Variable_and_dataTypes, Introducing_list, Working_with_Lists

app = FastAPI()

# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (For development only; restrict in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize AI Model
llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash-exp",
    api_key="AIzaSyC26Bx9LGbiYFA5l9aj50lvPpJ59G0KWUg"
)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful Python programming assistant. When a user asks a question, provide a response related to Python programming, correcting any spelling mistakes in the user's query. Your responses should be comprehensive. If the user inquires about a topic unrelated to Python, politely inform them of the limitation."),
    ("user", "Question: {question}")
])

output_parser = StrOutputParser()
chain = prompt | llm | output_parser

# Define request model
class UserInput(BaseModel):
    question: str

@app.post("/get_response")
async def get_response(user_input: UserInput):
    response = chain.invoke({"question": user_input.question})
    return {"response": response}

@app.get("/Variable_DataTypes")
async def Variable_DataTypes(): 
    answer1 = Variable_and_dataTypes()
    return {"response": answer1}

@app.get("/Introducing_list")
async def get_list_introduction(): 
    answer2 = Introducing_list()
    return {"response": answer2}

@app.get("/Working_with_Lists")
async def get_working_with_lists(): 
    answer3 = Working_with_Lists()
    return {"response": answer3}