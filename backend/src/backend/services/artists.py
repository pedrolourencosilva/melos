from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.errors import ArtistNotFoundError
from backend.models import Artist


def list_artists(session: Session) -> list[Artist]:
    return list(session.scalars(select(Artist).order_by(Artist.name)).all())


def get_artist(session: Session, artist_id: int) -> Artist:
    artist = session.get(Artist, artist_id)
    if artist is None:
        raise ArtistNotFoundError()
    return artist
