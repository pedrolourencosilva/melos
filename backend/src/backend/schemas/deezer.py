from pydantic import BaseModel


class DeezerArtistRead(BaseModel):
    deezer_id: int
    name: str


class DeezerTrackRead(BaseModel):
    deezer_id: int
    title: str
    seconds: int
    artist: DeezerArtistRead
