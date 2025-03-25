import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Home, Video, Users, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomTabItem {
  path: string;
  icon: React.ReactNode;
  label: string;
}

export function BottomTabs() {
  const [location] = useLocation();
  const [activeTab, setActiveTab] = useState<string>(location);

  useEffect(() => {
    setActiveTab(location);
  }, [location]);

  const tabs: BottomTabItem[] = [
    {
      path: "/",
      icon: <Home className="h-5 w-5" />,
      label: "Home"
    },
    {
      path: "/live",
      icon: <Video className="h-5 w-5" />,
      label: "Live"
    },
    {
      path: "/community",
      icon: <Users className="h-5 w-5" />,
      label: "Community"
    },
    {
      path: "/giving",
      icon: <Heart className="h-5 w-5" />,
      label: "Giving"
    },
    {
      path: "/profile",
      icon: <User className="h-5 w-5" />,
      label: "Profile"
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-30">
      <div className="flex justify-between items-center h-16">
        {tabs.map((tab) => (
          <Link 
            key={tab.path} 
            href={tab.path} 
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-1 relative py-2",
              activeTab === tab.path ? "text-primary" : "text-muted-foreground"
            )}
          >
            {tab.icon}
            <span className="text-xs font-medium">{tab.label}</span>
            {activeTab === tab.path && (
              <div className="absolute bottom-0 h-1 w-full bg-primary rounded-t-sm" />
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}
