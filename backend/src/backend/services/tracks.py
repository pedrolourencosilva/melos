from sqlalchemy import or_, select
from sqlalchemy.orm import Session

from backend.deezer_api import get_track as deezer_get_track
from backend.errors import ArtistNotFoundError, TrackNotFoundError
from backend.models import Artist, Track

ORDER_BY = {
    "title": [Track.title],
    "artist": [Artist.name, Track.title],
    "duration": [Track.seconds, Track.title],
}


def list_tracks(session: Session, q: str, sort: str) -> list[Track]:
    statement = select(Track).join(Track.artist)
    q = q.strip()
    if q:
        pattern = f"%{q}%"
        statement = statement.where(
            or_(Track.title.ilike(pattern), Artist.name.ilike(pattern))
        )
    statement = statement.order_by(*ORDER_BY[sort])
    return list(session.scalars(statement).all())


def create_track(session: Session, deezer_id: int) -> tuple[Track, bool]:
    track = session.scalar(select(Track).where(Track.deezer_id == deezer_id))
    if track is not None:
        return track, False
    deezer_track = deezer_get_track(deezer_id)
    track = Track(
        deezer_id=deezer_id,
        title=deezer_track["title"],
        seconds=deezer_track["seconds"],
        artist=_get_or_create_artist(session, deezer_track["artist"]),
    )
    session.add(track)
    session.commit()
    session.refresh(track)
    return track, True


def _get_or_create_artist(session: Session, deezer_artist: dict) -> Artist:
    artist = session.scalar(
        select(Artist).where(Artist.deezer_id == deezer_artist["deezer_id"])
    )
    if artist is None:
        artist = Artist(
            deezer_id=deezer_artist["deezer_id"], name=deezer_artist["name"]
        )
        session.add(artist)
    return artist


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
