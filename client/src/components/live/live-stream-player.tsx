import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Share, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { checkLiveStreamStatus, getYouTubeEmbedUrl } from "@/lib/youtube";

export function LiveStreamPlayer() {
  const [isLive, setIsLive] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string | null>(null);
  const [viewerCount, setViewerCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLiveStatus = async () => {
      try {
        setIsLoading(true);
        const channelId = "church_channel_id"; // This would be your church's channel ID
        const liveStatus = await checkLiveStreamStatus(channelId);
        
        setIsLive(liveStatus.isLive);
        setVideoId(liveStatus.videoId);
        setVideoTitle(liveStatus.title);
        setViewerCount(liveStatus.viewerCount);
      } catch (error) {
        console.error("Error checking live status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLiveStatus();
    
    // Check for live status every minute
    const interval = setInterval(checkLiveStatus, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-6">
      <Card className="overflow-hidden">
        <div className="bg-gray-900 rounded-t-lg overflow-hidden relative aspect-video">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-800">
              <Clock className="h-8 w-8 text-gray-500 animate-pulse" />
            </div>
          ) : isLive && videoId ? (
            <iframe
              src={getYouTubeEmbedUrl(videoId)}
              title="YouTube Live Stream"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 text-white p-4">
              <img 
                src="https://images.unsplash.com/photo-1616849540498-78bb2c54d29b?w=800&h=450&auto=format&fit=crop&q=80" 
                alt="Church Service" 
                className="w-full h-full object-cover absolute inset-0"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                <h3 className="text-xl font-bold mb-2">No Live Stream</h3>
                <p className="text-center mb-4">There is no live stream currently active.</p>
                <Button className="bg-primary hover:bg-primary/90">
                  Check Past Sermons
                </Button>
              </div>
            </div>
          )}
          
          {isLive && (
            <div className="absolute top-3 right-3 flex gap-2">
              <Badge variant="destructive" className="animate-pulse flex gap-1 items-center">
                <span className="w-2 h-2 rounded-full bg-white inline-block mr-1"></span> 
                LIVE
              </Badge>
              {viewerCount && (
                <Badge variant="secondary" className="bg-black/50 border-0">
                  {viewerCount} watching
                </Badge>
              )}
            </div>
          )}
        </div>
        
        <CardContent className="p-3">
          {isLive && videoTitle ? (
            <>
              <h2 className="font-semibold text-lg">{videoTitle}</h2>
              <p className="text-sm text-muted-foreground mb-2">Pastor James • Live now</p>
              
              <div className="flex gap-2 overflow-x-auto scrollbar-hide py-2">
                <Badge variant="outline" className="text-primary">
                  #SundayService
                </Badge>
                <Badge variant="outline" className="text-primary">
                  #Faith
                </Badge>
                <Badge variant="outline" className="text-primary">
                  #GraceFellowship
                </Badge>
              </div>
              
              <div className="flex gap-3 mt-3">
                <Button variant="outline" className="flex-1 gap-1">
                  <Heart className="h-4 w-4" />
                  <span className="text-sm">152</span>
                </Button>
                <Button variant="outline" className="flex-1 gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-sm">Comments</span>
                </Button>
                <Button variant="outline" className="flex-1 gap-1">
                  <Share className="h-4 w-4" />
                  <span className="text-sm">Share</span>
                </Button>
              </div>
            </>
          ) : (
            <>
              <h2 className="font-semibold text-lg">Next Live Stream</h2>
              <p className="text-sm text-muted-foreground">Sunday at 10:00 AM</p>
              <Button className="w-full mt-3">
                Set Reminder
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
