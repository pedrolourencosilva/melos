from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.database import get_session
from backend.errors import (
    PlaylistNotFoundError,
    PlaylistTrackNotFoundError,
    TrackNotFoundError,
)
from backend.schemas.playlists import (
    PlaylistCreate,
    PlaylistDetail,
    PlaylistRead,
    PlaylistTrackCreate,
    PlaylistTrackRead,
    PlaylistUpdate,
)
from backend.services import playlists as playlist_service

router = APIRouter(prefix="/api/playlists", tags=["playlists"])


@router.get("", response_model=list[PlaylistRead], status_code=200)
def list_playlists(session: Annotated[Session, Depends(get_session)]):
    return playlist_service.list_playlists(session)


@router.post("", response_model=PlaylistRead, status_code=201)
def create_playlist(
    data: PlaylistCreate, session: Annotated[Session, Depends(get_session)]
):
    return playlist_service.create_playlist(session, data.name)


@router.delete("/{playlist_id}", status_code=204)
def delete_playlist(
    playlist_id: int, session: Annotated[Session, Depends(get_session)]
):
    try:
        playlist_service.delete_playlist(session, playlist_id)
    except PlaylistNotFoundError:
        raise HTTPException(status_code=404, detail="Playlist not found")


@router.get("/{playlist_id}", response_model=PlaylistDetail, status_code=200)
def get_playlist(playlist_id: int, session: Annotated[Session, Depends(get_session)]):
    try:
        return playlist_service.get_playlist(session, playlist_id)
    except PlaylistNotFoundError:
        raise HTTPException(status_code=404, detail="Playlist not found")


@router.put("/{playlist_id}", response_model=PlaylistRead, status_code=200)
def update_playlist(
    playlist_id: int,
    data: PlaylistUpdate,
    session: Annotated[Session, Depends(get_session)],
):
    try:
        return playlist_service.update_playlist(session, playlist_id, data.name)
    except PlaylistNotFoundError:
        raise HTTPException(status_code=404, detail="Playlist not found")


@router.post("/{playlist_id}/tracks", response_model=PlaylistTrackRead, status_code=201)
def add_track(
    playlist_id: int,
    data: PlaylistTrackCreate,
    session: Annotated[Session, Depends(get_session)],
):
    try:
        return playlist_service.add_track(session, playlist_id, data.track_id)
    except PlaylistNotFoundError:
        raise HTTPException(status_code=404, detail="Playlist not found")
    except TrackNotFoundError:
        raise HTTPException(status_code=422, detail="Track not found")


@router.delete("/{playlist_id}/tracks/{position}", status_code=204)
def remove_track(
    playlist_id: int,
    position: int,
    session: Annotated[Session, Depends(get_session)],
):
    try:
        playlist_service.remove_track(session, playlist_id, position)
    except PlaylistNotFoundError:
        raise HTTPException(status_code=404, detail="Playlist not found")
    except PlaylistTrackNotFoundError:
        raise HTTPException(status_code=404, detail=f"No track at position {position}")
