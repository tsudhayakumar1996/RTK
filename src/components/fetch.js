export const fetchApi = async (e) => {
    const response = await fetch(e)
    const data = await response.json()
    return data
}