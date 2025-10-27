import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2, MessageSquare, Image as ImageIcon } from "lucide-react";

export const GrokChat = () => {
  const [chatMessage, setChatMessage] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }

    setIsChatLoading(true);
    setChatResponse("");

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
              { role: "user", content: chatMessage }
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
      setChatResponse(grokMessage);

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
      setIsChatLoading(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter an image prompt",
        variant: "destructive",
      });
      return;
    }

    setIsImageLoading(true);
    setGeneratedImage("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/grok-image`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: imagePrompt,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate image");
      }

      const data = await response.json();
      
      // Handle different response formats
      if (data.image) {
        setGeneratedImage(data.image);
      } else if (data.raw?.choices?.[0]?.message?.content) {
        setGeneratedImage(data.raw.choices[0].message.content);
      } else {
        throw new Error("No image data in response");
      }

      toast({
        title: "Success",
        description: "Image generated successfully",
      });
    } catch (error) {
      console.error("Error generating image:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate image",
        variant: "destructive",
      });
    } finally {
      setIsImageLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Grok 4 Fast AI
          </CardTitle>
          <CardDescription className="text-center">
            Powered by xAI's Grok-4-Fast via OpenRouter
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="image" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Generate Image
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="chat-message" className="text-sm font-medium">
                  Your Message
                </label>
                <Textarea
                  id="chat-message"
                  placeholder="Ask Grok anything..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="min-h-[120px]"
                  disabled={isChatLoading}
                />
              </div>

              <Button
                onClick={handleSendMessage}
                disabled={isChatLoading}
                className="w-full"
                size="lg"
              >
                {isChatLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Thinking...
                  </>
                ) : (
                  "Send to Grok"
                )}
              </Button>

              {chatResponse && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Grok's Response</label>
                  <div className="p-4 bg-muted rounded-lg border">
                    <p className="whitespace-pre-wrap">{chatResponse}</p>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="image" className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="image-prompt" className="text-sm font-medium">
                  Image Description
                </label>
                <Textarea
                  id="image-prompt"
                  placeholder="Describe the image you want to generate..."
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  className="min-h-[120px]"
                  disabled={isImageLoading}
                />
              </div>

              <Button
                onClick={handleGenerateImage}
                disabled={isImageLoading}
                className="w-full"
                size="lg"
              >
                {isImageLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Generate Image
                  </>
                )}
              </Button>

              {generatedImage && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Generated Result</label>
                  <div className="p-4 bg-muted rounded-lg border">
                    {generatedImage.startsWith('http') || generatedImage.startsWith('data:') ? (
                      <img 
                        src={generatedImage} 
                        alt="Generated by Grok" 
                        className="w-full rounded-lg"
                      />
                    ) : (
                      <p className="whitespace-pre-wrap text-sm">{generatedImage}</p>
                    )}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
