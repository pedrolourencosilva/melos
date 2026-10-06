import type { PlaylistTrack, Track } from "../../types.ts"
import { TrackRow } from "../TrackRow.tsx"

type PlaylistTracksProps = {
    entries: PlaylistTrack[]
    onLikeTrack: (track: Track) => void
    onRemoveTrack: (position: number) => void
}

export function PlaylistTracks({ entries, onLikeTrack, onRemoveTrack }: PlaylistTracksProps) {
    if (entries.length === 0) return <p>No tracks yet</p>
    return (
        <ul>
            {entries.map((e, i) =>
                <TrackRow key={e.position} number={i + 1} track={e.track} onLikeTrack={onLikeTrack}>
                    <button onClick={() => onRemoveTrack(e.position)}>Remove</button>
                </TrackRow>
            )}
        </ul>
    )
}
