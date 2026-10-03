import { PlaylistCard } from "../components/PlaylistCard.tsx"
import type { StoredPlaylist } from "../types.ts"

type PlaylistsPageProps = {
    playlists: StoredPlaylist[]
}

export function PlaylistsPage({ playlists }: PlaylistsPageProps) {
    return (
        <>
            <h1 className="text-3xl font-bold">Playlists</h1>
            <ul>
                {playlists.map((playlist) =>
                    <PlaylistCard key={playlist.id} playlist={playlist} />
                )}
            </ul>
        </>
    )
}
