import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Play, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export function SavedContents() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Mock data for UI development
  const [savedContents, setSavedContents] = useState([
    {
      id: 1,
      userId: 1,
      contentId: "sermon123",
      contentType: "video",
      title: "Sunday Sermon: Faith and Patience",
      thumbnail: "",
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      userId: 1,
      contentId: "devotional456",
      contentType: "article",
      title: "Daily Devotional: Finding Peace in Chaos",
      thumbnail: null,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]);

  const handleRemove = (id: number) => {
    setSavedContents(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Content removed",
      description: "The saved content has been removed successfully.",
    });
  };

  if (isLoading) {
    return (
      <Card className="mb-6">
        <CardHeader className="px-4 py-3 border-b">
          <CardTitle className="text-base font-medium">Saved Content</CardTitle>
        </CardHeader>
        
        <CardContent className="p-4 space-y-4">
          {[1, 2].map(i => (
            <div key={i} className="flex gap-3">
              <Skeleton className="w-16 h-16 rounded-lg" />
              <div className="flex-1">
                <Skeleton className="h-4 w-3/4 mb-1" />
                <Skeleton className="h-3 w-1/2 mb-2" />
                <div className="flex gap-2">
                  <Skeleton className="h-7 w-16 rounded-full" />
                  <Skeleton className="h-7 w-20 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mb-6">
        <CardHeader className="px-4 py-3 border-b">
          <CardTitle className="text-base font-medium">Saved Content</CardTitle>
        </CardHeader>
        
        <CardContent className="p-4 text-center">
          <p className="text-muted-foreground">Failed to load saved content. Please try again later.</p>
        </CardContent>
      </Card>
    );
  }

  if (!savedContents || savedContents.length === 0) {
    return (
      <Card className="mb-6">
        <CardHeader className="px-4 py-3 border-b">
          <CardTitle className="text-base font-medium">Saved Content</CardTitle>
        </CardHeader>
        
        <CardContent className="p-4 text-center">
          <p className="text-muted-foreground">You don't have any saved content yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader className="px-4 py-3 border-b">
        <CardTitle className="text-base font-medium">Saved Content</CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 space-y-4">
        {savedContents.map((content) => (
          <div key={content.id} className="flex gap-3">
            {content.contentType === 'video' ? (
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                {content.thumbnail ? (
                  <img src={content.thumbnail} alt={content.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <Play className="h-6 w-6" />
                  </div>
                )}
              </div>
            ) : (
              <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/30 rounded-lg flex items-center justify-center text-primary">
                <BookOpen className="h-6 w-6" />
              </div>
            )}
            
            <div className="flex-1">
              <p className="font-medium text-sm">{content.title}</p>
              <p className="text-xs text-muted-foreground mb-1">
                {new Date(content.createdAt).toLocaleDateString()}
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-xs gap-1">
                  {content.contentType === 'video' ? (
                    <>
                      <Play className="h-3 w-3" /> Play
                    </>
                  ) : (
                    <>
                      <BookOpen className="h-3 w-3" /> Read
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs gap-1"
                  onClick={() => handleRemove(content.id)}
                >
                  <Trash className="h-3 w-3" /> Remove
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
