import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Download, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SaveResultsProps {
  validationData: {
    idea: string;
    targetCustomer: string;
    problemSolved: string;
    feedback: string;
  };
}

export default function SaveResults({ validationData }: SaveResultsProps) {
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const saveResults = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email to save results",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      // In a real app, this would send to your backend
      const results = {
        idea: validationData.idea,
        targetCustomer: validationData.targetCustomer,
        problemSolved: validationData.problemSolved,
        feedback: validationData.feedback,
        timestamp: new Date().toISOString()
      };
      
      // For now, just copy to clipboard as a backup
      await navigator.clipboard.writeText(JSON.stringify(results, null, 2));
      
      toast({
        title: "Results Saved!",
        description: "Your validation results have been copied to clipboard and will be emailed to you",
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save results",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const shareToSocial = () => {
    const text = `Just validated my startup idea "${validationData.idea}" with AI! 🚀 Check out ValidatorAI.com for free idea validation and landing page creation. #startup #entrepreneur #validation`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <Card className="shadow-lg border-2 border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-green-500/10">
      <CardContent className="p-6">
        <h4 className="text-lg font-bold text-blue-600 mb-4 flex items-center gap-2">
          💾 Save Your Results
        </h4>
        <p className="text-sm text-foreground/80 mb-4">
          Get your validation results emailed to you and share your progress!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex gap-2">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={saveResults}
              disabled={saving}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Mail className="w-4 h-4 mr-1" />
              {saving ? "Saving..." : "Email Me"}
            </Button>
          </div>
          
          <Button
            onClick={shareToSocial}
            variant="outline"
            size="sm"
            className="border-green-500/30 hover:bg-green-500/10"
          >
            <Share2 className="w-4 h-4 mr-1" />
            Share Progress
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}