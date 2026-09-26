from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.errors import ArtistNotFoundError, TrackNotFoundError
from backend.models import Artist, Track


def list_tracks(session: Session) -> list[Track]:
    return list(session.scalars(select(Track).order_by(Track.title)).all())


def create_track(session: Session, title: str, artist_id: int, seconds: int) -> Track:
    artist = session.get(Artist, artist_id)
    if artist is None:
        raise ArtistNotFoundError()
    track = Track(title=title, artist_id=artist_id, seconds=seconds)
    session.add(track)
    session.commit()
    session.refresh(track)
    return track


def delete_track(session: Session, track_id: int) -> None:
    track = session.get(Track, track_id)
    if track is None:
        raise TrackNotFoundError()
    session.delete(track)
    session.commit()


def get_track(session: Session, track_id: int) -> Track:
    track = session.get(Track, track_id)
    if track is None:
        raise TrackNotFoundError()
    return track


def update_track(
    session: Session, track_id: int, title: str, artist_id: int, seconds: int
) -> Track:
    track = session.get(Track, track_id)
    if track is None:
        raise TrackNotFoundError()
    artist = session.get(Artist, artist_id)
    if artist is None:
        raise ArtistNotFoundError()
    track.title = title
    track.artist_id = artist_id
    track.seconds = seconds
    session.commit()
    return track


def like_track(session: Session, track_id: int) -> None:
    track = session.get(Track, track_id)
    if track is None:
        raise TrackNotFoundError()
    track.liked = True
    session.commit()


def unlike_track(session: Session, track_id: int) -> None:
    track = session.get(Track, track_id)
    if track is None:
        raise TrackNotFoundError()
    track.liked = False
    session.commit()
