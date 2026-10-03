import { TrackRow } from "./TrackRow";
import type { Track } from "../types.ts"

type TrackListProp = {
    tracks: Track[]
    toggleLike: (trackId: number) => void
}

export function TrackList({ tracks, toggleLike }: TrackListProp) {
    return (
        <ul>
            {tracks.map((track) => (
                <TrackRow key={track.id} track={track} onLike={toggleLike} />
            ))}
        </ul>
    )
}
