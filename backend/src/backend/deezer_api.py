import httpx

from backend.errors import DeezerTrackNotFoundError, DeezerUnavailableError

BASE_URL = "https://api.deezer.com"


def search_tracks(q: str) -> list[dict]:
    data = _get("/search", {"q": q})
    return [_to_track(item) for item in data["data"]]


def get_track(deezer_id: int) -> dict:
    data = _get(f"/track/{deezer_id}")
    return _to_track(data)


def _get(path: str, params: dict | None = None) -> dict:
    try:
        response = httpx.get(BASE_URL + path, params=params, timeout=5)
    except httpx.HTTPError as e:
        raise DeezerUnavailableError from e

    if response.status_code != 200:
        raise DeezerUnavailableError

    data = response.json()
    if "error" in data:
        if data["error"]["code"] == 800:
            raise DeezerTrackNotFoundError
        raise DeezerUnavailableError

    return data


def _to_track(item: dict) -> dict:
    return {
        "deezer_id": item["id"],
        "title": item["title"],
        "seconds": item["duration"],
        "artist": {"deezer_id": item["artist"]["id"], "name": item["artist"]["name"]},
    }
