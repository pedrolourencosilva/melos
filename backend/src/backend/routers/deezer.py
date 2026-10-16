from fastapi import APIRouter, HTTPException

from backend.errors import DeezerUnavailableError
from backend.schemas.deezer import DeezerTrackRead
from backend.services import deezer as deezer_service

router = APIRouter(prefix="/api/deezer", tags=["deezer"])


@router.get("/tracks", response_model=list[DeezerTrackRead], status_code=200)
def search_tracks(q: str):
    try:
        return deezer_service.search_tracks(q)
    except DeezerUnavailableError:
        raise HTTPException(status_code=502, detail="Deezer is unavailable")
