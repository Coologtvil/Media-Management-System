export interface MediaItem {
  id: number
  name: string
  type: 'photo' | 'video' | 'audio'
  path: string
}
