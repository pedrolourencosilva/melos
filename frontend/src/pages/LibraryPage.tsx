import type { Track } from "../types.ts"
import { TrackList } from "../components/TrackList.tsx"

type LibraryPageProps = {
    tracks: Track[]
    toggleLike: (trackId: number) => void
}

export function LibraryPage({ tracks, toggleLike }: LibraryPageProps) {
    return (
        <>
            <h1 className="text-3xl font-bold">Library</h1>
            <TrackList tracks={tracks} toggleLike={toggleLike} />
        </>
    )
}

