import { PlaylistCard } from "../components/playlists/PlaylistCard.tsx"
import { CreatePlaylistForm } from "../components/playlists/CreatePlaylistForm.tsx"
import type { StoredPlaylist } from "../types.ts"

type PlaylistsPageProps = {
    playlists: StoredPlaylist[]
    onCreatePlaylist: (name: string) => void
}

export function PlaylistsPage({ playlists, onCreatePlaylist }: PlaylistsPageProps) {
    return (
        <>
            <h1 className="text-3xl font-bold">Playlists</h1>
            <CreatePlaylistForm onCreatePlaylist={onCreatePlaylist} />
            <ul>
                {playlists.map((playlist) =>
                    <PlaylistCard key={playlist.id} playlist={playlist} />
                )}
            </ul>
        </>
    )
}
