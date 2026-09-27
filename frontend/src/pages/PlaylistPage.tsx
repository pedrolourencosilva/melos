import { useParams } from "react-router"
import { playlists } from "../data"
import { TrackRow } from "../components/TrackRow"

export function PlaylistPage() {
    const { playlistId } = useParams()
    const playlist = playlists.find((p) => p.id === Number(playlistId))
    if (playlist === undefined) {
        return <p>Playlist not found</p>
    }
    if (playlist.tracks.length === 0) return <h1>No tracks yet</h1>
    return (
        <>
            <h1 className="text-3xl font-bold">{playlist.name}</h1>
            <ul>
                {playlist.tracks.map((p, i) =>
                    <TrackRow key={p.position} number={i + 1} track={p.track} />
                )}
            </ul>
        </>
    )
}
