import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export function ProfileHeader() {
  const { user } = useAuth();
  
  if (!user) return null;

  // In a real app, we'd calculate this from the user's createdAt field
  const memberSince = "January 2022";

  return (
    <div className="mb-6">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="relative mb-3">
          <Avatar className="w-24 h-24 border-4 border-background">
            {user.profilePicture ? (
              <AvatarImage 
                src={user.profilePicture} 
                alt={user.displayName}
                className="object-cover"
              />
            ) : (
              <AvatarFallback className="text-2xl">
                {user.displayName.charAt(0)}
              </AvatarFallback>
            )}
          </Avatar>
          <Button 
            size="icon" 
            className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
        <h2 className="text-xl font-semibold">{user.displayName}</h2>
        <p className="text-muted-foreground text-sm">Member since {memberSince}</p>
      </div>
      
      <Card className="overflow-hidden mb-6">
        <CardContent className="p-0">
          <div className="grid grid-cols-3 divide-x divide-border">
            <div className="p-4 text-center">
              <p className="text-2xl font-semibold">12</p>
              <p className="text-xs text-muted-foreground">Testimonies</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-2xl font-semibold">45</p>
              <p className="text-xs text-muted-foreground">Comments</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-2xl font-semibold">8</p>
              <p className="text-xs text-muted-foreground">Donations</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
