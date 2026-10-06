import type { PlaylistDetail, Track } from "../types"
import * as playlistApi from "../api/playlists.ts"
import * as trackApi from "../api/tracks.ts"
import { hasTrack } from "../logic/playlists.ts"
import { useState, useEffect } from "react"


export function usePlaylist(playlistId: number) {
    const [error, setError] = useState<string>()
    const [playlist, setPlaylist] = useState<PlaylistDetail>()
    const [version, setVersion] = useState<number>(0)
    useEffect(() => {
        async function load() {
            try {
                setPlaylist(await playlistApi.getPlaylist(playlistId))
            } catch (e) {
                setError(String(e))
            }
        }
        load()
    }, [playlistId, version])
    async function renamePlaylist(name: string) {
        await playlistApi.updatePlaylist(playlistId, name)
        setVersion(version + 1)
    }
    async function addTrack(trackId: number) {
        if (playlist === undefined) return
        if (hasTrack(playlist, trackId)) {
            const answer: boolean = window.confirm("Already in this playlist. Add anyway?")
            if (!answer) return
        }
        await playlistApi.addTrack(playlistId, trackId)
        setVersion(version + 1)
    }
    async function removeTrack(position: number) {
        await playlistApi.removeTrack(playlistId, position)
        setVersion(version + 1)
    }
    async function likeTrack(track: Track) {
        if (track.liked) {
            await trackApi.unlikeTrack(track.id)
        } else {
            await trackApi.likeTrack(track.id)
        }
        setVersion(version + 1)
    }
    async function deletePlaylist() {
        await playlistApi.deletePlaylist(playlistId)
    }
    return { playlist, error, renamePlaylist, addTrack, removeTrack, likeTrack, deletePlaylist }
}
