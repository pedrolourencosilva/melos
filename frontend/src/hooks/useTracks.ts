import type { Track, TrackSort } from "../types.ts"
import * as trackApi from "../api/tracks.ts"
import { useEffect, useState } from "react"

export function useTracks() {
    const [error, setError] = useState<string>()
    const [tracks, setTracks] = useState<Track[]>()
    const [version, setVersion] = useState<number>(0)
    const [q, setQ] = useState<string>("")
    const [sort, setSort] = useState<TrackSort>("title")
    useEffect(() => {
        let ignore = false
        async function load() {
            try {
                const result = await trackApi.listTracks(q, sort)
                if (!ignore) setTracks(result)
            } catch (e) {
                if (!ignore) setError(String(e))
            }
        }
        load()
        return () => { ignore = true }
    }, [q, sort, version])
    async function likeTrack(track: Track): Promise<void> {
        if (track.liked) {
            await trackApi.unlikeTrack(track.id)
        } else {
            await trackApi.likeTrack(track.id)

        }
        setVersion(version + 1)
    }
    return { tracks, error, likeTrack, q, setQ, sort, setSort }
}
