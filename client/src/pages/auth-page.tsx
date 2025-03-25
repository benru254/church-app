import { useState } from "react";
import { useLocation } from "wouter";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertUserSchema } from "@shared/schema";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Extend the insert schema for login
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

// Extend the insert schema for registration to include password confirmation
const registerSchema = insertUserSchema.extend({
  confirmPassword: z.string().min(1, "Password confirmation is required"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      displayName: "",
      password: "",
      confirmPassword: "",
      profilePicture: "",
    },
  });

  const onLoginSubmit = (data: LoginFormValues) => {
    setIsSubmitting(true);
    // Simulate login process
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Login successful",
        description: "Welcome back to Grace Fellowship!",
      });
      setLocation("/");
    }, 1500);
  };

  const onRegisterSubmit = (data: RegisterFormValues) => {
    setIsSubmitting(true);
    // Simulate registration process
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Registration successful",
        description: "Your account has been created. Welcome to Grace Fellowship!",
      });
      setLocation("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50 dark:bg-gray-900">
      {/* Auth Form Section */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Grace Fellowship</CardTitle>
            <CardDescription className="text-center">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "register")}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              {/* Login Form */}
              <TabsContent value="login">
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-username">Username</Label>
                      <Input
                        id="login-username"
                        placeholder="Enter your username"
                        {...loginForm.register("username")}
                      />
                      {loginForm.formState.errors.username && (
                        <p className="text-sm text-red-500">{loginForm.formState.errors.username.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="Enter your password"
                        {...loginForm.register("password")}
                      />
                      {loginForm.formState.errors.password && (
                        <p className="text-sm text-red-500">{loginForm.formState.errors.password.message}</p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting && activeTab === "login" ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              {/* Register Form */}
              <TabsContent value="register">
                <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-username">Username</Label>
                      <Input
                        id="register-username"
                        placeholder="Choose a username"
                        {...registerForm.register("username")}
                      />
                      {registerForm.formState.errors.username && (
                        <p className="text-sm text-red-500">{registerForm.formState.errors.username.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="Enter your email"
                        {...registerForm.register("email")}
                      />
                      {registerForm.formState.errors.email && (
                        <p className="text-sm text-red-500">{registerForm.formState.errors.email.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-display-name">Display Name</Label>
                      <Input
                        id="register-display-name"
                        placeholder="Enter your display name"
                        {...registerForm.register("displayName")}
                      />
                      {registerForm.formState.errors.displayName && (
                        <p className="text-sm text-red-500">{registerForm.formState.errors.displayName.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="Choose a password"
                        {...registerForm.register("password")}
                      />
                      {registerForm.formState.errors.password && (
                        <p className="text-sm text-red-500">{registerForm.formState.errors.password.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-confirm-password">Confirm Password</Label>
                      <Input
                        id="register-confirm-password"
                        type="password"
                        placeholder="Confirm your password"
                        {...registerForm.register("confirmPassword")}
                      />
                      {registerForm.formState.errors.confirmPassword && (
                        <p className="text-sm text-red-500">{registerForm.formState.errors.confirmPassword.message}</p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting && activeTab === "register" ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-center text-muted-foreground">
              {activeTab === "login" ? (
                <p>
                  Don't have an account?{" "}
                  <a
                    href="#"
                    className="text-primary underline"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("register");
                    }}
                  >
                    Register
                  </a>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <a
                    href="#"
                    className="text-primary underline"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("login");
                    }}
                  >
                    Login
                  </a>
                </p>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Hero Section */}
      <div className="flex-1 bg-primary-600 relative hidden lg:block">
        <div className="absolute inset-0 bg-black/40"></div>
        <img
          src="https://images.unsplash.com/photo-1438032005730-c779502df39b?w=800&h=1200&auto=format&fit=crop&q=80"
          alt="Church community"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12">
          <h1 className="text-4xl font-bold mb-4 text-center">Welcome to Grace Fellowship</h1>
          <p className="text-xl mb-8 text-center max-w-md">
            Join our spiritual community for daily devotionals, live streams, and meaningful connections.
          </p>
          <div className="flex gap-4">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg text-center">
              <p className="text-lg font-bold">Daily Devotionals</p>
              <p className="text-sm">Start your day with God's word</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg text-center">
              <p className="text-lg font-bold">Live Services</p>
              <p className="text-sm">Worship with us from anywhere</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
