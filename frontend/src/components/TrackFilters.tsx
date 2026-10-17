import type { TrackSort } from "../types"

type TrackFiltersProps = {
    q: string
    sort: TrackSort
    onSearchTracks: (q: string) => void
    onSortTracks: (sort: TrackSort) => void
}

export function TrackFilters({ q, sort, onSearchTracks, onSortTracks }: TrackFiltersProps) {
    return (
        <div className="flex gap-4 py-2">
            <input value={q} onChange={(e) => onSearchTracks(e.target.value)} placeholder="Search" />
            <select value={sort} onChange={(e) => onSortTracks(e.target.value as TrackSort)}>
                <option value="title">Title</option>
                <option value="artist">Artist</option>
                <option value="duration">Duration</option>
            </select>
        </div>
    )
}
