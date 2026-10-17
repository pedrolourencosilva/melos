export function formatDuration(seconds: number): string {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return m + ":" + String(s).padStart(2, "0")
}

export function formatTotalDuration(seconds: number): string {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return h > 0 ? `${h} h ${m} min` : `${m} min ${s} s`
}

export function formatDate(date: string): string {
    return new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}
