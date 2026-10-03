import { useParams } from "react-router"
import type { StoredPlaylist, Track } from "../types.ts"
import { TrackRow } from "../components/TrackRow"

type PlaylistPageProps = {
    tracks: Track[]
    playlists: StoredPlaylist[]
    toggleLike: (trackId: number) => void
}

export function PlaylistPage({ tracks, playlists, toggleLike }: PlaylistPageProps) {
    const { playlistId } = useParams()
    const playlist = playlists.find((p) => p.id === Number(playlistId))
    function getTrack(trackId: number): Track {
        const track: Track | undefined = tracks.find((t) => t.id === trackId)
        if (track === undefined) throw new Error(`Track ${trackId} not found`)
        return track
    }
    if (playlist === undefined) {
        return <p>Playlist not found</p>
    }
    const empty = playlist.tracks.length === 0
    return (
        <>
            <h1 className="text-3xl font-bold">{playlist.name}</h1>
            {empty ? <p>No tracks yet</p> :
                <ul>
                    {playlist.tracks.map((p, i) =>
                        <TrackRow key={p.position} number={i + 1} track={getTrack(p.trackId)} onLike={toggleLike} />
                    )}
                </ul>
            }
        </>
    )
}
