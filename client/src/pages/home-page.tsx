import { VerseOfDay } from "@/components/home/verse-of-day";
import { DailyDevotional } from "@/components/home/daily-devotional";
import { TestimoniesList } from "@/components/home/testimonies-list";
import { VideoList } from "@/components/home/video-list";
import { UpcomingEvents } from "@/components/home/upcoming-events";
import { useQuery } from "@tanstack/react-query";
import { checkLiveStreamStatus } from "@/lib/youtube";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Link } from "wouter";

export default function HomePage() {
  const { data: liveStatus } = useQuery({
    queryKey: ['/api/live-status'],
    queryFn: () => checkLiveStreamStatus('church_channel_id'),
  });

  return (
    <div className="px-4 py-4">
      {/* Hero Section with Live Banner */}
      <div className="mb-6 overflow-hidden rounded-xl shadow-sm relative">
        <img 
          src="https://images.unsplash.com/photo-1438032005730-c779502df39b?w=800&h=400&auto=format&fit=crop&q=80" 
          alt="Church Service" 
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
          {liveStatus?.isLive && (
            <div className="flex items-center mb-2">
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center animate-pulse">
                <span className="w-2 h-2 rounded-full bg-white inline-block mr-1"></span> LIVE NOW
              </span>
            </div>
          )}
          <h2 className="text-white font-semibold text-lg">Sunday Service: The Power of Faith</h2>
          <p className="text-white/90 text-sm">Join Pastor James for our morning worship</p>
          <Link href="/live">
            <Button className="mt-3 gap-2">
              <Play className="h-4 w-4" /> {liveStatus?.isLive ? 'Watch Now' : 'Past Sermons'}
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Verse of the Day */}
      <VerseOfDay />
      
      {/* Daily Devotional */}
      <DailyDevotional />
      
      {/* Recent Testimonies */}
      <TestimoniesList />
      
      {/* Short Videos & Highlights */}
      <VideoList />
      
      {/* Upcoming Events */}
      <UpcomingEvents />
    </div>
  );
}
