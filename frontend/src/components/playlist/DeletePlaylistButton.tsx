import { useNavigate } from "react-router"

type DeletePlaylistButtonProps = {
    name: string
    onDeletePlaylist: () => Promise<void>
}

export function DeletePlaylistButton({ name, onDeletePlaylist }: DeletePlaylistButtonProps) {
    const navigate = useNavigate()
    async function handleClick() {
        if (!window.confirm(`Delete "${name}"?`)) return
        await onDeletePlaylist()
        navigate("/playlists")
    }
    return <button onClick={handleClick}>Delete</button>
}
