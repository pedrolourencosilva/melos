import type { Track } from "../types"
import { formatDuration } from "../format"

type TrackRowProps = {
    number?: number
    track: Track
    onLike: (trackId: number) => void
}

export function TrackRow({ number, track, onLike }: TrackRowProps) {
    return (
        <li className="flex gap-4 py-2">
            {number !== undefined && <span className="text-gray-500">{number}</span>}
            <span className="flex-1">{track.title}</span>
            <span className="text-gray-500">{track.artist.name}</span>
            <span>{formatDuration(track.seconds)}</span>
            <button onClick={() => onLike(track.id)}>{track.liked ? "♥" : "♡"}</button>
        </li>
    )
}
