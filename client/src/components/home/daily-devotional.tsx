import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageSquare, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface DailyDevotionalProps {
  title: string;
  content: string;
  imageUrl: string;
  likes: number;
  comments: number;
}

export function DailyDevotional({
  title = "Finding Peace in God's Presence",
  content = "In today's fast-paced world, finding moments of peace can seem impossible. But scripture teaches us that true peace comes from spending time in God's presence...",
  imageUrl = "https://images.unsplash.com/photo-1603378517858-7cae1c080887?w=800&h=400&auto=format&fit=crop&q=80",
  likes = 24,
  comments = 8
}: Partial<DailyDevotionalProps>) {
  return (
    <Card className="mb-6 overflow-hidden">
      <img 
        src={imageUrl} 
        alt="Prayer and Bible" 
        className="w-full h-40 object-cover"
      />
      <CardContent className="p-4">
        <p className="text-xs font-medium text-primary mb-1">DAILY DEVOTIONAL</p>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-3">
          {content}
        </p>
        <Button variant="link" className="text-primary font-medium text-sm p-0" onClick={() => {}}>
          Read More
        </Button>
        
        <Separator className="my-3" />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground">
              <Heart className="h-4 w-4" />
              <span className="text-xs">{likes}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground">
              <MessageSquare className="h-4 w-4" />
              <span className="text-xs">{comments}</span>
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Share className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
