import { useCallback } from "react"

export function useCEP() {
  const fetchAddress = useCallback(async (cep: string) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      if (!response.ok) {
        throw new Error("Failed to fetch address")
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error fetching address:", error)
      return null
    }
  }, [])

  return { fetchAddress }
}

