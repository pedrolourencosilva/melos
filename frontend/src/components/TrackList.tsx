import { TrackRow } from "./TrackRow";
import type { Track } from "../types.ts"

type TrackListProp = {
    tracks: Track[]
}

export function TrackList({ tracks }: TrackListProp) {
    return (
        <ul>
            {tracks.map((track) => (
                <TrackRow key={track.id} track={track} />
            ))}
        </ul>
    )
}
