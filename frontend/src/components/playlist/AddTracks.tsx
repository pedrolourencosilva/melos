import type { Track, TrackSort } from "../../types.ts"
import { TrackRow } from "../TrackRow.tsx"
import { TrackFilters } from "../TrackFilters.tsx"

type AddTracksProps = {
    tracks: Track[]
    onAddTrack: (trackId: number) => void
    q: string
    sort: TrackSort
    onSearchTracks: (q: string) => void
    onSortTracks: (sort: TrackSort) => void
}

export function AddTracks({ tracks, onAddTrack, q, sort, onSearchTracks, onSortTracks }: AddTracksProps) {
    return (
        <>
            <h2 className="text-xl font-bold pt-6">Add track</h2>
            <TrackFilters q={q} sort={sort} onSearchTracks={onSearchTracks} onSortTracks={onSortTracks} />
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
