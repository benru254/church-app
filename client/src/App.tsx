/**
 * Main application component that handles routing between different pages
 * 
 * The app uses wouter for routing and consists of the following main sections:
 * - Authentication page (no layout)
 * - Home page (dashboard)
 * - Live streaming page
 * - Community page (for testimonies, Q&A, prayer requests)
 * - Giving page (for donations)
 * - Profile page (user settings and saved content)
 */
import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import LivePage from "@/pages/live-page";
import CommunityPage from "@/pages/community-page";
import GivingPage from "@/pages/giving-page";
import ProfilePage from "@/pages/profile-page";
import MainLayout from "./layouts/main-layout";

/**
 * Router component that defines all application routes
 * Uses wouter's Switch and Route components for routing
 */
function Router() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <Route path="/" component={HomePage} />
      <Route path="/live" component={LivePage} />
      <Route path="/community" component={CommunityPage} />
      <Route path="/giving" component={GivingPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

/**
 * Main App component that conditionally renders the layout
 * - Authentication page has no layout (just the Router)
 * - All other pages use the MainLayout component
 */
function App() {
  const [location] = useLocation();
  
  // Special case: Auth page doesn't use the main layout
  if (location === "/auth") {
    return (
      <>
        <Router />
        <Toaster />
      </>
    );
  }
  
  // All other pages use the MainLayout
  return (
    <>
      <MainLayout>
        <Router />
      </MainLayout>
      <Toaster />
    </>
  );
}

export default App;
