import type { Track } from "../types.ts"
import { get, send } from "./http.ts"

export function listTracks(): Promise<Track[]> {
    return get("/tracks")
}

export function likeTrack(trackId: number): Promise<void> {
    return send("PUT", `/tracks/${trackId}/like`)
}

export function unlikeTrack(trackId: number): Promise<void> {
    return send("DELETE", `/tracks/${trackId}/like`)
}
