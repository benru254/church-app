import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image, Video, SmilePlus, User, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/context/user-context";

export function TestimonyCreation() {
  const { user, incrementActivity } = useUser();
  const { toast } = useToast();
  
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock testimony creation functionality
  const handleTestimonyCreation = () => {
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setContent("");
      setIsAnonymous(false);
      setImageUrl(null);
      setIsSubmitting(false);
      
      // Update user's testimony count
      incrementActivity('testimoniesShared');
      
      toast({
        title: "Testimony shared",
        description: "Your testimony has been shared successfully!",
      });
    }, 1000);
  };

  const handleSubmit = () => {
    if (!content.trim()) {
      toast({
        title: "Empty testimony",
        description: "Please write something to share.",
        variant: "destructive",
      });
      return;
    }

    handleTestimonyCreation();
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar>
            {user.profilePicture ? (
              <AvatarImage src={user.profilePicture} alt={user.displayName} />
            ) : (
              <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1">
            <Input
              placeholder="Share your testimony..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-muted"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          <Button
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={() => {
              // In a real app, this would open an image picker
              const mockImageUrl = "https://images.unsplash.com/photo-1529634951594-8875d07f6180?w=800&h=500&auto=format&fit=crop&q=80";
              setImageUrl(mockImageUrl);
              toast({
                title: "Image added",
                description: "Your image has been attached to the testimony.",
              });
            }}
          >
            <Image className="h-4 w-4" />
            <span>Photo</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Video className="h-4 w-4" />
            <span>Video</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <SmilePlus className="h-4 w-4" />
            <span>Feeling</span>
          </Button>
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant={isAnonymous ? "default" : "outline"}
              size="sm"
              className="gap-1"
              onClick={() => setIsAnonymous(!isAnonymous)}
            >
              <User className="h-4 w-4" />
              <span>Anonymous</span>
            </Button>
            <Button 
              size="sm" 
              onClick={handleSubmit}
              disabled={isSubmitting || !content.trim()}
            >
              {isSubmitting ? "Sharing..." : "Share"}
            </Button>
          </div>
        </div>
        {imageUrl && (
          <div className="mt-3 relative">
            <img src={imageUrl} alt="Attached" className="w-full h-40 object-cover rounded-md" />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6"
              onClick={() => setImageUrl(null)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
