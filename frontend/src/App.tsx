import { HomePage } from "./pages/HomePage.tsx"
import { LibraryPage } from "./pages/LibraryPage.tsx"
import { PlaylistsPage } from "./pages/PlaylistsPage.tsx"
import { PlaylistPage } from "./pages/PlaylistPage.tsx"
import { NotFoundPage } from "./pages/NotFoundPage.tsx"
import { NavBar } from './components/NavBar.tsx'
import { Route, Routes } from "react-router"
import { useState } from "react"
import * as trackLogic from "./logic/tracks.ts"
import * as playlistLogic from "./logic/playlists.ts"
import { tracks as initialTracks, playlists as initialPlaylists } from "./data.ts"

function App() {
    const [tracks, setTracks] = useState(initialTracks)
    const [playlists, setPlaylists] = useState(initialPlaylists)
    function createPlaylist(name: string) {
        setPlaylists(playlistLogic.createPlaylist(playlists, name))
    }
    function removeTrack(playlistId: number, position: number) {
        setPlaylists(playlistLogic.removeTrack(playlists, playlistId, position))
    }
    function toggleLike(trackId: number) {
        setTracks(trackLogic.toggleLike(tracks, trackId))
    }
    function addTrack(playlistId: number, trackId: number) {
        if (playlistLogic.hasTrack(playlists, playlistId, trackId)) {
            const answer: boolean = window.confirm("Already in this playlist. Add anyway?")
            if (!answer) return
        }
        setPlaylists(playlistLogic.addTrack(playlists, playlistId, trackId))
    }
    function updatePlaylist(playlistId: number, name: string) {
        setPlaylists(playlistLogic.updatePlaylist(playlists, playlistId, name))
    }
    function deletePlaylist(playlistId: number) {
        setPlaylists(playlistLogic.deletePlaylist(playlists, playlistId))
    }
    return (
        <main className="max-w-3xl mx-auto">
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/library" element={<LibraryPage tracks={tracks} playlists={playlists} onLikeTrack={toggleLike} onAddTrack={addTrack} />} />
                <Route path="/playlists" element={<PlaylistsPage playlists={playlists} onCreatePlaylist={createPlaylist} />} />
                <Route path="/playlists/:playlistId" element={<PlaylistPage tracks={tracks} playlists={playlists} onLikeTrack={toggleLike} onAddTrack={addTrack} onRenamePlaylist={updatePlaylist} onDeletePlaylist={deletePlaylist} onRemoveTrack={removeTrack} />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </main>
    )
}

export default App
