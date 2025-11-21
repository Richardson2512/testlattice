'use client'

interface VideoPlayerProps {
  videoUrl: string
  title?: string
}

export default function VideoPlayer({ videoUrl, title = 'Test Run Video' }: VideoPlayerProps) {
  return (
    <div style={{
      width: '100%',
      maxWidth: '1280px',
      margin: '0 auto',
      backgroundColor: '#1a1a1a',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        paddingBottom: '56.25%', // 16:9 aspect ratio
        backgroundColor: '#2a2a2a',
      }}>
        <iframe
          src={videoUrl}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          title={title}
        />
      </div>
    </div>
  )
}

