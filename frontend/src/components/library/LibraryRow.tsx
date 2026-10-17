import type { Playlist, Track } from "../../types.ts"
import { TrackRow } from "../TrackRow.tsx"
import { DeleteTrackButton } from "./DeleteTrackButton.tsx"

type LibraryRowProps = {
    track: Track
    playlists: Playlist[]
    onLikeTrack: (track: Track) => void
    onAddTrack: (playlistId: number, trackId: number) => void
    onDeleteTrack: (trackId: number) => void
}

export function LibraryRow({ track, playlists, onLikeTrack, onAddTrack, onDeleteTrack }: LibraryRowProps) {
    return (
        <TrackRow track={track} onLikeTrack={onLikeTrack}>
            <select value="" onChange={(e) => onAddTrack(Number(e.target.value), track.id)}>
                <option value="" disabled>Add to...</option>
                {playlists.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <DeleteTrackButton track={track} onDeleteTrack={onDeleteTrack} />
        </TrackRow>
    )
}
