import { HomePage } from "./pages/HomePage.tsx"
import { LibraryPage } from "./pages/LibraryPage.tsx"
import { PlaylistsPage } from "./pages/PlaylistsPage.tsx"
import { PlaylistPage } from "./pages/PlaylistPage.tsx"
import { NotFoundPage } from "./pages/NotFoundPage.tsx"
import { NavBar } from './components/NavBar.tsx'
import { Route, Routes } from "react-router"
import { useState } from "react"
import { tracks as initialTracks, playlists as initialPlaylists } from "./data.ts"

function App() {
    const [tracks, setTracks] = useState(initialTracks)
    const [playlists, setPlaylists] = useState(initialPlaylists)
    function toggleLike(trackId: number) {
        setTracks(tracks.map((t) => t.id === trackId ? { ...t, liked: !t.liked } : t))
    }
    return (
        <main className="max-w-3xl mx-auto">
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/library" element={<LibraryPage tracks={tracks} toggleLike={toggleLike} />} />
                <Route path="/playlists" element={<PlaylistsPage playlists={playlists} />} />
                <Route path="/playlists/:playlistId" element={<PlaylistPage tracks={tracks} playlists={playlists} toggleLike={toggleLike} />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </main>
    )
}

export default App
