import type { PlaylistDetail } from "../types"

export function hasTrack(playlist: PlaylistDetail, trackId: number): boolean {
    return playlist.tracks.some((t) => t.track.id === trackId)
}
