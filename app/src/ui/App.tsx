"use client"

import React, { useState, useEffect } from 'react'
import { Play, Image as ImageIcon, Music, Film, ExternalLink, Search, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { Button } from "./button"
import { Input } from "./input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"
import { ScrollArea } from "./scroll-area"

interface MediaItem {
  id: number
  name: string
  type: 'photo' | 'video' | 'audio'
  path: string
}

export default function Component() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
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

  const handleSearch = () => {
    console.log('Searching for:', searchTerm)
  }

  const handlePreview = (item: MediaItem) => {
    setSelectedItem(item)
  }

  const handleOpenExternal = (item: MediaItem) => {
    console.log('Opening externally:', item.path)
  }

  const getIconForType = (type: string) => {
    switch (type) {
      case 'photo':
        return <ImageIcon className="w-5 h-5" />
      case 'video':
        return <Film className="w-5 h-5" />
      case 'audio':
        return <Music className="w-5 h-5" />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold mb-8 text-center">Media Manager</h1>
      <div className="flex mb-6">
        <Input
          type="text"
          placeholder="Search media..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mr-2"
        />
        <Button onClick={handleSearch}>
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-grow border md:w-2/3">
          <CardHeader>
            <CardTitle>Media Library</CardTitle>
            <CardDescription>Browse and manage your media files</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-300px)]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Type</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="w-36">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={3} className="h-24 text-center">
                        <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                        <span className="sr-only">Loading media items...</span>
                      </TableCell>
                    </TableRow>
                  ) : (
                    mediaItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{getIconForType(item.type)}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" onClick={() => handlePreview(item)} className="mr-2">
                            <Play className="w-4 h-4 mr-1" />
                            <span className="sr-only"></span>
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleOpenExternal(item)}>
                            <ExternalLink className="w-4 h-4 mr-1" />
                            <span className="sr-only"></span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
        <Card className="flex-grow border md:w-1/3">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>Selected media preview</CardDescription>
          </CardHeader>
          <CardContent className="h-[calc(100vh-300px)] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {selectedItem ? (
                <motion.div
                  key={selectedItem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full flex flex-col items-center justify-center"
                >
                  <h2 className="text-xl font-semibold mb-4">{selectedItem.name}</h2>
                  {selectedItem.type === 'photo' && (
                    <img src={selectedItem.path} alt={selectedItem.name} className="max-w-full max-h-[calc(100%-2rem)] object-contain rounded-lg shadow-md" />
                  )}
                  {selectedItem.type === 'video' && (
                    <video src={selectedItem.path} controls className="max-w-full max-h-[calc(100%-2rem)] rounded-lg shadow-md" />
                  )}
                  {selectedItem.type === 'audio' && (
                    <audio src={selectedItem.path} controls className="w-full max-w-md" />
                  )}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-gray-500"
                >
                  Select an item to preview
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

