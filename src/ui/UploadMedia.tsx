import React, { useRef, useState } from 'react'
import { Upload, Folder } from 'lucide-react'
import { Button } from './button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'
import { Alert, AlertDescription, AlertTitle } from './alert'

const { ipcRenderer } = window.require("electron");

interface UploadMediaProps {
  onUploadComplete: () => void
}

export function UploadMedia({ onUploadComplete }: UploadMediaProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const folderInputRef = useRef<HTMLInputElement>(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      try {
        const filePaths = Array.from(files).map(file => file.path)
        await ipcRenderer.invoke('upload-media', filePaths)
        onUploadComplete()
      } catch (error) {
        console.error('Error uploading files:', error)
      }
    }
  }

  const handleFolderUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      try {
        const folderPath = files[0].path
        await ipcRenderer.invoke('upload-media-folder', folderPath)
        onUploadComplete()
      } catch (error) {
        console.error('Error uploading folder:', error)
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Media</CardTitle>
        <CardDescription>Choose files or a folder to upload</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          multiple
          className="hidden"
          accept="image/*,video/*,audio/*"
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          className="w-full"
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload Files
        </Button>
        <input
          type="file"
          ref={folderInputRef}
          onChange={handleFolderUpload}
          directory=""
          webkitdirectory=""
          className="hidden"
        />
        <Button
          onClick={() => folderInputRef.current?.click()}
          className="w-full"
          variant="outline"
        >
          <Folder className="mr-2 h-4 w-4" />
          Upload Folder
        </Button>
	{uploadSuccess && (
          <Alert className="mt-4">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Media added successfully!</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
