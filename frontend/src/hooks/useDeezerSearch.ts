import type { DeezerTrack } from "../types.ts"
import * as deezerApi from "../api/deezer.ts"
import * as trackApi from "../api/tracks.ts"
import { useState } from "react"

export function useDeezerSearch() {
    const [error, setError] = useState<string>()
    const [results, setResults] = useState<DeezerTrack[]>()
    const [imported, setImported] = useState<number[]>([])
    async function search(q: string): Promise<void> {
        try {
            setResults(await deezerApi.searchTracks(q))
        } catch (e) {
            setError(String(e))
        }
    }
    async function importTrack(deezerId: number): Promise<void> {
        try {
            await trackApi.createTrack(deezerId)
            setImported([...imported, deezerId])
        } catch (e) {
            setError(String(e))
        }
    }
    return { results, imported, error, search, importTrack }
}
