from collections.abc import Iterator

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session

from backend.config import settings

engine = create_engine(settings.database_url)


class Base(DeclarativeBase):
    pass


def get_session() -> Iterator[Session]:
    with Session(engine) as session:
        yield session
