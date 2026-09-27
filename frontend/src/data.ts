import type { Artist, Track } from "./types"

const radiohead: Artist = { id: 1, name: "Radiohead" }

export const tracks: Track[] = [
    { id: 1, title: "Fake Plastic Trees", artist: radiohead, seconds: 290, liked: true },
    { id: 2, title: "Let Down", artist: radiohead, seconds: 299, liked: false },
    { id: 3, title: "No Surprises", artist: radiohead, seconds: 229, liked: true },
    { id: 4, title: "Idioteque", artist: radiohead, seconds: 309, liked: false },
    { id: 5, title: "Bodysnatchers", artist: radiohead, seconds: 242, liked: false }
]
