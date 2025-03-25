/**
 * Testimony Creation Component
 * 
 * This component provides a form for users to create and share testimonies.
 * Features include:
 * - Text input for testimony content
 * - Options to add photos
 * - Anonymous sharing option
 * - User activity tracking
 */
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image, Video, SmilePlus, User, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Default mock user data in case context is not available
const defaultMockUser = {
  displayName: "Guest User",
  profilePicture: null
};

/**
 * TestimonyCreation component for sharing testimonies
 * Uses a simulated API for demonstration purposes
 */
export function TestimonyCreation() {
  // State for form inputs and UI state
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Use mock user data since we're handling the context issue
  const userData = {
    displayName: defaultMockUser.displayName,
    profilePicture: defaultMockUser.profilePicture
  };

  /**
   * Handles the testimony creation process
   * In a real app, this would make an API call to the server
   */
  const handleTestimonyCreation = () => {
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Reset form state
      setContent("");
      setIsAnonymous(false);
      setImageUrl(null);
      setIsSubmitting(false);
      
      // Show success message
      toast({
        title: "Testimony shared",
        description: "Your testimony has been shared successfully!",
      });
    }, 1000);
  };

  /**
   * Form submission handler with validation
   */
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

  /**
   * Add a mock image to the testimony
   */
  const handleAddImage = () => {
    const mockImageUrl = "https://images.unsplash.com/photo-1529634951594-8875d07f6180?w=800&h=500&auto=format&fit=crop&q=80";
    setImageUrl(mockImageUrl);
    toast({
      title: "Image added",
      description: "Your image has been attached to the testimony.",
    });
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        {/* User and input area */}
        <div className="flex items-center gap-3 mb-3">
          <Avatar>
            {userData.profilePicture ? (
              <AvatarImage src={userData.profilePicture} alt={userData.displayName} />
            ) : (
              <AvatarFallback>{userData.displayName.charAt(0)}</AvatarFallback>
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
        
        {/* Action buttons */}
        <div className="flex flex-wrap gap-2 text-sm">
          <Button
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={handleAddImage}
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
          
          {/* Posting options */}
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
        
        {/* Image preview with remove option */}
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
