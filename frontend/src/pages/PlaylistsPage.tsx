import { PlaylistCard } from "../components/PlaylistCard.tsx"
import { playlists } from "../data.ts"

export function PlaylistsPage() {
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
