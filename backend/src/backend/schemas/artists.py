from pydantic import BaseModel, ConfigDict, Field


class ArtistCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    name: str = Field(min_length=1)


class ArtistRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str


class ArtistUpdate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    name: str = Field(min_length=1)


class TrackMinimal(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    seconds: int
    liked: bool


class ArtistDetail(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    tracks: list[TrackMinimal]
