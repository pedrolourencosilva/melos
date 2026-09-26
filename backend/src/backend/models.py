from datetime import datetime

from sqlalchemy import CheckConstraint, DateTime, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from backend.database import Base


class Artist(Base):
    __tablename__ = "artist"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]

    tracks: Mapped[list[Track]] = relationship(
        back_populates="artist",
        order_by="Track.title",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )


class Track(Base):
    __tablename__ = "track"
    __table_args__ = (CheckConstraint("seconds > 0", name="seconds_positive"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str]
    artist_id: Mapped[int] = mapped_column(ForeignKey("artist.id", ondelete="CASCADE"))
    seconds: Mapped[int]
    liked: Mapped[bool] = mapped_column(default=False)

    artist: Mapped[Artist] = relationship(back_populates="tracks")


class Playlist(Base):
    __tablename__ = "playlist"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    tracks: Mapped[list[PlaylistTrack]] = relationship(
        order_by="PlaylistTrack.position",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )


class PlaylistTrack(Base):
    __tablename__ = "playlist_track"

    playlist_id: Mapped[int] = mapped_column(
        ForeignKey("playlist.id", ondelete="CASCADE"), primary_key=True
    )
    track_id: Mapped[int] = mapped_column(ForeignKey("track.id", ondelete="CASCADE"))
    position: Mapped[int] = mapped_column(primary_key=True)

    track: Mapped[Track] = relationship()
