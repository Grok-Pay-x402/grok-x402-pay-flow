import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export const GrokChat = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!message.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResponse("");

    try {
      const grokResponse = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/grok-chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [
              { role: "user", content: message }
            ],
          }),
        }
      );

      if (!grokResponse.ok) {
        const errorData = await grokResponse.json();
        throw new Error(errorData.error || "Failed to get response from Grok");
      }

      const data = await grokResponse.json();
      const grokMessage = data.choices?.[0]?.message?.content || "No response";
      setResponse(grokMessage);

      toast({
        title: "Success",
        description: "Grok responded successfully",
      });
    } catch (error) {
      console.error("Error calling Grok:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to connect to Grok",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Chat with Grok AI
          </CardTitle>
          <CardDescription className="text-center">
            Powered by xAI's Grok via OpenRouter
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Your Message
            </label>
            <Textarea
              id="message"
              placeholder="Ask Grok anything..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[120px]"
              disabled={isLoading}
            />
          </div>

          <Button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Thinking...
              </>
            ) : (
              "Send to Grok"
            )}
          </Button>

          {response && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Grok's Response</label>
              <div className="p-4 bg-muted rounded-lg border">
                <p className="whitespace-pre-wrap">{response}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
