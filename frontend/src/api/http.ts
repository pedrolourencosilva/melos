const BASE_URL = "http://localhost:8000/api"

export async function get<T>(path: string): Promise<T> {
    const response = await fetch(BASE_URL + path)
    if (!response.ok) throw new Error(`GET ${path} failed: ${response.status}`)
    return response.json()
}

export async function send(method: string, path: string, body?: object): Promise<void> {
    const response = await fetch(BASE_URL + path, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })
    if (!response.ok) throw new Error(`${method} ${path} failed: ${response.status}`)
}
