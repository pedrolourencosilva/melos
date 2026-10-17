from typing import Annotated, Literal

from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session

from backend.database import get_session
from backend.errors import (
    ArtistNotFoundError,
    DeezerTrackNotFoundError,
    DeezerUnavailableError,
    TrackNotFoundError,
)
from backend.schemas.common import DbInt
from backend.schemas.tracks import TrackCreate, TrackRead, TrackUpdate
from backend.services import tracks as track_service

router = APIRouter(prefix="/api/tracks", tags=["tracks"])


@router.get("", response_model=list[TrackRead], status_code=200)
def list_tracks(
    session: Annotated[Session, Depends(get_session)],
    q: str = "",
    sort: Literal["title", "artist", "duration"] = "title",
):
    return track_service.list_tracks(session, q, sort)


@router.post("", response_model=TrackRead, status_code=201)
def create_track(
    data: TrackCreate,
    response: Response,
    session: Annotated[Session, Depends(get_session)],
):
    try:
        track, created = track_service.create_track(session, data.deezer_id)
    except DeezerTrackNotFoundError:
        raise HTTPException(status_code=422, detail="Deezer track not found")
    except DeezerUnavailableError:
        raise HTTPException(status_code=502, detail="Deezer is unavailable")
    if not created:
        response.status_code = 200
    return track


@router.get("/{track_id}", response_model=TrackRead, status_code=200)
def get_track(track_id: DbInt, session: Annotated[Session, Depends(get_session)]):
    try:
        return track_service.get_track(session, track_id)
    except TrackNotFoundError:
        raise HTTPException(status_code=404, detail="Track not found")


@router.put("/{track_id}", response_model=TrackRead, status_code=200)
def update_track(
    track_id: DbInt,
    data: TrackUpdate,
    session: Annotated[Session, Depends(get_session)],
):
    try:
        return track_service.update_track(
            session, track_id, data.title, data.artist_id, data.seconds
        )
    except TrackNotFoundError:
        raise HTTPException(status_code=404, detail="Track not found")
    except ArtistNotFoundError:
        raise HTTPException(status_code=422, detail="Artist not found")


@router.delete("/{track_id}", status_code=204)
def delete_track(track_id: DbInt, session: Annotated[Session, Depends(get_session)]):
    try:
        track_service.delete_track(session, track_id)
    except TrackNotFoundError:
        raise HTTPException(status_code=404, detail="Track not found")


@router.put("/{track_id}/like", status_code=204)
def like_track(track_id: DbInt, session: Annotated[Session, Depends(get_session)]):
    try:
        track_service.like_track(session, track_id)
    except TrackNotFoundError:
        raise HTTPException(status_code=404, detail="Track not found")


@router.delete("/{track_id}/like", status_code=204)
def unlike_track(track_id: DbInt, session: Annotated[Session, Depends(get_session)]):
    try:
        track_service.unlike_track(session, track_id)
    except TrackNotFoundError:
        raise HTTPException(status_code=404, detail="Track not found")
