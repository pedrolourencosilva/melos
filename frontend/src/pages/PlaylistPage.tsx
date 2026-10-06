import { useParams } from "react-router"
import { PlaylistTitle } from "../components/playlist/PlaylistTitle.tsx"
import { PlaylistTracks } from "../components/playlist/PlaylistTracks.tsx"
import { AddTracks } from "../components/playlist/AddTracks.tsx"
import { DeletePlaylistButton } from "../components/playlist/DeletePlaylistButton.tsx"
import { usePlaylist } from "../hooks/usePlaylist.ts"
import { useTracks } from "../hooks/useTracks.ts"

export function PlaylistPage() {
    const { playlistId } = useParams()
    const { playlist, error: playlistError, renamePlaylist, addTrack, removeTrack, likeTrack, deletePlaylist } = usePlaylist(Number(playlistId))
    const { tracks, error: trackError } = useTracks()
    if (trackError !== undefined) return <p>{trackError}</p>
    if (playlistError !== undefined) return <p>{playlistError}</p>
    if (tracks === undefined) return <p>Loading...</p>
    if (playlist === undefined) return <p>Loading...</p>
    return (
        <>
            <PlaylistTitle name={playlist.name} onRenamePlaylist={renamePlaylist} />
            <PlaylistTracks entries={playlist.tracks} onLikeTrack={likeTrack} onRemoveTrack={removeTrack} />
            <AddTracks tracks={tracks} onAddTrack={addTrack} />
            <DeletePlaylistButton name={playlist.name} onDeletePlaylist={deletePlaylist} />
        </>
    )
}
