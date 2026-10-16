import { SearchForm } from "../components/discover/SearchForm.tsx"
import { DeezerResults } from "../components/discover/DeezerResults.tsx"
import { useDeezerSearch } from "../hooks/useDeezerSearch.ts"

export function DiscoverPage() {
    const { results, imported, error, search, importTrack } = useDeezerSearch()
    if (error !== undefined) return <p> {error}</p>
    return (
        <>
            <h1 className="text-3xl font-bold">Discover</h1>
            <SearchForm onSearch={search} />
            <DeezerResults results={results} imported={imported} onImportTrack={importTrack} />
        </>
    )
}
