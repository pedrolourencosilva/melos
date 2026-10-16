import { useState } from "react"

type SearchFormProps = {
    onSearch: (q: string) => void
}

export function SearchForm({ onSearch }: SearchFormProps) {
    const [q, setQ] = useState("")
    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        if (q.trim() === "") return
        onSearch(q.trim())
    }
    return (
        <form onSubmit={handleSubmit}>
            <input value={q} onChange={(e) => setQ(e.target.value)} />
            <button type="submit">Search</button>
        </form>
    )
}
