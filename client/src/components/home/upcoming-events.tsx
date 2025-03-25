import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface Event {
  id: string;
  name: string;
  date: Date;
  time: string;
  type: 'prayer' | 'baptism' | 'conference';
  countdown?: string;
}

export function UpcomingEvents() {
  // In a real application, this would come from an API call
  const events: Event[] = [
    {
      id: '1',
      name: 'Special Prayer Night',
      date: new Date(2023, 4, 15), // May 15, 2023
      time: '7:00 PM - 9:00 PM',
      type: 'prayer'
    },
    {
      id: '2',
      name: 'Baptism Sunday',
      date: new Date(2023, 4, 22), // May 22, 2023
      time: '10:00 AM - 12:00 PM',
      type: 'baptism'
    },
    {
      id: '3',
      name: 'Annual Bible Conference',
      date: new Date(2023, 5, 5), // June 5, 2023
      time: '9:00 AM - 4:00 PM',
      type: 'conference',
      countdown: '3 weeks'
    }
  ];

  // Get bg color based on event type
  const getEventColor = (type: string) => {
    switch (type) {
      case 'prayer':
        return 'bg-primary-50 dark:bg-primary-900/30 text-primary';
      case 'baptism':
        return 'bg-amber-50 dark:bg-amber-900/30 text-amber-500';
      case 'conference':
        return 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-muted-foreground';
    }
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleString('default', { month: 'short' }).toUpperCase();
  };

  const getDay = (date: Date) => {
    return date.getDate();
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Upcoming Events</h3>
          <Button variant="link" className="text-primary">View Calendar</Button>
        </div>
        
        <div className="space-y-3">
          {events.map(event => (
            <div key={event.id} className="flex gap-3 items-center">
              <div className={`${getEventColor(event.type)} flex flex-col items-center justify-center w-12 h-12 rounded-lg`}>
                <span className="text-xs font-semibold">{formatMonth(event.date)}</span>
                <span className="text-lg font-bold">{getDay(event.date)}</span>
              </div>
              <div>
                <p className="font-medium">{event.name}</p>
                <p className="text-xs text-muted-foreground">{event.time}</p>
              </div>
              
              {event.countdown ? (
                <div className="ml-auto flex items-center text-xs text-emerald-500">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{event.countdown}</span>
                </div>
              ) : (
                <Button variant="outline" size="sm" className="ml-auto text-xs">
                  Remind Me
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
