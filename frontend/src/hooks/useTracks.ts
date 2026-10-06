import type { Track } from "../types.ts"
import * as trackApi from "../api/tracks.ts"
import { useEffect, useState } from "react"

export function useTracks() {
    const [error, setError] = useState<string>()
    const [tracks, setTracks] = useState<Track[]>()
    const [version, setVersion] = useState<number>(0)
    useEffect(() => {
        async function load() {
            try {
                setTracks(await trackApi.listTracks())
            } catch (e) {
                setError(String(e))
            }
        }
        load()
    }, [version])
    async function likeTrack(track: Track): Promise<void> {
        if (track.liked) {
            await trackApi.unlikeTrack(track.id)
        } else {
            await trackApi.likeTrack(track.id)

        }
        setVersion(version + 1)
    }
    return { tracks, error, likeTrack }
}
