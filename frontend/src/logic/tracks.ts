import type { Track } from "../types.ts"

export function toggleLike(tracks: Track[], trackId: number): Track[] {
    return tracks.map((t) => t.id === trackId ? { ...t, liked: !t.liked } : t)
}

export function getTrack(tracks: Track[], trackId: number): Track {
    const track: Track | undefined = tracks.find((t) => t.id === trackId)
    if (track === undefined) throw new Error(`Track ${trackId} not found`)
    return track
}
