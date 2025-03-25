import { ProfileHeader } from "@/components/profile/profile-header";
import { SavedContents } from "@/components/profile/saved-content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, Settings, Bell, Lock, HelpCircle, LogOut } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  const { logoutMutation } = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="px-4 py-4">
      {/* Profile Header Component */}
      <ProfileHeader />
      
      {/* Saved Content Component */}
      <SavedContents />
      
      {/* Account Settings */}
      <Card className="mb-6">
        <CardHeader className="px-4 py-3 border-b">
          <CardTitle className="text-base font-medium">Account Settings</CardTitle>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            <Button variant="ghost" className="w-full justify-start rounded-none py-4 px-4 h-auto">
              <Settings className="text-muted-foreground mr-3 h-5 w-5" />
              <span>Edit Profile</span>
              <svg 
                className="ml-auto h-5 w-5 text-muted-foreground" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </Button>
            
            <Button variant="ghost" className="w-full justify-start rounded-none py-4 px-4 h-auto">
              <Bell className="text-muted-foreground mr-3 h-5 w-5" />
              <span>Notification Settings</span>
              <svg 
                className="ml-auto h-5 w-5 text-muted-foreground" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </Button>
            
            <Button variant="ghost" className="w-full justify-start rounded-none py-4 px-4 h-auto">
              <Lock className="text-muted-foreground mr-3 h-5 w-5" />
              <span>Privacy & Security</span>
              <svg 
                className="ml-auto h-5 w-5 text-muted-foreground" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </Button>
            
            <Button variant="ghost" className="w-full justify-start rounded-none py-4 px-4 h-auto">
              <HelpCircle className="text-muted-foreground mr-3 h-5 w-5" />
              <span>Help & Support</span>
              <svg 
                className="ml-auto h-5 w-5 text-muted-foreground" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start rounded-none py-4 px-4 h-auto text-red-500"
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
            >
              {logoutMutation.isPending ? (
                <Loader2 className="mr-3 h-5 w-5 animate-spin" />
              ) : (
                <LogOut className="mr-3 h-5 w-5" />
              )}
              <span>{logoutMutation.isPending ? "Logging out..." : "Log Out"}</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center text-xs text-muted-foreground mb-8">
        <p>Grace Fellowship Church App</p>
        <p>Version 1.0.0</p>
      </div>
    </div>
  );
}
