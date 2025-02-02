import { useState, useEffect } from "react"

const STORAGE_KEY = "lastSubmission"

export function useIpLimiter() {
  const [canSubmit, setCanSubmit] = useState(true)

  useEffect(() => {
    const lastSubmission = localStorage.getItem(STORAGE_KEY)
    if (lastSubmission) {
      const lastDate = new Date(lastSubmission)
      const currentDate = new Date()
      const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setCanSubmit(diffDays >= 30)
    }
  }, [])

  const updateSubmission = () => {
    localStorage.setItem(STORAGE_KEY, new Date().toISOString())
    setCanSubmit(false)
  }

  return { canSubmit, updateSubmission }
}

