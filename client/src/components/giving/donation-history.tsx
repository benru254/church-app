import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Donation } from "@shared/schema";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

export function DonationHistory() {
  const { data: donations, isLoading, error } = useQuery<Donation[]>({
    queryKey: ["/api/donations"],
  });

  if (isLoading) {
    return (
      <Card className="mb-6">
        <CardContent className="p-4">
          <h3 className="font-medium mb-4">Your Donation History</h3>
          
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between py-2 border-b">
                <div>
                  <Skeleton className="h-5 w-20 mb-1" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mb-6">
        <CardContent className="p-4">
          <h3 className="font-medium mb-4">Your Donation History</h3>
          <p className="text-muted-foreground text-center">Failed to load donation history. Please try again later.</p>
        </CardContent>
      </Card>
    );
  }

  if (!donations || donations.length === 0) {
    return (
      <Card className="mb-6">
        <CardContent className="p-4">
          <h3 className="font-medium mb-4">Your Donation History</h3>
          <p className="text-muted-foreground text-center">You haven't made any donations yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <h3 className="font-medium mb-4">Your Donation History</h3>
        
        <div className="space-y-3">
          {donations.map((donation) => (
            <div key={donation.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div>
                <p className="font-medium">{donation.amount} KES</p>
                <p className="text-xs text-muted-foreground">
                  {donation.purpose} • {format(new Date(donation.createdAt), 'MMM d, yyyy')}
                </p>
              </div>
              <Badge variant="outline" className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800">
                {donation.status === "completed" ? "Completed" : donation.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
