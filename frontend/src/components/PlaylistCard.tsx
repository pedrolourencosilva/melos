import { formatDate } from "../format";
import type { Playlist } from "../types";
import { Link } from "react-router"

type PlaylistCardProp = {
    playlist: Playlist
}

export function PlaylistCard({ playlist }: PlaylistCardProp) {
    return (
        <li>
            <Link to={`/playlists/${playlist.id}`}>{playlist.name}</Link>
            <div className="text-sm text-gray-500">Created: {formatDate(playlist.created_at)}</div>
        </li>
    )
}
