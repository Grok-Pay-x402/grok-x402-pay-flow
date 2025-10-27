import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
export const Demo = ({
  isWalletConnected
}: {
  isWalletConnected: boolean;
}) => {
  const [prompt, setPrompt] = useState("");
  const [useCase, setUseCase] = useState("chat");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const costs = {
    chat: "0.01",
    image: "0.05",
    agent: "0.03"
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isWalletConnected) {
      toast.error("Please connect wallet first");
      return;
    }
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }
    setIsLoading(true);
    setResult(null);
    setImageUrl(null);
    setTxHash(null);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockTxHash = `0x${Math.random().toString(16).substr(2, 64)}`;
      setTxHash(mockTxHash);
      toast.success(`Payment verified: ${costs[useCase as keyof typeof costs]} USDC`);
      
      // Call actual AI functions
      if (useCase === "chat") {
        const { data, error } = await supabase.functions.invoke('grok-chat', {
          body: { 
            messages: [
              { role: 'user', content: prompt }
            ]
          }
        });
        
        if (error) throw error;
        const aiResponse = data.choices?.[0]?.message?.content || "No response";
        setResult(aiResponse);
        toast.success("Chat completed");
      } else if (useCase === "image") {
        const { data, error } = await supabase.functions.invoke('generate-image', {
          body: { prompt }
        });
        
        if (error) throw error;
        
        // Extract image URL from response
        const imageContent = data.choices?.[0]?.message?.content;
        if (imageContent) {
          // Parse the image URL from markdown format or direct URL
          const urlMatch = imageContent.match(/https?:\/\/[^\s\)]+/);
          if (urlMatch) {
            setImageUrl(urlMatch[0]);
            setResult("Image generated successfully");
          } else {
            setResult("Image generated but URL not found in response");
          }
        }
        toast.success("Image generated");
      } else {
        setResult("Agent deployment coming soon - will automatically pay for API calls and analyze market data 24/7");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Error - payment will be refunded");
    } finally {
      setIsLoading(false);
    }
  };
  return <section className="py-20 px-4 border-t border-border" id="demo">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-mono font-bold uppercase mb-4">
            LIVE_DEMO
          </h2>
          <p className="text-sm font-mono text-muted-foreground">
            &gt; test_x402_payment_flow
          </p>
        </div>

        <div className="border border-border p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-mono uppercase mb-2 text-muted-foreground">
                SELECT_USE_CASE:
              </label>
              <Select value={useCase} onValueChange={setUseCase}>
                <SelectTrigger className="font-mono bg-secondary border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chat">AI_CHAT - {costs.chat} USDC</SelectItem>
                  <SelectItem value="image">IMAGE_GEN - {costs.image} USDC</SelectItem>
                  <SelectItem value="agent">AI_AGENT - {costs.agent} USDC</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase mb-2 text-muted-foreground">
                YOUR_PROMPT:
              </label>
              <Textarea placeholder={useCase === "chat" ? "explain_defi_in_simple_terms" : useCase === "image" ? "cyberpunk_city_at_sunset" : "monitor_eth_price_alert_on_5%_change"} value={prompt} onChange={e => setPrompt(e.target.value)} className="min-h-32 font-mono bg-secondary border-border resize-none" disabled={isLoading} />
            </div>

            <div className="flex justify-between items-center p-4 bg-secondary border border-border">
              <span className="text-xs font-mono text-muted-foreground">COST:</span>
              <span className="text-sm font-mono font-bold">{costs[useCase as keyof typeof costs]} USDC</span>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isLoading || !isWalletConnected}>
              {!isWalletConnected ? "[CONNECT_WALLET_FIRST]" : isLoading ? <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  [PROCESSING...]
                </> : "[PAY_AND_GENERATE]"}
            </Button>
          </form>

          {txHash && <div className="mt-6 p-4 border border-border bg-secondary">
              <div className="text-xs font-mono mb-2">
                &gt; payment_verified
              </div>
              <a href={`https://testnet.bscscan.com/tx/${txHash}`} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors">
                view_on_bscscan: {txHash.slice(0, 16)}...
              </a>
            </div>}

          {result && <div className="mt-6 p-6 border border-border bg-secondary">
              <div className="text-xs font-mono text-muted-foreground mb-4">
                &gt; result:
              </div>
              {imageUrl ? (
                <div className="mb-6">
                  <img 
                    src={imageUrl} 
                    alt="Generated image" 
                    className="w-full rounded border border-border"
                  />
                  <p className="text-sm font-mono mt-2">{result}</p>
                </div>
              ) : (
                <p className="text-sm font-mono mb-6">{result}</p>
              )}
              
              <Button variant="outline" className="w-full" onClick={() => {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent("Just tested GrokPay x402. Pay 0.01 USDC for AI with zero subscriptions. #x402 #GrokPay #Web3AI")}`, '_blank');
          }}>
                [SHARE_ON_X]
              </Button>
            </div>}

          {!isWalletConnected && <div className="mt-6 p-4 border border-border text-center">
              <p className="text-xs font-mono text-muted-foreground">
                &gt; connect_bnb_wallet_to_test_on_testnet
              </p>
            </div>}
        </div>

        <div className="mt-12 text-center">
          
        </div>
      </div>
    </section>;
};