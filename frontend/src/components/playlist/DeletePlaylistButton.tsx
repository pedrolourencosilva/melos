import { useNavigate } from "react-router"

type DeletePlaylistButtonProps = {
    name: string
    onDeletePlaylist: () => void
}

export function DeletePlaylistButton({ name, onDeletePlaylist }: DeletePlaylistButtonProps) {
    const navigate = useNavigate()
    function handleClick() {
        if (!window.confirm(`Delete "${name}"?`)) return
        onDeletePlaylist()
        navigate("/playlists")
    }
    return <button onClick={handleClick}>Delete</button>
}
