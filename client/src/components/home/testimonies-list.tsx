import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageSquare } from "lucide-react";
import { Testimony } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";

interface EnrichedTestimony extends Testimony {
  user?: {
    id?: number;
    displayName: string;
    profilePicture?: string;
  };
}

export function TestimoniesList() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const { data: testimonies, isLoading, error } = useQuery<EnrichedTestimony[]>({
    queryKey: ["/api/testimonies"],
  });

  if (isLoading) {
    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Recent Testimonies</h3>
          <Button variant="link" className="text-primary">See All</Button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[1, 2, 3].map(i => (
            <Card key={i} className="min-w-[260px] max-w-[260px]">
              <CardContent className="p-4">
                <div className="animate-pulse">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 mr-2"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-1"></div>
                      <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-16"></div>
                    </div>
                  </div>
                  <div className="h-16 bg-gray-100 dark:bg-gray-800 rounded mb-3"></div>
                  <div className="flex gap-2">
                    <div className="h-7 bg-gray-100 dark:bg-gray-800 rounded w-24"></div>
                    <div className="h-7 bg-gray-100 dark:bg-gray-800 rounded w-24"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Recent Testimonies</h3>
          <Button variant="link" className="text-primary">See All</Button>
        </div>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-muted-foreground">Failed to load testimonies. Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!testimonies || testimonies.length === 0) {
    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Recent Testimonies</h3>
          <Button variant="link" className="text-primary">See All</Button>
        </div>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-muted-foreground">No testimonies yet. Be the first to share!</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">Recent Testimonies</h3>
        <Button variant="link" className="text-primary">See All</Button>
      </div>
      
      <div ref={scrollContainerRef} className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {testimonies.map((testimony) => (
          <Card key={testimony.id} className="min-w-[260px] max-w-[260px]">
            <CardContent className="p-4">
              <div className="flex items-center mb-3">
                {testimony.user?.profilePicture ? (
                  <Avatar className="w-8 h-8 mr-2">
                    <AvatarImage src={testimony.user.profilePicture} alt={testimony.user.displayName} />
                    <AvatarFallback>{testimony.user.displayName.charAt(0)}</AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-2">
                    <span className="text-xs">{testimony.user?.displayName.charAt(0) || 'A'}</span>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium">{testimony.user?.displayName || "Anonymous"}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(testimony.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {testimony.content}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <Button variant="outline" size="sm" className="text-xs">
                  <Heart className="h-3 w-3 mr-1" /> Praise God
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <MessageSquare className="h-3 w-3 mr-1" /> Comment
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
