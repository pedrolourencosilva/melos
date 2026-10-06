import { LibraryRow } from "../components/library/LibraryRow.tsx"
import { useTracks } from "../hooks/useTracks.ts"
import { usePlaylists } from "../hooks/usePlaylists.ts"

export function LibraryPage() {
    const { tracks, error: trackError, likeTrack } = useTracks()
    const { playlists, error: playlistError, addTrack } = usePlaylists()
    if (trackError !== undefined) return <p> {trackError}</p>
    if (playlistError !== undefined) return <p> {playlistError}</p>
    if (tracks === undefined) return <p>Loading...</p>
    if (playlists === undefined) return <p>Loading...</p>
    return (
        <>
            <h1 className="text-3xl font-bold">Library</h1>
            <ul>
                {tracks.map((t) => <LibraryRow key={t.id} track={t} playlists={playlists} onLikeTrack={likeTrack} onAddTrack={addTrack} />)}
            </ul>
        </>
    )
}
