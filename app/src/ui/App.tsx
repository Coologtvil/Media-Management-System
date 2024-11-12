"use client"

import React, { useState, useEffect } from 'react'
import { MediaItem } from './MediaItem'
import { SearchBar } from './SearchBar'
import { MediaList } from './MediaList'
import { MediaPreview } from './MediaPreview'

export default function App() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/media-items')
        const data = await response.json()
        setMediaItems(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching media items:', error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    // Filter media items based on the search term
    const filteredItems = mediaItems.filter(item =>
      item.name.toLowerCase().includes(term.toLowerCase())
    )
    setMediaItems(filteredItems)
  }

  const handlePreview = (item: MediaItem) => {
    setSelectedItem(item)
  }

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold mb-8 text-center">Media Manager</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="flex-grow flex flex-col md:flex-row gap-6">
        <MediaList
          mediaItems={mediaItems}
          isLoading={isLoading}
          onPreview={handlePreview}
        />
        <MediaPreview selectedItem={selectedItem} />
      </div>
    </div>
  )
}
