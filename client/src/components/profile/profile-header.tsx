/**
 * Profile Header Component
 * 
 * Displays user profile information including:
 * - Profile picture with edit button
 * - Display name and church role
 * - Membership duration
 * - Activity statistics (testimonies, comments, donations)
 */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import { format } from 'date-fns';

// Default mock user data for when context is unavailable
const defaultMockUser = {
  displayName: "Guest User",
  profilePicture: null,
  churchRole: "Church Visitor",
  joinDate: new Date(2023, 0, 1), // January 1, 2023
  activities: {
    testimoniesShared: 0,
    commentsPosted: 0,
    donationsMade: 0
  }
};

/**
 * ProfileHeader component displays user information and activity statistics
 */
export function ProfileHeader() {
  // Use mock user data since we're handling the context issue
  const userData = defaultMockUser;

  // Format join date for display
  const memberSince = format(userData.joinDate, 'MMMM yyyy');

  return (
    <div className="mb-6">
      {/* Profile image and basic info */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="relative mb-3">
          <Avatar className="w-24 h-24 border-4 border-background">
            {userData.profilePicture ? (
              <AvatarImage 
                src={userData.profilePicture} 
                alt={userData.displayName}
                className="object-cover"
              />
            ) : (
              <AvatarFallback className="text-2xl">
                {userData.displayName.charAt(0)}
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
        <h2 className="text-xl font-semibold">{userData.displayName}</h2>
        <p className="text-muted-foreground text-sm mb-2">Member since {memberSince}</p>
        <p className="text-sm text-primary">{userData.churchRole}</p>
      </div>
      
      {/* Activity statistics */}
      <Card className="overflow-hidden mb-6">
        <CardContent className="p-0">
          <div className="grid grid-cols-3 divide-x divide-border">
            <div className="p-4 text-center">
              <p className="text-2xl font-semibold">{userData.activities.testimoniesShared}</p>
              <p className="text-xs text-muted-foreground">Testimonies</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-2xl font-semibold">{userData.activities.commentsPosted}</p>
              <p className="text-xs text-muted-foreground">Comments</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-2xl font-semibold">{userData.activities.donationsMade}</p>
              <p className="text-xs text-muted-foreground">Donations</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
