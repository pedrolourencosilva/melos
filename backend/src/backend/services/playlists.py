from sqlalchemy import func, select
from sqlalchemy.orm import Session

from backend.errors import (
    PlaylistNotFoundError,
    PlaylistTrackNotFoundError,
    TrackNotFoundError,
)
from backend.models import Playlist, PlaylistTrack, Track


def list_playlists(session: Session) -> list[Playlist]:
    return list(
        session.scalars(select(Playlist).order_by(Playlist.created_at.desc())).all()
    )


def create_playlist(session: Session, name: str) -> Playlist:
    playlist = Playlist(name=name)
    session.add(playlist)
    session.commit()
    session.refresh(playlist)
    return playlist


def delete_playlist(session: Session, playlist_id: int) -> None:
    playlist = session.get(Playlist, playlist_id)
    if playlist is None:
        raise PlaylistNotFoundError()
    session.delete(playlist)
    session.commit()


def get_playlist(session: Session, playlist_id: int) -> Playlist:
    playlist = session.get(Playlist, playlist_id)
    if playlist is None:
        raise PlaylistNotFoundError()
    return playlist


def update_playlist(session: Session, playlist_id: int, name: str) -> Playlist:
    playlist = session.get(Playlist, playlist_id)
    if playlist is None:
        raise PlaylistNotFoundError()
    playlist.name = name
    session.commit()
    return playlist


def add_track(session: Session, playlist_id: int, track_id: int) -> PlaylistTrack:
    playlist = session.get(Playlist, playlist_id)
    if playlist is None:
        raise PlaylistNotFoundError()
    track = session.get(Track, track_id)
    if track is None:
        raise TrackNotFoundError()
    max_position = session.scalar(
        select(func.max(PlaylistTrack.position)).where(
            PlaylistTrack.playlist_id == playlist_id
        )
    )
    position = (max_position or 0) + 1
    playlist_track = PlaylistTrack(
        playlist_id=playlist_id, track_id=track_id, position=position
    )
    session.add(playlist_track)
    session.commit()
    session.refresh(playlist_track)
    return playlist_track


def remove_track(session: Session, playlist_id: int, position: int) -> None:
    playlist = session.get(Playlist, playlist_id)
    if playlist is None:
        raise PlaylistNotFoundError()
    playlist_track = session.get(PlaylistTrack, (playlist_id, position))
    if playlist_track is None:
        raise PlaylistTrackNotFoundError()
    session.delete(playlist_track)
    session.commit()
