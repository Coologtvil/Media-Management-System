import React from 'react'
import { MediaItem } from './MediaItem'
import { Card, CardContent } from "./card"
import { Button } from "./button"
import { Loader2, Trash2 } from 'lucide-react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../components/ui/alert-dialog"

interface MediaListProps {
  mediaItems: MediaItem[]
  isLoading: boolean
  onPreview: (item: MediaItem) => void
  onDelete: (id: number) => void
}

export function MediaList({ mediaItems, isLoading, onPreview, onDelete }: MediaListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {mediaItems.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="aspect-square mb-2 bg-muted flex items-center justify-center">
              {item.type === 'image' ? (
                <img src={item.path} alt={item.name} className="object-cover w-full h-full" />
              ) : (
                <div className="text-4xl">{item.type.charAt(0).toUpperCase()}</div>
              )}
            </div>
            <h3 className="font-semibold mb-1 truncate">{item.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{item.format}</p>
            <div className="flex justify-between">
              <Button variant="outline" size="sm" onClick={() => onPreview(item)}>
                View
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4 mr-2" />
                    
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the media item
                      from your database.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDelete(item.id)}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
