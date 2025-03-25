import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TestimonyCreation } from "@/components/community/testimony-creation";
import { TestimoniesFeed } from "@/components/community/testimonies-feed";

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("testimonies");

  return (
    <div className="px-4 py-4">
      {/* Community Navigation */}
      <Card className="mb-6 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-transparent">
            <TabsTrigger 
              value="testimonies" 
              className="py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary"
            >
              Testimonies
            </TabsTrigger>
            <TabsTrigger 
              value="qa" 
              className="py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary"
            >
              Q&A
            </TabsTrigger>
            <TabsTrigger 
              value="prayer" 
              className="py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary"
            >
              Prayer
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </Card>

      <TabsContent value="testimonies" className="mt-0 p-0">
        {/* Testimony Creation Component */}
        <TestimonyCreation />
        
        {/* Testimonies Feed Component */}
        <TestimoniesFeed />
      </TabsContent>
      
      <TabsContent value="qa" className="mt-0 p-0">
        <Card className="p-6 text-center">
          <h3 className="text-lg font-medium mb-2">Anonymous Q&A</h3>
          <p className="text-muted-foreground mb-4">
            Ask questions about faith and get answers from church leaders.
            This feature is coming soon.
          </p>
        </Card>
      </TabsContent>
      
      <TabsContent value="prayer" className="mt-0 p-0">
        <Card className="p-6 text-center">
          <h3 className="text-lg font-medium mb-2">Prayer Requests</h3>
          <p className="text-muted-foreground mb-4">
            Share your prayer requests with the community.
            This feature is coming soon.
          </p>
        </Card>
      </TabsContent>
    </div>
  );
}
