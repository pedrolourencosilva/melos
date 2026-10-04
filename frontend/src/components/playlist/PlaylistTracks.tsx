import type { PlaylistEntry, Track } from "../../types.ts"
import { TrackRow } from "../TrackRow.tsx"
import * as trackLogic from "../../logic/tracks.ts"

type PlaylistTracksProps = {
    entries: PlaylistEntry[]
    tracks: Track[]
    onLikeTrack: (trackId: number) => void
    onRemoveTrack: (position: number) => void
}

export function PlaylistTracks({ entries, tracks, onLikeTrack, onRemoveTrack }: PlaylistTracksProps) {
    if (entries.length === 0) return <p>No tracks yet</p>
    return (
        <ul>
            {entries.map((e, i) =>
                <TrackRow key={e.position} number={i + 1} track={trackLogic.getTrack(tracks, e.trackId)} onLikeTrack={onLikeTrack}>
                    <button onClick={() => onRemoveTrack(e.position)}>Remove</button>
                </TrackRow>
            )}
        </ul>
    )
}
