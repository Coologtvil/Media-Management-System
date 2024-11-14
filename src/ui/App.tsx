"use client"

import React, { useState, useEffect } from 'react'
import { MediaItem } from './MediaItem'
import { SearchBar } from './SearchBar'
import { MediaList } from './MediaList'
import { MediaPreview } from './MediaPreview'
import {Moon, Sun} from 'lucide-react'
import { Button } from './button'
export default function App() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)
// fetch from DB
/*  useEffect(() => {
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
*/

//MOck Data
useEffect(() => {
    // Simulating data fetch with a delay
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500))
      const mockData: MediaItem[] = [
        { id: 1, name: 'Beach Sunset', type: 'photo', path: '/placeholder.svg?height=400&width=600' },
        { id: 2, name: 'Mountain Timelapse', type: 'video', path: 'https://example.com/mountain-timelapse.mp4' },
        { id: 3, name: 'Relaxing Rain Sounds', type: 'audio', path: 'https://example.com/relaxing-rain.mp3' },
        { id: 4, name: 'City Nightscape', type: 'photo', path: '/placeholder.svg?height=400&width=600' },
        { id: 5, name: 'Ocean Waves', type: 'video', path: 'https://example.com/ocean-waves.mp4' },
        { id: 6, name: 'Forest Ambience', type: 'audio', path: 'https://example.com/forest-ambience.mp3' },
      ]
      setMediaItems(mockData)
      setIsLoading(false)
    }
    fetchData()
  }, [])

   useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])


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
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }
  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col">
     <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Media Manager</h1>
          <Button variant="outline" size="icon" onClick={toggleDarkMode} aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}>
            {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
        </header>
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
