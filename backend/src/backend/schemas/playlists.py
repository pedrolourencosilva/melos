from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from backend.schemas.common import DbInt
from backend.schemas.tracks import TrackRead


class PlaylistCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    name: str = Field(min_length=1)


class PlaylistRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    created_at: datetime


class PlaylistTrackRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    position: int
    track: TrackRead


class PlaylistDetail(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    created_at: datetime
    tracks: list[PlaylistTrackRead]


class PlaylistUpdate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    name: str = Field(min_length=1)


class PlaylistTrackCreate(BaseModel):
    track_id: DbInt
