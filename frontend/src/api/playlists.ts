import type { Playlist, PlaylistDetail } from "../types.ts"
import { get, send } from "./http.ts"

export function listPlaylists(): Promise<Playlist[]> {
    return get("/playlists")
}

export function getPlaylist(playlistId: number): Promise<PlaylistDetail> {
    return get(`/playlists/${playlistId}`)
}

export function createPlaylist(name: string): Promise<void> {
    return send("POST", "/playlists", { name: name })
}

export function updatePlaylist(playlistId: number, name: string): Promise<void> {
    return send("PUT", `/playlists/${playlistId}`, { name: name })
}

export function deletePlaylist(playlistId: number): Promise<void> {
    return send("DELETE", `/playlists/${playlistId}`)
}

export function addTrack(playlistId: number, trackId: number): Promise<void> {
    return send("POST", `/playlists/${playlistId}/tracks`, { track_id: trackId })
}

export function removeTrack(playlistId: number, position: number): Promise<void> {
    return send("DELETE", `/playlists/${playlistId}/tracks/${position}`)
}
