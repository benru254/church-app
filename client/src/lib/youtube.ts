// YouTube API Integration
// Normally we would use the YouTube API key from environment variables
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || "youtube_api_key";

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  duration: string;
}

interface LiveStreamStatus {
  isLive: boolean;
  videoId: string | null;
  title: string | null;
  viewerCount: number | null;
}

/**
 * Get videos from a specific YouTube channel or playlist
 */
export async function getYouTubeVideos(channelId: string, maxResults = 10): Promise<YouTubeVideo[]> {
  try {
    // In a real implementation, we would make an API call to YouTube Data API v3
    // For this demo, we'll return mock data
    return [
      {
        id: "video1",
        title: "Sunday Service: The Power of Faith",
        thumbnail: "https://images.unsplash.com/photo-1616849540498-78bb2c54d29b?w=800&h=450&auto=format&fit=crop&q=80",
        channelTitle: "Grace Fellowship",
        publishedAt: "2023-04-30T10:00:00Z",
        duration: "42:15"
      },
      {
        id: "video2",
        title: "Finding Your Purpose in Christ",
        thumbnail: "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=300&h=200&auto=format&fit=crop&q=80",
        channelTitle: "Grace Fellowship",
        publishedAt: "2023-04-23T10:00:00Z",
        duration: "38:50"
      },
      {
        id: "video3",
        title: "Overcoming Life's Challenges through Prayer",
        thumbnail: "https://images.unsplash.com/photo-1585485673520-3254c058b414?w=300&h=200&auto=format&fit=crop&q=80",
        channelTitle: "Grace Fellowship",
        publishedAt: "2023-04-16T10:00:00Z",
        duration: "45:22"
      }
    ];
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    throw new Error("Failed to fetch videos");
  }
}

/**
 * Check if a channel is currently live streaming
 */
export async function checkLiveStreamStatus(channelId: string): Promise<LiveStreamStatus> {
  try {
    // In a real implementation, we would check the channel's live status via YouTube API
    // For this demo, we'll return mock data
    return {
      isLive: true,
      videoId: "live1",
      title: "Sunday Service: The Power of Faith",
      viewerCount: 245
    };
  } catch (error) {
    console.error("Error checking live stream status:", error);
    return {
      isLive: false,
      videoId: null,
      title: null,
      viewerCount: null
    };
  }
}

/**
 * Get the embed URL for a YouTube video
 */
export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
}

export default {
  getYouTubeVideos,
  checkLiveStreamStatus,
  getYouTubeEmbedUrl
};
