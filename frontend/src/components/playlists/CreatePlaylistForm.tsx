import { useState } from "react"

type CreatePlaylistFormProps = {
    onCreatePlaylist: (name: string) => void
}

export function CreatePlaylistForm({ onCreatePlaylist }: CreatePlaylistFormProps) {
    const [name, setName] = useState("")
    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        if (name.trim() === "") return
        onCreatePlaylist(name.trim())
        setName("")
    }
    return (
        <form onSubmit={handleSubmit}>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <button type="submit">Create</button>
        </form>
    )
}
