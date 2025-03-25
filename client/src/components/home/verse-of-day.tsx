import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Share } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Verse {
  text: string;
  reference: string;
}

export function VerseOfDay() {
  const [verse, setVerse] = useState<Verse>({
    text: "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.",
    reference: "Jeremiah 29:11"
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Verse of the Day',
        text: `${verse.text} - ${verse.reference}`,
      }).catch(err => {
        console.error('Could not share verse:', err);
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(`${verse.text} - ${verse.reference}`);
      // Could show a toast here
    }
  };

  return (
    <Card className={`mb-6 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-sm font-medium text-muted-foreground">VERSE OF THE DAY</h3>
          <Button variant="ghost" size="icon" onClick={handleShare}>
            <Share className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
        <p className="font-serif text-lg font-medium leading-relaxed mb-2">
          {verse.text}
        </p>
        <p className="text-primary font-semibold text-sm">{verse.reference}</p>
      </CardContent>
    </Card>
  );
}
