import { HomePage } from "./pages/HomePage.tsx"
import { LibraryPage } from "./pages/LibraryPage.tsx"
import { PlaylistsPage } from "./pages/PlaylistsPage.tsx"
import { PlaylistPage } from "./pages/PlaylistPage.tsx"
import { NotFoundPage } from "./pages/NotFoundPage.tsx"
import { NavBar } from './components/NavBar.tsx'
import { Route, Routes } from "react-router"

function App() {
    return (
        <main className="max-w-3xl mx-auto">
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/library" element={<LibraryPage />} />
                <Route path="/playlists" element={<PlaylistsPage />} />
                <Route path="/playlists/:playlistId" element={<PlaylistPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </main>
    )
}

export default App
