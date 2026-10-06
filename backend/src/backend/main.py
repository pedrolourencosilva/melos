from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routers import artists, playlists, tracks

app = FastAPI()
app.include_router(artists.router)
app.include_router(playlists.router)
app.include_router(tracks.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def get_health():
    return {"status": "ok"}
