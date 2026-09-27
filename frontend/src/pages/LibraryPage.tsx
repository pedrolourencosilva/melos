import { tracks } from "../data.ts"
import { TrackList } from "../components/TrackList.tsx"

export function LibraryPage() {
    return (
        <>
            <h1 className="text-3xl font-bold">Library</h1>
            <TrackList tracks={tracks} />
        </>
    )
}
