import type { Track } from "../types"
import { formatDuration } from "../format"

type TrackRowProps = {
    track: Track
}

export function TrackRow({ track }: TrackRowProps) {
    return (
        <li className="flex gap-4 py-2">
            <span className="flex-1">{track.title}</span>
            <span className="text-gray-500">{track.artist.name}</span>
            <span>{formatDuration(track.seconds)}</span>
            <span>{track.liked ? "♥" : "♡"}</span>
        </li>
    )
}
