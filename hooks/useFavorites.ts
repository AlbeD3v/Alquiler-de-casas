'use client'

import { useState, useEffect, useCallback } from 'react'

interface UseFavoritesReturn {
  favorites: string[]
  isFavorite: (id: string) => boolean
  toggleFavorite: (id: string) => void
  addFavorite: (id: string) => void
  removeFavorite: (id: string) => void
}

export function useFavorites(): UseFavoritesReturn {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('cubaprop-favorites')
    if (saved) {
      try {
        setFavorites(JSON.parse(saved))
      } catch (e) {
        console.error('Error parsing favorites:', e)
      }
    }
  }, [])

  const saveFavorites = useCallback((favs: string[]) => {
    setFavorites(favs)
    localStorage.setItem('cubaprop-favorites', JSON.stringify(favs))
  }, [])

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites])

  const toggleFavorite = useCallback(
    (id: string) => {
      const newFavs = isFavorite(id)
        ? favorites.filter((favId) => favId !== id)
        : [...favorites, id]
      saveFavorites(newFavs)
    },
    [favorites, isFavorite, saveFavorites]
  )

  const addFavorite = useCallback(
    (id: string) => {
      if (!isFavorite(id)) {
        saveFavorites([...favorites, id])
      }
    },
    [favorites, isFavorite, saveFavorites]
  )

  const removeFavorite = useCallback(
    (id: string) => {
      if (isFavorite(id)) {
        saveFavorites(favorites.filter((favId) => favId !== id))
      }
    },
    [favorites, isFavorite, saveFavorites]
  )

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
  }
}
