import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getYouTubeVideos } from "@/lib/youtube";
import { useQuery } from "@tanstack/react-query";
import { Download, ListPlus, Play } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";

export function SermonLibrary() {
  const { data: sermons, isLoading, error } = useQuery({
    queryKey: ['/api/sermons'],
    queryFn: () => getYouTubeVideos('channel_id', 10),
  });

  const [activeTab, setActiveTab] = useState("latest");

  if (isLoading) {
    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Sermon Library</h3>
          <Tabs defaultValue="latest" className="w-auto">
            <TabsList>
              <TabsTrigger value="latest">Latest</TabsTrigger>
              <TabsTrigger value="topics">Topics</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="space-y-4">
          {[1, 2].map(i => (
            <Card key={i} className="overflow-hidden">
              <div className="animate-pulse">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-1/3">
                    <div className="w-full h-32 bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  <div className="p-3 sm:w-2/3">
                    <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/4 mb-2"></div>
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-full mb-3"></div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 mr-2"></div>
                        <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-20"></div>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-5 h-5 bg-gray-100 dark:bg-gray-800 rounded"></div>
                        <div className="w-5 h-5 bg-gray-100 dark:bg-gray-800 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Sermon Library</h3>
          <Tabs defaultValue="latest" className="w-auto">
            <TabsList>
              <TabsTrigger value="latest">Latest</TabsTrigger>
              <TabsTrigger value="topics">Topics</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-muted-foreground">Failed to load sermons. Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handlePlayVideo = (videoId: string) => {
    console.log(`Playing video ${videoId}`);
    // Implementation depends on how you want to handle video playback
  };

  const handleDownload = (videoId: string) => {
    console.log(`Downloading notes for video ${videoId}`);
    // Implementation would depend on where sermon notes are stored
  };

  const handleAddToPlaylist = (videoId: string) => {
    console.log(`Adding video ${videoId} to playlist`);
    // Implementation would depend on playlist functionality
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Sermon Library</h3>
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-auto"
        >
          <TabsList>
            <TabsTrigger value="latest">Latest</TabsTrigger>
            <TabsTrigger value="topics">Topics</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="space-y-4">
        {sermons?.map((sermon) => (
          <Card key={sermon.id} className="overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-1/3 relative">
                <img 
                  src={sermon.thumbnail} 
                  alt={sermon.title} 
                  className="w-full h-32 sm:h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  {sermon.duration}
                </div>
                <Button 
                  size="icon"
                  variant="secondary"
                  className="absolute inset-0 m-auto opacity-0 hover:opacity-100 transition-opacity bg-black/30 hover:bg-black/50"
                  onClick={() => handlePlayVideo(sermon.id)}
                >
                  <Play className="h-10 w-10" />
                </Button>
              </div>
              <div className="p-3 sm:w-2/3">
                <p className="text-xs text-muted-foreground">
                  {sermon.publishedAt ? format(new Date(sermon.publishedAt), 'MMMM d, yyyy') : 'Recent'}
                </p>
                <h4 className="font-medium mb-1">{sermon.title}</h4>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  Pastor James explains how prayer can be a powerful tool in facing and overcoming life's many challenges.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="w-6 h-6 mr-2">
                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&auto=format&fit=crop&q=80" alt="Pastor James" />
                      <AvatarFallback>PJ</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium">Pastor James</span>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-muted-foreground h-8 w-8"
                      onClick={() => handleDownload(sermon.id)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-muted-foreground h-8 w-8"
                      onClick={() => handleAddToPlaylist(sermon.id)}
                    >
                      <ListPlus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
