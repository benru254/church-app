import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import LivePage from "@/pages/live-page";
import CommunityPage from "@/pages/community-page";
import GivingPage from "@/pages/giving-page";
import ProfilePage from "@/pages/profile-page";
import { ProtectedRoute } from "./lib/protected-route";
import MainLayout from "./layouts/main-layout";

function Router() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/" component={HomePage} />
      <ProtectedRoute path="/live" component={LivePage} />
      <ProtectedRoute path="/community" component={CommunityPage} />
      <ProtectedRoute path="/giving" component={GivingPage} />
      <ProtectedRoute path="/profile" component={ProfilePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <MainLayout>
      <Router />
      <Toaster />
    </MainLayout>
  );
}

export default App;
