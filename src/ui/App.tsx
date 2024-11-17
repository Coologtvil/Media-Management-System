"use client"

import React, { useState, useEffect } from 'react'
import { MediaItem } from './MediaItem'
import { SearchBar } from './SearchBar'
import { MediaList } from './MediaList'
import { MediaPreview } from './MediaPreview'
import { UploadMedia } from './UploadMedia'
import {Moon, Sun, Upload} from 'lucide-react'
import { Button } from './button'
import { Modal } from './Modal'

const { ipcRenderer } = window.require("electron");

export default function App() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
 
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
  const fetchData = async () => {
    try {
      const data = await ipcRenderer.invoke("fetch-media");
      setMediaItems(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching media items:", error);
      setIsLoading(false);
    }
  };

  fetchData();
}, []);

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
  const fetchMediaItems = async () => {
    try {
      const data = await ipcRenderer.invoke("fetch-media");
      setMediaItems(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching media items:", error);
      setIsLoading(false);
    }
  };
  const handleUploadComplete = () => {
    fetchMediaItems();
    setIsUploadModalOpen(false);
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
     <Button onClick={() => setIsUploadModalOpen(true)}>
          <Upload className="mr-2 h-4 w-4" />
          Upload Media
        </Button>
      <div className="flex-grow flex flex-col md:flex-row gap-6">
        <MediaList
          mediaItems={mediaItems}
          isLoading={isLoading}
          onPreview={handlePreview}
        />
        <MediaPreview selectedItem={selectedItem} />
      </div>
      <Modal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)}>
        <UploadMedia onUploadComplete={handleUploadComplete} />
      </Modal>
    </div>
  )
}
