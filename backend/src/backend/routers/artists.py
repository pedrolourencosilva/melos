from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import backend.services.artists
from backend.database import get_session
from backend.schemas import ArtistCreate, ArtistRead

router = APIRouter(prefix="/api/artists", tags=["artists"])


@router.get("", response_model=list[ArtistRead], status_code=200)
def get_artists(session: Annotated[Session, Depends(get_session)]):
    return backend.services.artists.list_artists(session)


@router.post("", response_model=ArtistRead, status_code=201)
def create_artist(
    data: ArtistCreate, session: Annotated[Session, Depends(get_session)]
):
    return backend.services.artists.create_artist(session, data.name)
