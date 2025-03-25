import { ReactNode } from "react";
import { useLocation } from "wouter";
import { BottomTabs } from "@/components/navigation/bottom-tabs";
import { DrawerNavigation } from "@/components/navigation/drawer-navigation";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [location] = useLocation();
  const { user } = useAuth();
  
  // Don't render the layout on the auth page
  if (location === "/auth") {
    return <>{children}</>;
  }

  return (
    <div className="bg-background text-foreground min-h-screen pb-16">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-background z-30 border-b border-border">
        <div className="px-4 h-14 flex items-center justify-between">
          <div className="flex items-center">
            <DrawerNavigation />
            <h1 className="text-lg font-semibold">Grace Fellowship</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-14 pb-16 min-h-screen">
        {children}
      </main>

      {/* Bottom Navigation */}
      <BottomTabs />
    </div>
  );
}
