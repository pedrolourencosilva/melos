from backend.deezer_api import search_tracks as deezer_search_tracks


def search_tracks(q: str) -> list[dict]:
    q = q.strip()
    if q == "":
        return []
    return deezer_search_tracks(q)
