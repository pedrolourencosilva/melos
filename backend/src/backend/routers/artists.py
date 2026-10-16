from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.database import get_session
from backend.errors import ArtistNotFoundError
from backend.schemas.artists import ArtistDetail, ArtistRead
from backend.schemas.common import DbInt
from backend.services import artists as artist_service

router = APIRouter(prefix="/api/artists", tags=["artists"])


@router.get("", response_model=list[ArtistRead], status_code=200)
def list_artists(session: Annotated[Session, Depends(get_session)]):
    return artist_service.list_artists(session)


@router.get("/{artist_id}", response_model=ArtistDetail, status_code=200)
def get_artist(artist_id: DbInt, session: Annotated[Session, Depends(get_session)]):
    try:
        return artist_service.get_artist(session, artist_id)
    except ArtistNotFoundError:
        raise HTTPException(status_code=404, detail="Artist not found")
