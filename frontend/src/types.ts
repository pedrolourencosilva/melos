export type Artist = {
    id: number
    name: string
}

export type Track = {
    id: number
    title: string
    artist: Artist
    seconds: number
    liked: boolean
}

export type Playlist = {
    id: number
    name: string
    created_at: string
}

export type PlaylistTrack = {
    position: number
    track: Track
}

export type PlaylistDetail = {
    id: number
    name: string
    created_at: string
    tracks: PlaylistTrack[]
}
