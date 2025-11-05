import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits } from "viem";
import { bsc } from "wagmi/chains";
const USD1_CONTRACT = "0x8d0D000Ee44948FC98c9B98A4FA4921476f08B0d" as `0x${string}`;
const GIGGLE_FUND_WALLET = "0xc7f501d25ea088aefca8b4b3ebd936aae12bf4a4" as `0x${string}`;

// ERC20 Transfer ABI
const ERC20_ABI = [{
  name: "transfer",
  type: "function",
  stateMutability: "nonpayable",
  inputs: [{
    name: "to",
    type: "address"
  }, {
    name: "amount",
    type: "uint256"
  }],
  outputs: [{
    name: "",
    type: "bool"
  }]
}] as const;
export const Demo = ({
  isWalletConnected
}: {
  isWalletConnected: boolean;
}) => {
  const {
    address
  } = useAccount();
  const {
    writeContract,
    data: hash,
    isPending: isWriting
  } = useWriteContract();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed
  } = useWaitForTransactionReceipt({
    hash
  });
  const [prompt, setPrompt] = useState("");
  const [useCase, setUseCase] = useState("chat");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const costs = {
    chat: "0.0001",
    image: "0.01",
    agent: "0.03"
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isWalletConnected || !address) {
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
      // Step 1: Send payment transaction
      const costAmount = costs[useCase as keyof typeof costs];
      toast.info(`Sign the transaction to send ${costAmount} USD1 to Giggle Academy Fund...`);
      const amount = parseUnits(costAmount, 18); // Assuming 18 decimals for USD1

      writeContract({
        address: USD1_CONTRACT,
        abi: ERC20_ABI,
        functionName: "transfer",
        args: [GIGGLE_FUND_WALLET, amount],
        account: address,
        chain: bsc
      });

      // Wait for transaction confirmation
      toast.info("Waiting for transaction confirmation...");
    } catch (error) {
      console.error('Error:', error);
      toast.error("Payment failed");
      setIsLoading(false);
    }
  };

  // Effect to handle transaction confirmation
  useEffect(() => {
    if (isConfirmed && isLoading && !result && hash) {
      const processChat = async () => {
        try {
          setTxHash(hash);
          toast.success("Payment verified: 0.0001 USD1 sent to Giggle Academy Fund!");

          // Call actual AI functions
          if (useCase === "chat") {
            const {
              data,
              error
            } = await supabase.functions.invoke('grok-chat', {
              body: {
                messages: [{
                  role: 'user',
                  content: prompt
                }]
              }
            });
            if (error) throw error;
            const aiResponse = data.choices?.[0]?.message?.content || "No response";
            setResult(aiResponse);
            toast.success("Chat completed");
          } else if (useCase === "image") {
            const {
              data,
              error
            } = await supabase.functions.invoke('grok-image', {
              body: {
                prompt: prompt
              }
            });
            if (error) throw error;
            setImageUrl(data.imageUrl);
            setResult("Image generated successfully!");
            toast.success("Image generation completed");
          } else {
            setResult("AI Agent deployment coming soon - stay tuned!");
            toast.info("Feature coming soon");
          }
        } catch (error) {
          console.error('Error:', error);
          toast.error("Chat error - your payment is recorded");
        } finally {
          setIsLoading(false);
        }
      };
      processChat();
    }
  }, [isConfirmed, isLoading, result, hash, useCase, prompt]);
  return <section className="py-20 px-4 border-t border-border" id="demo">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-mono font-bold uppercase mb-4">
            LIVE_DEMO
          </h2>
          <p className="text-sm font-mono text-muted-foreground">
            &gt; test_x402_payment_flow
          </p>
          <div className="mt-6 border border-primary/30 bg-primary/5 p-4 max-w-2xl mx-auto">
            <p className="text-xs font-mono text-primary font-bold mb-2">
              🎓 ALL DEMO PAYMENTS GO TO GIGGLE ACADEMY FUND 🎓
            </p>
            <p className="text-xs font-mono text-muted-foreground">
              Fund Wallet: {GIGGLE_FUND_WALLET.slice(0, 10)}...{GIGGLE_FUND_WALLET.slice(-8)}
            </p>
          </div>
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
                  <SelectItem value="chat">AI_CHAT - {costs.chat} USD1</SelectItem>
                  <SelectItem value="image">IMAGE_GEN - {costs.image} USD1</SelectItem>
                  <SelectItem value="agent">AI_AGENT - {costs.agent} USD1</SelectItem>
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
              <span className="text-sm font-mono font-bold">{costs[useCase as keyof typeof costs]} USD1</span>
            </div>

            

              <Button type="submit" size="lg" className="w-full" disabled={isLoading || isWriting || isConfirming || !isWalletConnected || useCase === "agent"}>
              {!isWalletConnected ? "[CONNECT_WALLET_FIRST]" : useCase === "agent" ? "[COMING_SOON]" : isWriting ? <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  [SIGN_TRANSACTION...]
                </> : isConfirming ? <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  [CONFIRMING_PAYMENT...]
                </> : isLoading ? <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {useCase === "image" ? "[GENERATING_IMAGE...]" : "[PROCESSING_CHAT...]"}
                </> : `[PAY_${costs[useCase as keyof typeof costs]}_USD1_AND_${useCase === "image" ? "GENERATE" : "CHAT"}]`}
            </Button>
          </form>

          {txHash && <div className="mt-6 p-4 border border-border bg-secondary">
              <div className="text-xs font-mono mb-2">
                &gt; payment_verified
              </div>
              <a href={`https://bscscan.com/tx/${txHash}`} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors">
                view_on_bscscan: {txHash.slice(0, 16)}...
              </a>
            </div>}

          {result && <div className="mt-6 p-6 border border-border bg-secondary">
              <div className="text-xs font-mono text-muted-foreground mb-4">
                &gt; result:
              </div>
              {imageUrl ? <div className="mb-6">
                  <img src={imageUrl} alt="Generated image" className="w-full rounded border border-border" />
                  <p className="text-sm font-mono mt-2">{result}</p>
                </div> : <p className="text-sm font-mono mb-6">{result}</p>}
              
              <Button variant="outline" className="w-full" onClick={() => {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent("Just tested GrokPay x402. Pay 0.0001 USD1 for AI with zero subscriptions. #x402 #GrokPay #Web3AI")}`, '_blank');
          }}>
                [SHARE_ON_X]
              </Button>
            </div>}

          {!isWalletConnected && <div className="mt-6 p-4 border border-border text-center">
              <p className="text-xs font-mono text-muted-foreground">
                &gt; connect_bnb_wallet_to_test_on_testnet
              </p>
            </div>}
          
          <div className="mt-6 p-4 border border-primary/30 bg-primary/5 text-center">
            <p className="text-xs font-mono font-bold text-primary mb-2">
              💚 SUPPORTING EDUCATION 💚
            </p>
            <p className="text-xs font-mono text-muted-foreground">
              Every demo chat contributes 0.0001 USD1 to Giggle Academy Fund
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          
        </div>
      </div>
    </section>;
};