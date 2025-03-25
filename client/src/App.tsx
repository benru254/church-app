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

function App() {
  const [location] = useLocation();
  
  // Don't render the layout on the auth page
  if (location === "/auth") {
    return (
      <>
        <Router />
        <Toaster />
      </>
    );
  }
  
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
