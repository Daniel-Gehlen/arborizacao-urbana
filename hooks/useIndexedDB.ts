import { useState, useEffect, useCallback } from "react"

const DB_NAME = "ArborizacaoDB"
const STORE_NAME = "ArborizacaoData"

export function useIndexedDB() {
  const [db, setDb] = useState<IDBDatabase | null>(null)

  useEffect(() => {
    const request = indexedDB.open(DB_NAME, 1)

    request.onerror = (event) => {
      console.error("IndexedDB error:", event)
    }

    request.onsuccess = (event) => {
      setDb((event.target as IDBOpenDBRequest).result)
    }

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true })
    }
  }, [])

  const addData = useCallback(
    (data: any) => {
      return new Promise((resolve, reject) => {
        if (!db) {
          reject("Database not initialized")
          return
        }

        const transaction = db.transaction([STORE_NAME], "readwrite")
        const store = transaction.objectStore(STORE_NAME)
        const request = store.add(data)

        request.onerror = () => reject(request.error)
        request.onsuccess = () => resolve(request.result)
      })
    },
    [db],
  )

  const getAllData = useCallback(() => {
    return new Promise<any[]>((resolve, reject) => {
      if (!db) {
        reject("Database not initialized")
        return
      }

      const transaction = db.transaction([STORE_NAME], "readonly")
      const store = transaction.objectStore(STORE_NAME)
      const request = store.getAll()

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  }, [db])

  return { addData, getAllData }
}

