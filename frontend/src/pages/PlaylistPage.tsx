import { useParams } from "react-router"
import type { StoredPlaylist, Track } from "../types.ts"
import { PlaylistTitle } from "../components/playlist/PlaylistTitle.tsx"
import { PlaylistTracks } from "../components/playlist/PlaylistTracks.tsx"
import { AddTracks } from "../components/playlist/AddTracks.tsx"
import { DeletePlaylistButton } from "../components/playlist/DeletePlaylistButton.tsx"

type PlaylistPageProps = {
    tracks: Track[]
    playlists: StoredPlaylist[]
    onLikeTrack: (trackId: number) => void
    onAddTrack: (playlistId: number, trackId: number) => void
    onRenamePlaylist: (playlistId: number, name: string) => void
    onDeletePlaylist: (playlistId: number) => void
    onRemoveTrack: (playlistId: number, position: number) => void
}

export function PlaylistPage({ tracks, playlists, onLikeTrack, onAddTrack, onRenamePlaylist, onDeletePlaylist, onRemoveTrack }: PlaylistPageProps) {
    const { playlistId } = useParams()
    const playlist = playlists.find((p) => p.id === Number(playlistId))
    if (playlist === undefined) return <p>Playlist not found</p>
    return (
        <>
            <PlaylistTitle name={playlist.name} onRenamePlaylist={(name) => onRenamePlaylist(playlist.id, name)} />
            <PlaylistTracks entries={playlist.tracks} tracks={tracks} onLikeTrack={onLikeTrack} onRemoveTrack={(position) => onRemoveTrack(playlist.id, position)} />
            <AddTracks tracks={tracks} onAddTrack={(trackId) => onAddTrack(playlist.id, trackId)} />
            <DeletePlaylistButton name={playlist.name} onDeletePlaylist={() => onDeletePlaylist(playlist.id)} />
        </>
    )
}
