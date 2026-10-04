import { useState } from "react"

type PlaylistTitleProps = {
    name: string
    onRenamePlaylist: (name: string) => void
}

export function PlaylistTitle({ name, onRenamePlaylist }: PlaylistTitleProps) {
    const [editing, setEditing] = useState(false)
    const [text, setText] = useState("")
    function startEditing() {
        setText(name)
        setEditing(true)
    }
    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Escape") setEditing(false)
        if (event.key === "Enter") {
            if (text.trim() === "") return
            onRenamePlaylist(text.trim())
            setEditing(false)
        }
    }
    if (editing) {
        return (
            <input
                className="text-3xl font-bold border"
                autoFocus
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        )
    }
    return <h1 className="text-3xl font-bold cursor-pointer" onClick={startEditing}>{name}</h1>
}
