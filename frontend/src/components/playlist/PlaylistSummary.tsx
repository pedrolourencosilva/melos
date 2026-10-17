import { formatTotalDuration } from "../../format"
import { totalSeconds } from "../../logic/playlists"
import type { PlaylistDetail } from "../../types"

type PlaylistSummaryProps = {
    playlist: PlaylistDetail
}

export function PlaylistSummary({ playlist }: PlaylistSummaryProps) {
    const count = playlist.tracks.length
    if (count === 0) return null
    const word = count === 1 ? "track" : "tracks"
    return <p className="text-gray-500">{count} {word}, {formatTotalDuration(totalSeconds(playlist))}</p>
}
