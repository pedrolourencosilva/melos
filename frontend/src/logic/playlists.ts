import type { StoredPlaylist } from "../types.ts"

export function createPlaylist(playlists: StoredPlaylist[], name: string): StoredPlaylist[] {
    const playlistIds: number[] = playlists.map((p) => p.id)
    const id: number = Math.max(0, ...playlistIds)
    const playlist: StoredPlaylist = { id: id + 1, name: name.trim(), created_at: new Date().toISOString(), tracks: [] }
    return [playlist, ...playlists]
}

export function removeTrack(playlists: StoredPlaylist[], playlistId: number, position: number): StoredPlaylist[] {
    const playlist: StoredPlaylist | undefined = playlists.find((p) => p.id === playlistId)
    if (playlist === undefined) throw new Error(`Playlist ${playlistId} not found`)
    if (!playlist.tracks.some((t) => t.position === position)) throw new Error(`No track at position ${position} in playlist ${playlistId}`)
    return playlists.map((p) => p.id === playlistId ? { ...p, tracks: p.tracks.filter((t) => t.position !== position) } : p)
}

export function hasTrack(playlists: StoredPlaylist[], playlistId: number, trackId: number): boolean {
    const playlist: StoredPlaylist | undefined = playlists.find((p) => p.id === playlistId)
    if (playlist === undefined) throw new Error(`Playlist ${playlistId} not found`)
    return playlist.tracks.some((t) => t.trackId === trackId)
}

export function addTrack(playlists: StoredPlaylist[], playlistId: number, trackId: number): StoredPlaylist[] {
    const playlist: StoredPlaylist | undefined = playlists.find((p) => p.id === playlistId)
    if (playlist === undefined) throw new Error(`Playlist ${playlistId} not found`)
    const positions: number[] = playlist.tracks.map((p) => p.position)
    const maxPosition: number = Math.max(0, ...positions)
    return playlists.map((p) => p.id === playlistId ? { ...p, tracks: [...p.tracks, { position: maxPosition + 1, trackId: trackId }] } : p)
}

export function updatePlaylist(playlists: StoredPlaylist[], playlistId: number, name: string): StoredPlaylist[] {
    if (!playlists.some((p) => p.id === playlistId)) throw new Error(`Playlist ${playlistId} not found`)
    return playlists.map((p) => p.id === playlistId ? { ...p, name: name } : p)
}

export function deletePlaylist(playlists: StoredPlaylist[], playlistId: number): StoredPlaylist[] {
    if (!playlists.some((p) => p.id === playlistId)) throw new Error(`Playlist ${playlistId} not found`)
    return playlists.filter((p) => p.id !== playlistId)
}
