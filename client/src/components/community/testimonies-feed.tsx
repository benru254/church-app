import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageSquare, Share, MoreVertical, HandHelping, User } from "lucide-react";
import { Testimony } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

interface EnrichedTestimony extends Testimony {
  user?: {
    id?: number;
    displayName: string;
    profilePicture?: string;
  };
}

export function TestimoniesFeed() {
  // Mock testimonies data
  const mockTestimonies: EnrichedTestimony[] = [
    {
      id: 1,
      userId: 1,
      content: "I was diagnosed with a serious illness last year, but after many prayers, my latest test results came back clear. God is so good!",
      isAnonymous: false,
      imageUrl: "https://images.unsplash.com/photo-1508939029959-5a1f231939f5?w=800&h=600&auto=format&fit=crop&q=80",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      user: {
        id: 1,
        displayName: "Sarah Johnson",
        profilePicture: "https://randomuser.me/api/portraits/women/32.jpg"
      }
    },
    {
      id: 2,
      userId: 2,
      content: "After years of trying, my wife and I are finally expecting our first child. We've been praying for this blessing for so long!",
      isAnonymous: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
      user: {
        id: 2,
        displayName: "Michael Thompson",
        profilePicture: "https://randomuser.me/api/portraits/men/41.jpg"
      }
    },
    {
      id: 3,
      userId: 3, 
      content: "I lost my job during the pandemic and was struggling financially. A member of our church anonymously paid my rent for three months while I found a new job. God provides!",
      isAnonymous: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      user: {
        id: 3,
        displayName: "Anonymous User"
      }
    }
  ];

  // Simulate loading state for 1 second
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [testimonies, setTestimonies] = useState<EnrichedTestimony[]>([]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setTestimonies(mockTestimonies);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const [reactionsMap, setReactionsMap] = useState<Record<number, { count: number, reacted: boolean }>>({});

  const handleReaction = (testimonyId: number) => {
    setReactionsMap(prev => {
      const current = prev[testimonyId] || { count: Math.floor(Math.random() * 50), reacted: false };
      return {
        ...prev,
        [testimonyId]: {
          count: current.reacted ? current.count - 1 : current.count + 1,
          reacted: !current.reacted
        }
      };
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4 mb-6">
        {[1, 2].map(i => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <Skeleton className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </div>
              
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-11/12 mb-2" />
              <Skeleton className="h-4 w-4/5 mb-4" />
              
              <Skeleton className="w-full h-48 rounded-lg mb-3" />
            </CardContent>
            
            <CardFooter className="p-0 border-t">
              <div className="flex w-full">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 flex-1" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-4 text-center mb-6">
        <p className="text-muted-foreground">Failed to load testimonies. Please try again later.</p>
      </Card>
    );
  }

  if (!testimonies || testimonies.length === 0) {
    return (
      <Card className="p-4 text-center mb-6">
        <p className="text-muted-foreground">No testimonies yet. Be the first to share!</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4 mb-6">
      {testimonies.map((testimony) => {
        const reaction = reactionsMap[testimony.id] || { count: Math.floor(Math.random() * 50), reacted: false };
        
        return (
          <Card key={testimony.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  {testimony.isAnonymous ? (
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3">
                      <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </div>
                  ) : testimony.user?.profilePicture ? (
                    <Avatar className="w-10 h-10 mr-3">
                      <AvatarImage src={testimony.user.profilePicture} alt={testimony.user.displayName} />
                      <AvatarFallback>{testimony.user.displayName.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <Avatar className="w-10 h-10 mr-3">
                      <AvatarFallback>{testimony.user?.displayName.charAt(0) || 'A'}</AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <p className="font-medium">{testimony.isAnonymous ? "Anonymous" : testimony.user?.displayName}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(testimony.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5 text-muted-foreground" />
                </Button>
              </div>
              
              <p className="text-sm mb-3">
                {testimony.content}
              </p>
              
              {testimony.imageUrl && (
                <img 
                  src={testimony.imageUrl} 
                  alt="Testimony" 
                  className="w-full rounded-lg mb-3"
                />
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="flex -space-x-1">
                    <div className="bg-primary text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">
                      <Heart className="h-3 w-3" />
                    </div>
                    <div className="bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">
                      <HandHelping className="h-3 w-3" />
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground ml-1">{reaction.count}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {Math.floor(Math.random() * 20)} comments
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="p-0 border-t">
              <div className="flex w-full">
                <Button 
                  variant="ghost" 
                  className="flex-1 py-2 rounded-none"
                  onClick={() => handleReaction(testimony.id)}
                >
                  <HandHelping className={`h-4 w-4 mr-2 ${reaction.reacted ? 'text-red-500' : ''}`} />
                  <span>Praise God</span>
                </Button>
                <Button variant="ghost" className="flex-1 py-2 rounded-none">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  <span>Comment</span>
                </Button>
                <Button variant="ghost" className="flex-1 py-2 rounded-none">
                  <Share className="h-4 w-4 mr-2" />
                  <span>Share</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
