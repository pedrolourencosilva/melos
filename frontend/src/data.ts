import type { Artist, StoredPlaylist, Track } from "./types"

const radiohead: Artist = { id: 1, name: "Radiohead" }

export const tracks: Track[] = [
    { id: 1, title: "Fake Plastic Trees", artist: radiohead, seconds: 290, liked: true },
    { id: 2, title: "Let Down", artist: radiohead, seconds: 299, liked: false },
    { id: 3, title: "No Surprises", artist: radiohead, seconds: 229, liked: true },
    { id: 4, title: "Idioteque", artist: radiohead, seconds: 309, liked: false },
    { id: 5, title: "Bodysnatchers", artist: radiohead, seconds: 242, liked: false }
]

export const playlists: StoredPlaylist[] = [
    {
        id: 3,
        name: "Late Night",
        created_at: "2026-09-27T21:30:00Z",
        tracks: [
            { position: 1, trackId: 3 },
            { position: 3, trackId: 1 },
            { position: 4, trackId: 4 },
            { position: 6, trackId: 3 },
        ],
    },
    {
        id: 2,
        name: "OK Computer",
        created_at: "2026-09-25T18:00:00Z",
        tracks: [
            { position: 1, trackId: 2 },
            { position: 2, trackId: 3 },
        ],
    },
    {
        id: 1,
        name: "Empty",
        created_at: "2026-09-20T10:00:00Z",
        tracks: [],
    },
]
