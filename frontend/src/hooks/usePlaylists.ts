import type { Playlist } from "../types.ts"
import * as playlistsApi from "../api/playlists.ts"
import { hasTrack } from "../logic/playlists.ts"
import { useState, useEffect } from "react"

export function usePlaylists() {
    const [error, setError] = useState<string>()
    const [playlists, setPlaylists] = useState<Playlist[]>()
    const [version, setVersion] = useState<number>(0)
    useEffect(() => {
        async function load() {
            try {
                setPlaylists(await playlistsApi.listPlaylists())
            } catch (e) {
                setError(String(e))
            }
        }
        load()
    }, [version])
    async function createPlaylist(name: string) {
        await playlistsApi.createPlaylist(name)
        setVersion(version + 1)
    }
    async function addTrack(playlistId: number, trackId: number) {
        const playlist = await playlistsApi.getPlaylist(playlistId)
        if (hasTrack(playlist, trackId)) {
            const answer: boolean = window.confirm("Already in this playlist. Add anyway?")
            if (!answer) return
        }
        await playlistsApi.addTrack(playlistId, trackId)
    }
    return { playlists, error, createPlaylist, addTrack }
}
