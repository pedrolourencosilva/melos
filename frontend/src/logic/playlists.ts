import type { PlaylistDetail } from "../types"

export function hasTrack(playlist: PlaylistDetail, trackId: number): boolean {
    return playlist.tracks.some((t) => t.track.id === trackId)
}

export function totalSeconds(playlist: PlaylistDetail): number {
    let total = 0
    for (const entry of playlist.tracks) {
        total += entry.track.seconds
    }
    return total
}
