import { createContext, ReactNode, useContext, useState } from "react";
import { SavedContent } from "@shared/schema";

// Define the demo user profile
export type DemoUser = {
  id: number;
  username: string;
  displayName: string;
  email: string;
  profilePicture: string;
  joinDate: Date;
  churchRole: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
  savedContents: SavedContent[];
  // Activity tracking
  activities: {
    attendedServices: number;
    testimoniesShared: number;
    donationsMade: number;
    prayerRequestsSubmitted: number;
    commentsPosted: number;
  };
  // Preferences
  preferences: {
    notificationsEnabled: boolean;
    emailUpdates: boolean;
    darkMode: boolean;
  };
};

// Mock saved content
const mockSavedContents: SavedContent[] = [
  {
    id: 1,
    userId: 1,
    contentType: "sermon",
    contentId: "video1",
    title: "Finding Peace in Difficult Times",
    thumbnail: "https://images.unsplash.com/photo-1600093112291-7b553e3fcb82?w=500&h=350&auto=format&fit=crop&q=80",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
  },
  {
    id: 2,
    userId: 1,
    contentType: "sermon",
    contentId: "video2",
    title: "The Power of Community",
    thumbnail: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500&h=350&auto=format&fit=crop&q=80",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
  },
  {
    id: 3,
    userId: 1,
    contentType: "devotional",
    contentId: "dev1",
    title: "Morning Reflection: Psalm 23",
    thumbnail: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=500&h=350&auto=format&fit=crop&q=80",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36), // 36 hours ago
  }
];

// Create our demo user
const defaultUser: DemoUser = {
  id: 1,
  username: "grace_member",
  displayName: "Alex Morgan",
  email: "alex.morgan@example.com",
  profilePicture: "https://randomuser.me/api/portraits/women/56.jpg",
  joinDate: new Date(2023, 5, 15), // June 15, 2023
  churchRole: "Youth Ministry Volunteer",
  socialLinks: {
    facebook: "facebook.com/alexmorgan",
    instagram: "instagram.com/alexmorgan"
  },
  savedContents: mockSavedContents,
  activities: {
    attendedServices: 24,
    testimoniesShared: 3,
    donationsMade: 5,
    prayerRequestsSubmitted: 2,
    commentsPosted: 12
  },
  preferences: {
    notificationsEnabled: true,
    emailUpdates: true,
    darkMode: false
  }
};

type UserContextType = {
  user: DemoUser;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  toggleSaveContent: (content: Omit<SavedContent, "id" | "userId" | "createdAt">) => void;
  updatePreference: (key: keyof DemoUser['preferences'], value: boolean) => void;
  incrementActivity: (activity: keyof DemoUser['activities']) => void;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser>(defaultUser);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Default to logged in for the demo

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const toggleSaveContent = (content: Omit<SavedContent, "id" | "userId" | "createdAt">) => {
    setUser(prevUser => {
      const isSaved = prevUser.savedContents.some(item => 
        item.contentType === content.contentType && item.contentId === content.contentId
      );

      if (isSaved) {
        // If content is already saved, remove it
        return {
          ...prevUser,
          savedContents: prevUser.savedContents.filter(item => 
            !(item.contentType === content.contentType && item.contentId === content.contentId)
          )
        };
      } else {
        // If content is not saved, add it
        const newContent: SavedContent = {
          id: prevUser.savedContents.length + 1,
          userId: prevUser.id,
          createdAt: new Date(),
          ...content
        };
        
        return {
          ...prevUser,
          savedContents: [...prevUser.savedContents, newContent]
        };
      }
    });
  };

  const updatePreference = (key: keyof DemoUser['preferences'], value: boolean) => {
    setUser(prevUser => ({
      ...prevUser,
      preferences: {
        ...prevUser.preferences,
        [key]: value
      }
    }));
  };

  const incrementActivity = (activity: keyof DemoUser['activities']) => {
    setUser(prevUser => ({
      ...prevUser,
      activities: {
        ...prevUser.activities,
        [activity]: prevUser.activities[activity] + 1
      }
    }));
  };

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        isLoggedIn, 
        login, 
        logout, 
        toggleSaveContent, 
        updatePreference,
        incrementActivity
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}