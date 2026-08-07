"""FastAPI application entrypoint.

Local development:
uvicorn app.main:app --reload
(from inside the backend/ directory, with your virtualenv activated)

Production (Render):
uvicorn app.main:app --host 0.0.0.0 --port $PORT

"""

import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Load backend/.env before anything else reads os.environ.
load_dotenv()

from app.api.generate import router as generate_router  # noqa: E402

app = FastAPI(
    title="DexterLens API",
    description="Turns a YouTube video's transcript into a promptable text source.",
    version="0.1.0",
)

frontend_origin = os.environ.get(
    "FRONTEND_ORIGIN",
    "http://localhost:3000",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_origin],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(generate_router)


@app.get("/health")
def health_check() -> dict[str, str]:
    """Simple endpoint to confirm the server is running."""
    return {"status": "ok"}

@app.get("/")
def root():
    return {
        "message": "DexterLens API is running 🚀",
        "docs": "/docs",
        "health": "/health"
    }
