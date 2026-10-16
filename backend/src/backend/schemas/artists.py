from pydantic import BaseModel, ConfigDict


class ArtistRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str


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
