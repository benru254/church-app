import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getYouTubeVideos } from "@/lib/youtube";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  duration: string;
}

export function VideoList() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // In a real app, we would use the church's YouTube channel ID
  const channelId = "channel_id"; 
  
  const { data: videos, isLoading, error } = useQuery({
    queryKey: ['/api/videos'],
    queryFn: () => getYouTubeVideos(channelId, 5),
  });

  // Handle video click - in a real app, this would open the video player
  const handleVideoClick = (videoId: string) => {
    console.log(`Playing video ${videoId}`);
    // Implementation would depend on how you want to display videos
    // Could open a modal, navigate to a new page, etc.
  };

  if (isLoading) {
    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Short Videos & Highlights</h3>
          <Button variant="link" className="text-primary">See All</Button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="min-w-[200px] max-w-[200px]">
              <div className="animate-pulse">
                <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-1"></div>
                <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Short Videos & Highlights</h3>
          <Button variant="link" className="text-primary">See All</Button>
        </div>
        <p className="text-muted-foreground">Failed to load videos. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">Short Videos & Highlights</h3>
        <Button variant="link" className="text-primary">See All</Button>
      </div>
      
      <div ref={scrollContainerRef} className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {videos?.map((video) => (
          <div key={video.id} className="min-w-[200px] max-w-[200px]">
            <div 
              className="relative cursor-pointer" 
              onClick={() => handleVideoClick(video.id)}
            >
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/70 hover:bg-primary rounded-full text-white">
                  <Play className="h-5 w-5" />
                </div>
              </div>
            </div>
            <p className="text-sm font-medium mt-2">{video.title}</p>
            <p className="text-xs text-muted-foreground">{video.duration} • {video.channelTitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
