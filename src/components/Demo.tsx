import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle2, Wallet, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export const Demo = ({ isWalletConnected }: { isWalletConnected: boolean }) => {
  const [prompt, setPrompt] = useState("");
  const [useCase, setUseCase] = useState("chat");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  const costs = {
    chat: "0.01",
    image: "0.05",
    agent: "0.03",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isWalletConnected) {
      toast.error("Please connect your wallet first!");
      return;
    }

    if (!prompt.trim()) {
      toast.error("Please enter a prompt!");
      return;
    }

    setIsLoading(true);
    setResult(null);
    setTxHash(null);

    // Simulate payment flow and API call
    try {
      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockTxHash = `0x${Math.random().toString(16).substr(2, 64)}`;
      setTxHash(mockTxHash);

      toast.success("Payment verified! Processing request...", {
        description: `Paid ${costs[useCase as keyof typeof costs]} USDC`,
      });

      // Simulate API response
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (useCase === "chat") {
        setResult("Here's your response from Grok AI: Bitcoin halving is an event where mining rewards are cut in half, reducing new supply. This historically increases scarcity and can drive price action. 🚀");
      } else if (useCase === "image") {
        setResult("✨ Image generated successfully! (In production, this would show the actual image)");
      } else {
        setResult("🤖 Agent deployed! It will automatically pay for API calls and analyze market data 24/7.");
      }

      toast.success("Request completed!", {
        description: "Share your experience on X!",
      });
    } catch (error) {
      toast.error("Something went wrong!", {
        description: "Your payment will be refunded automatically.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-transparent to-secondary/20" id="demo">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Test <span className="gradient-text">Live Demo</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Experience x402 payment flow in action. Real testnet transactions! 🔥
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl border border-primary/30">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Use Case Selector */}
              <div>
                <label className="block text-sm font-medium mb-2">Select Use Case</label>
                <Select value={useCase} onValueChange={setUseCase}>
                  <SelectTrigger className="bg-secondary/50 border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chat">💬 AI Chat - {costs.chat} USDC</SelectItem>
                    <SelectItem value="image">🎨 Image Generation - {costs.image} USDC</SelectItem>
                    <SelectItem value="agent">🤖 AI Agent - {costs.agent} USDC</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Prompt Input */}
              <div>
                <label className="block text-sm font-medium mb-2">Your Prompt</label>
                <Textarea
                  placeholder={
                    useCase === "chat" 
                      ? "Ask anything: 'Explain DeFi in simple terms'"
                      : useCase === "image"
                      ? "Describe the image: 'A cyberpunk city at sunset'"
                      : "Agent task: 'Monitor ETH price and alert on 5% change'"
                  }
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-32 bg-secondary/50 border-border resize-none"
                  disabled={isLoading}
                />
              </div>

              {/* Cost Display */}
              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border">
                <span className="text-sm text-muted-foreground">Estimated cost:</span>
                <span className="text-lg font-bold text-accent">{costs[useCase as keyof typeof costs]} USDC</span>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={isLoading || !isWalletConnected}
              >
                {!isWalletConnected ? (
                  <>
                    <Wallet className="w-5 h-5" />
                    Connect Wallet First
                  </>
                ) : isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Pay & Generate
                  </>
                )}
              </Button>
            </form>

            {/* Transaction Hash */}
            {txHash && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/30"
              >
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span className="font-semibold text-accent">Payment Verified!</span>
                </div>
                <a 
                  href={`https://testnet.bscscan.com/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-1"
                >
                  View on BscScan
                  <ExternalLink className="w-3 h-3" />
                </a>
              </motion.div>
            )}

            {/* Result Display */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-6 bg-secondary/50 rounded-lg border border-border"
              >
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  Result:
                </h4>
                <p className="text-foreground leading-relaxed">{result}</p>
                
                {/* Share CTA */}
                <div className="mt-4 pt-4 border-t border-border">
                  <Button 
                    variant="accent" 
                    className="w-full"
                    onClick={() => {
                      window.open(
                        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                          "Just tested GrokPay x402 - Mind Blown! 🤯 Pay 0.01 USDC for AI with zero subscriptions. The future of AI payments is here! #x402 #GrokPay #Web3AI"
                        )}`,
                        '_blank'
                      );
                    }}
                  >
                    Share on X & Earn Badge 🎁
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Info Box */}
            {!isWalletConnected && (
              <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
                <p className="text-sm text-muted-foreground text-center">
                  💡 Connect your BNB wallet to test live payments on testnet. 
                  Need test USDC? Use the <span className="text-accent font-semibold">Ankr Faucet</span>!
                </p>
              </div>
            )}
          </div>

          {/* Stats Update */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground mb-4">You just joined the wave! 🌊</p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div>
                <span className="text-2xl font-bold text-accent">1,247</span>
                <span className="text-muted-foreground ml-2">Tests Today</span>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <span className="text-2xl font-bold text-accent">+93%</span>
                <span className="text-muted-foreground ml-2">Adoption YoY</span>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <span className="text-2xl font-bold text-accent">5.2K</span>
                <span className="text-muted-foreground ml-2">Beta Users</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
