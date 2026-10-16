import { get } from "./http";
import type { DeezerTrack } from "../types";

export function searchTracks(q: string): Promise<DeezerTrack[]> {
    return get(`/deezer/tracks?q=${encodeURIComponent(q)}`)
}
