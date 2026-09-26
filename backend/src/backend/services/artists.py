from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.errors import ArtistNotFoundError
from backend.models import Artist


def list_artists(session: Session) -> list[Artist]:
    return list(session.scalars(select(Artist).order_by(Artist.name)).all())


def create_artist(session: Session, name: str) -> Artist:
    artist = Artist(name=name)
    session.add(artist)
    session.commit()
    session.refresh(artist)
    return artist


def get_artist(session: Session, artist_id: int) -> Artist:
    artist = session.get(Artist, artist_id)
    if artist is None:
        raise ArtistNotFoundError()
    return artist


def delete_artist(session: Session, artist_id: int) -> None:
    artist = session.get(Artist, artist_id)
    if artist is None:
        raise ArtistNotFoundError()
    session.delete(artist)
    session.commit()


def update_artist(session: Session, artist_id: int, name: str) -> Artist:
    artist = session.get(Artist, artist_id)
    if artist is None:
        raise ArtistNotFoundError()
    artist.name = name
    session.commit()
    return artist
