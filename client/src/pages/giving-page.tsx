import { DonationForm } from "@/components/giving/donation-form";
import { DonationHistory } from "@/components/giving/donation-history";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Heart, Users } from "lucide-react";

export default function GivingPage() {
  return (
    <div className="px-4 py-4">
      {/* Donation Header */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">Support Our Ministry</h2>
        <p className="text-muted-foreground text-sm">
          Your generous donations help us spread God's word and support our community programs.
        </p>
      </div>
      
      {/* Donation Form Component */}
      <DonationForm />
      
      {/* Donation History Component */}
      <DonationHistory />
      
      {/* Ministry Impact Section */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <h3 className="font-medium mb-4">Your Impact</h3>
          
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm">Building Fund Progress</p>
              <p className="text-sm font-medium">75%</p>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: "75%" }}></div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-primary-50 dark:bg-primary-900/30 text-primary rounded-full flex items-center justify-center">
                <Heart className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">5 Families Supported</p>
                <p className="text-xs text-muted-foreground">Through our community outreach program</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/30 text-amber-500 rounded-full flex items-center justify-center">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">50 Bibles Distributed</p>
                <p className="text-xs text-muted-foreground">To new believers through your donations</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Youth Camp Funded</p>
                <p className="text-xs text-muted-foreground">20 young people attended thanks to your support</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
