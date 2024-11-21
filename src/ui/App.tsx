'use client'

import React, { useState, useEffect } from 'react'
import { MediaItem } from './MediaItem'
import { SearchBar } from './SearchBar'
import { MediaList } from './MediaList'
import { MediaPreview } from './MediaPreview'
import { UploadMedia } from './UploadMedia'
import Collections from './Collections'
import { Moon, Sun, Upload, Home, FolderOpen } from 'lucide-react'
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
  const [currentPage, setCurrentPage] = useState('home')
 
  useEffect(() => {
    fetchMediaItems();
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
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div className="w-64 bg-sidebar text-sidebar-foreground p-4 flex flex-col">
        <h1 className="text-2xl font-bold mb-6">Media Manager</h1>
        <nav className="space-y-2">
          <Button
            variant={currentPage === 'home' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setCurrentPage('home')}
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
          <Button
            variant={currentPage === 'collections' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setCurrentPage('collections')}
          >
            <FolderOpen className="mr-2 h-4 w-4" />
            Collections
          </Button>
        </nav>
        <div className="mt-auto">
          <Button variant="outline" size="icon" onClick={toggleDarkMode} className="w-full">
            {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-4">
          {currentPage === 'home' && (
            <>
              <SearchBar onSearch={handleSearch} />
              <Button onClick={() => setIsUploadModalOpen(true)} className="mb-4">
                <Upload className="mr-2 h-4 w-4" />
                Upload Media
              </Button>
              <div className="flex flex-col md:flex-row gap-6">
                <MediaList
                  mediaItems={mediaItems}
                  isLoading={isLoading}
                  onPreview={handlePreview}
                />
                <MediaPreview selectedItem={selectedItem} />
              </div>
            </>
          )}
          {currentPage === 'collections' && <Collections />}
        </div>
      </div>

      <Modal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)}>
        <UploadMedia onUploadComplete={handleUploadComplete} />
      </Modal>
    </div>
  )
}
