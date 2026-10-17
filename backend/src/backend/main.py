from fastapi import FastAPI

from backend.routers import artists, deezer, playlists, tracks

app = FastAPI()
app.include_router(artists.router)
app.include_router(deezer.router)
app.include_router(playlists.router)
app.include_router(tracks.router)


@app.get("/api/health")
def get_health():
    return {"status": "ok"}
