from pydantic import BaseModel, ConfigDict, Field

from backend.schemas.artists import ArtistRead
from backend.schemas.common import INT_MAX, DbInt


class TrackCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    title: str = Field(min_length=1)
    artist_id: DbInt
    seconds: int = Field(gt=0, le=INT_MAX)


class TrackRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    artist: ArtistRead
    seconds: int
    liked: bool


class TrackUpdate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    title: str = Field(min_length=1)
    artist_id: DbInt
    seconds: int = Field(gt=0, le=INT_MAX)
