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
