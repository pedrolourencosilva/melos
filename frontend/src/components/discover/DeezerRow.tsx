import type { DeezerTrack } from "../../types.ts"
import { formatDuration } from "../../format.ts"

type DeezerRowProps = {
    track: DeezerTrack
    imported: boolean
    onImportTrack: (deezerId: number) => void
}

export function DeezerRow({ track, imported, onImportTrack }: DeezerRowProps) {
    return (
        <li className="flex gap-4 py-2">
            <span className="flex-1">{track.title}</span>
            <span className="text-gray-500">{track.artist.name}</span>
            <span>{formatDuration(track.seconds)}</span>
            {imported
                ? <span className="text-gray-500">In library</span>
                : <button onClick={() => onImportTrack(track.deezer_id)}>Import</button>}
        </li>
    )
}
