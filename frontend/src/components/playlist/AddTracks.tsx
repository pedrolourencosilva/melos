import type { Track } from "../../types.ts"
import { TrackRow } from "../TrackRow.tsx"

type AddTracksProps = {
    tracks: Track[]
    onAddTrack: (trackId: number) => void
}

export function AddTracks({ tracks, onAddTrack }: AddTracksProps) {
    return (
        <>
            <h2 className="text-xl font-bold pt-6">Add track</h2>
            <ul>
                {tracks.map((t) => (
                    <TrackRow key={t.id} track={t}>
                        <button onClick={() => onAddTrack(t.id)}>Add</button>
                    </TrackRow>
                ))}
            </ul>

        </>
    )
}
