import type { DeezerTrack } from "../../types.ts"
import { DeezerRow } from "./DeezerRow.tsx"

type DeezerResultsProps = {
    results: DeezerTrack[] | undefined
    imported: number[]
    onImportTrack: (deezerId: number) => void
}

export function DeezerResults({ results, imported, onImportTrack }: DeezerResultsProps) {
    if (results === undefined) return null
    if (results.length === 0) return <p>No results</p>
    return (
        <ul>
            {results.map((t) =>
                <DeezerRow
                    key={t.deezer_id}
                    track={t}
                    imported={imported.includes(t.deezer_id)}
                    onImportTrack={onImportTrack}
                />
            )}
        </ul>
    )
}
