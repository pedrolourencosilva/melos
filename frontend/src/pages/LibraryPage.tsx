import type { StoredPlaylist, Track } from "../types.ts"
import { LibraryRow } from "../components/library/LibraryRow.tsx"

type LibraryPageProps = {
    tracks: Track[]
    playlists: StoredPlaylist[]
    onLikeTrack: (trackId: number) => void
    onAddTrack: (playlistId: number, trackId: number) => void
}

export function LibraryPage({ tracks, playlists, onLikeTrack, onAddTrack }: LibraryPageProps) {
    return (
        <>
            <h1 className="text-3xl font-bold">Library</h1>
            <ul>
                {tracks.map((t) => <LibraryRow key={t.id} track={t} playlists={playlists} onLikeTrack={onLikeTrack} onAddTrack={onAddTrack} />)}
            </ul>
        </>
    )
}
