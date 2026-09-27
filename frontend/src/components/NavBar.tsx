import { NavLink, Link } from "react-router"

export function NavBar() {
    return (
        <nav className="flex gap-6 py-4">
            <Link to="/"><strong>Melos</strong></Link>
            <NavLink to="/library" className={linkClass}>Library</NavLink>
            <NavLink to="/playlists" className={linkClass}>Playlists</NavLink>
        </nav>
    )
}

function linkClass({ isActive }: { isActive: boolean }) {
    return isActive ? "font-bold" : "text-gray-500"
}
