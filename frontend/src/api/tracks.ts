import type { Track, TrackSort } from "../types.ts"
import { get, send } from "./http.ts"

export function listTracks(q: string, sort: TrackSort): Promise<Track[]> {
    return get(`/tracks?q=${encodeURIComponent(q)}&sort=${sort}`)
}

export function likeTrack(trackId: number): Promise<void> {
    return send("PUT", `/tracks/${trackId}/like`)
}

export function unlikeTrack(trackId: number): Promise<void> {
    return send("DELETE", `/tracks/${trackId}/like`)
}

export function createTrack(deezerId: number): Promise<void> {
    return send("POST", "/tracks", { deezer_id: deezerId })
}

export function deleteTrack(trackId: number): Promise<void> {
    return send("DELETE", `/tracks/${trackId}`)
}
