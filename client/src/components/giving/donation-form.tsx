import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { initiatePayment } from "@/lib/m-pesa";
import { Smartphone, CheckCircle } from "lucide-react";
import { Loader2 } from "lucide-react";

const DONATION_AMOUNTS = [50, 100, 500, 1000];

export function DonationForm() {
  const { toast } = useToast();
  const [amount, setAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [purpose, setPurpose] = useState("General Tithe");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPhoneInput, setShowPhoneInput] = useState(false);

  const donationMutation = useMutation({
    mutationFn: async (data: { amount: number; purpose: string }) => {
      // First simulate M-Pesa payment
      const mpesaResponse = await initiatePayment(phoneNumber, data.amount, data.purpose);
      
      if (!mpesaResponse.success) {
        throw new Error(mpesaResponse.message);
      }
      
      // Then record the donation in our system
      const response = await apiRequest("POST", "/api/donations", {
        ...data,
        transactionId: mpesaResponse.transactionId,
        status: "completed"
      });
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/donations"] });
      toast({
        title: "Donation successful",
        description: `Thank you for your donation of ${amount} KES!`,
      });
      
      // Reset form
      setAmount(50);
      setCustomAmount("");
      setPurpose("General Tithe");
      setPhoneNumber("");
      setShowPhoneInput(false);
    },
    onError: (error) => {
      toast({
        title: "Donation failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleDonate = () => {
    if (!phoneNumber && showPhoneInput) {
      toast({
        title: "Phone number required",
        description: "Please enter your M-Pesa phone number to proceed with the donation.",
        variant: "destructive",
      });
      return;
    }
    
    const finalAmount = customAmount ? parseInt(customAmount) : amount;
    
    if (finalAmount <= 0 || isNaN(finalAmount)) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid donation amount.",
        variant: "destructive",
      });
      return;
    }
    
    if (!showPhoneInput) {
      setShowPhoneInput(true);
      return;
    }
    
    donationMutation.mutate({
      amount: finalAmount,
      purpose
    });
  };

  const getButtonText = () => {
    if (donationMutation.isPending) return "Processing...";
    if (showPhoneInput) return `Donate ${customAmount || amount} KES`;
    return "Continue";
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <h3 className="font-medium mb-4">Choose Amount</h3>
        
        {showPhoneInput ? (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">M-Pesa Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="e.g. 07XX XXX XXX"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Enter the phone number to be charged
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {DONATION_AMOUNTS.map((amt) => (
                <Button
                  key={amt}
                  variant={amount === amt && !customAmount ? "default" : "outline"}
                  onClick={() => {
                    setAmount(amt);
                    setCustomAmount("");
                  }}
                >
                  {amt} KES
                </Button>
              ))}
              
              {!customAmount ? (
                <Button
                  variant="outline"
                  onClick={() => setCustomAmount("100")}
                  className="col-span-2"
                >
                  Custom Amount
                </Button>
              ) : (
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Custom Amount (KES)</label>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    min="1"
                  />
                </div>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Purpose</label>
              <Select value={purpose} onValueChange={setPurpose}>
                <SelectTrigger>
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General Tithe">General Tithe</SelectItem>
                  <SelectItem value="Building Fund">Building Fund</SelectItem>
                  <SelectItem value="Missions">Missions</SelectItem>
                  <SelectItem value="Youth Ministry">Youth Ministry</SelectItem>
                  <SelectItem value="Community Outreach">Community Outreach</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">Payment Method</label>
              <div className="bg-muted rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white mr-3">
                    <Smartphone className="h-4 w-4" />
                  </div>
                  <span>M-Pesa</span>
                </div>
                <CheckCircle className="text-xl text-primary" />
              </div>
            </div>
          </>
        )}
        
        <Button 
          className="w-full"
          onClick={handleDonate}
          disabled={donationMutation.isPending}
        >
          {donationMutation.isPending && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {getButtonText()}
        </Button>
      </CardContent>
    </Card>
  );
}
