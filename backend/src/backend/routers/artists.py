from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.database import get_session
from backend.errors import ArtistNotFoundError
from backend.schemas.artists import ArtistCreate, ArtistDetail, ArtistRead, ArtistUpdate
from backend.schemas.common import DbInt
from backend.services import artists as artist_service

router = APIRouter(prefix="/api/artists", tags=["artists"])


@router.get("", response_model=list[ArtistRead], status_code=200)
def list_artists(session: Annotated[Session, Depends(get_session)]):
    return artist_service.list_artists(session)


@router.post("", response_model=ArtistRead, status_code=201)
def create_artist(
    data: ArtistCreate, session: Annotated[Session, Depends(get_session)]
):
    return artist_service.create_artist(session, data.name)


@router.get("/{artist_id}", response_model=ArtistDetail, status_code=200)
def get_artist(artist_id: DbInt, session: Annotated[Session, Depends(get_session)]):
    try:
        return artist_service.get_artist(session, artist_id)
    except ArtistNotFoundError:
        raise HTTPException(status_code=404, detail="Artist not found")


@router.delete("/{artist_id}", status_code=204)
def delete_artist(artist_id: DbInt, session: Annotated[Session, Depends(get_session)]):
    try:
        artist_service.delete_artist(session, artist_id)
    except ArtistNotFoundError:
        raise HTTPException(status_code=404, detail="Artist not found")


@router.put("/{artist_id}", response_model=ArtistRead, status_code=200)
def update_artist(
    artist_id: DbInt,
    data: ArtistUpdate,
    session: Annotated[Session, Depends(get_session)],
):
    try:
        return artist_service.update_artist(session, artist_id, data.name)
    except ArtistNotFoundError:
        raise HTTPException(status_code=404, detail="Artist not found")
