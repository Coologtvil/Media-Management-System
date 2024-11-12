import React from 'react'
import { MediaItem } from './MediaItem'
import { Play, Image as ImageIcon, Music, Film, ExternalLink, Loader2 } from 'lucide-react'
import { Button } from "./button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { ScrollArea } from "./scroll-area"

interface MediaListProps {
  mediaItems: MediaItem[]
  isLoading: boolean
  onPreview: (item: MediaItem) => void
}

export function MediaList({ mediaItems, isLoading, onPreview }: MediaListProps) {
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
    <Card className="flex-grow md:w-2/3">
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
                      <Button variant="outline" size="sm" onClick={() => onPreview(item)} className="mr-2">
                        <Play className="w-4 h-4 mr-1" />
                        <span className="sr-only">Preview</span>
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => console.log('Open externally:', item.path)}>
                        <ExternalLink className="w-4 h-4 mr-1" />
                        <span className="sr-only">Open</span>
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
  )
}
