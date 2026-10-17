import type { Track } from "../../types"

type DeleteTrackButtonProps = {
    track: Track
    onDeleteTrack: (trackId: number) => void
}

export function DeleteTrackButton({ track, onDeleteTrack }: DeleteTrackButtonProps) {
    function handleClick() {
        if (!window.confirm(`Delete "${track.title}"? It will be removed from every playlist.`)) return
        onDeleteTrack(track.id)
    }
    return <button onClick={handleClick}>Delete</button>
}
