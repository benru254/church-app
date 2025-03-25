import { LiveStreamPlayer } from "@/components/live/live-stream-player";
import { SermonLibrary } from "@/components/live/sermon-library";
import { Card, CardContent } from "@/components/ui/card";

export default function LivePage() {
  // Bible verses that are pinned for the current live stream or service
  const pinnedVerses = [
    {
      id: 1,
      text: "Now faith is confidence in what we hope for and assurance about what we do not see.",
      reference: "Hebrews 11:1",
    },
    {
      id: 2,
      text: "For we live by faith, not by sight.",
      reference: "2 Corinthians 5:7",
    },
  ];

  return (
    <div className="px-4 py-4">
      {/* Live Stream Player Component */}
      <LiveStreamPlayer />
      
      {/* Pinned Bible Verses */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">PINNED VERSES</h3>
          <div className="space-y-3">
            {pinnedVerses.map((verse) => (
              <div key={verse.id} className="flex gap-3 items-start">
                <svg className="h-5 w-5 text-primary mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="17" x2="12" y2="22"></line>
                  <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"></path>
                </svg>
                <div>
                  <p className="font-serif text-sm font-medium">{verse.text}</p>
                  <p className="text-xs text-primary">{verse.reference}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Sermon Library Component */}
      <SermonLibrary />
    </div>
  );
}
