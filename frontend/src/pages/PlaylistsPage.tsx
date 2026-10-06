import { PlaylistCard } from "../components/playlists/PlaylistCard.tsx"
import { CreatePlaylistForm } from "../components/playlists/CreatePlaylistForm.tsx"
import { usePlaylists } from "../hooks/usePlaylists.ts"

export function PlaylistsPage() {
    const { playlists, error, createPlaylist } = usePlaylists()
    if (error !== undefined) return <p> {error}</p>
    if (playlists === undefined) return <p>Loading...</p>
    return (
        <>
            <h1 className="text-3xl font-bold">Playlists</h1>
            <CreatePlaylistForm onCreatePlaylist={createPlaylist} />
            <ul>
                {playlists.map((playlist) =>
                    <PlaylistCard key={playlist.id} playlist={playlist} />
                )}
            </ul>
        </>
    )
}
