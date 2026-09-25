from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.models import Artist


def list_artists(session: Session) -> list[Artist]:
    return list(session.scalars(select(Artist)).all())


def create_artist(session: Session, name: str) -> Artist:
    artist = Artist(name=name)
    session.add(artist)
    session.commit()
    session.refresh(artist)
    return artist
