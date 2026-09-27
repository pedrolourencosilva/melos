import type { Artist, PlaylistDetail, Track } from "./types"

const radiohead: Artist = { id: 1, name: "Radiohead" }

export const tracks: Track[] = [
    { id: 1, title: "Fake Plastic Trees", artist: radiohead, seconds: 290, liked: true },
    { id: 2, title: "Let Down", artist: radiohead, seconds: 299, liked: false },
    { id: 3, title: "No Surprises", artist: radiohead, seconds: 229, liked: true },
    { id: 4, title: "Idioteque", artist: radiohead, seconds: 309, liked: false },
    { id: 5, title: "Bodysnatchers", artist: radiohead, seconds: 242, liked: false }
]

export const playlists: PlaylistDetail[] = [
    {
        id: 3,
        name: "Late Night",
        created_at: "2026-09-27T21:30:00Z",
        tracks: [
            { position: 1, track: tracks[2] },
            { position: 3, track: tracks[0] },
            { position: 4, track: tracks[3] },
            { position: 6, track: tracks[2] },
        ],
    },
    {
        id: 2,
        name: "OK Computer",
        created_at: "2026-09-25T18:00:00Z",
        tracks: [
            { position: 1, track: tracks[1] },
            { position: 2, track: tracks[2] },
        ],
    },
    {
        id: 1,
        name: "Empty",
        created_at: "2026-09-20T10:00:00Z",
        tracks: [],
    },
]
