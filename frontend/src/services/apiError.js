export const parseApiResponse = async (response, fallbackMessage = 'Request failed') => {
  let data = {}

  try {
    data = await response.json()
  } catch {
    data = {}
  }

  if (!response.ok) {
    const error = new Error(data.message || fallbackMessage)
    error.status = response.status
    error.errors = Array.isArray(data.errors) ? data.errors : []
    throw error
  }

  return data
}
