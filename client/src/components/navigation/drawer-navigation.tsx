import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  Menu, X, Home, Video, Users, Heart, User, 
  Settings, HelpCircle, Shield, Info, Sun, Moon, 
  LifeBuoy, ChevronRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerClose, 
  DrawerTrigger
} from "@/components/ui/drawer";
import { Toggle } from "@/components/ui/toggle";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

const mainNavItems: NavItem[] = [
  { label: "Home", icon: <Home className="h-5 w-5" />, path: "/" },
  { label: "Live & Videos", icon: <Video className="h-5 w-5" />, path: "/live" },
  { label: "Community", icon: <Users className="h-5 w-5" />, path: "/community" },
  { label: "Giving", icon: <Heart className="h-5 w-5" />, path: "/giving" },
  { label: "Profile", icon: <User className="h-5 w-5" />, path: "/profile" },
];

const additionalNavItems: NavItem[] = [
  { label: "Settings", icon: <Settings className="h-5 w-5" />, path: "/settings" },
  { label: "FAQ & Help", icon: <HelpCircle className="h-5 w-5" />, path: "/help" },
  { label: "Admin Panel", icon: <Shield className="h-5 w-5" />, path: "/admin" },
  { label: "About the Church", icon: <Info className="h-5 w-5" />, path: "/about" },
];

export function DrawerNavigation() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [location] = useLocation();
  
  // Sample user data for UI development (to be replaced with real auth later)
  const mockUser = {
    displayName: "John Doe",
    profilePicture: ""
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const handleLogout = () => {
    // Will be implemented with authentication later
    setOpen(false);
    window.location.href = "/auth";
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="mr-2">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-[280px] h-full">
        <DrawerHeader className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar>
              {mockUser.profilePicture ? (
                <AvatarImage src={mockUser.profilePicture} alt={mockUser.displayName} />
              ) : (
                <AvatarFallback>{mockUser.displayName.charAt(0) || "U"}</AvatarFallback>
              )}
            </Avatar>
            <div>
              <DrawerTitle className="text-base">{mockUser.displayName}</DrawerTitle>
              <p className="text-xs text-muted-foreground">View Profile</p>
            </div>
          </div>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <div className="px-4 py-2">
          <p className="text-xs font-medium text-muted-foreground mb-2">MAIN MENU</p>
          <nav className="space-y-1">
            {mainNavItems.map((item) => (
              <Link 
                key={item.path} 
                href={item.path}
                onClick={() => setOpen(false)}
              >
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${location === item.path ? 'text-primary' : ''}`}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Button>
              </Link>
            ))}
          </nav>

          <p className="text-xs font-medium text-muted-foreground mt-6 mb-2">ADDITIONAL</p>
          <nav className="space-y-1">
            {additionalNavItems.map((item) => (
              <Link 
                key={item.path} 
                href={item.path}
                onClick={() => setOpen(false)}
              >
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-muted-foreground"
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Button>
              </Link>
            ))}
          </nav>
        </div>

        <Separator className="my-4" />

        <div className="px-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              <span>Dark Mode</span>
            </div>
            <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
          </div>

          <div className="flex items-center justify-between">
            <span>Text Size</span>
            <div className="flex gap-2">
              <Toggle size="sm" aria-label="Decrease text size">A-</Toggle>
              <Toggle size="sm" aria-label="Increase text size">A+</Toggle>
            </div>
          </div>

          <Button 
            variant="destructive" 
            className="w-full mt-4"
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
