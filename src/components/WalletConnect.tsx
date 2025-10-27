import { Button } from "@/components/ui/button";
import { Wallet, LogOut } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export const WalletConnect = ({ 
  onConnect 
}: { 
  onConnect: (connected: boolean) => void 
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("10.00");

  const handleConnect = async () => {
    // Simulate wallet connection (in production, use WalletConnect/Web3Modal)
    toast.loading("Connecting to BNB Chain...");
    
    setTimeout(() => {
      const mockAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
      setAddress(mockAddress);
      setIsConnected(true);
      onConnect(true);
      
      toast.success("Wallet Connected!", {
        description: "BNB Testnet - Ready to test x402 payments 🚀",
      });
    }, 1500);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setAddress("");
    onConnect(false);
    toast.info("Wallet Disconnected");
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <AnimatePresence mode="wait">
        {!isConnected ? (
          <motion.div
            key="connect"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <Button 
              variant="hero" 
              onClick={handleConnect}
              className="shadow-glow-primary"
            >
              <Wallet className="w-5 h-5" />
              Connect Wallet
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="connected"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="glass-card p-4 rounded-xl border border-accent/30 min-w-64"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-sm font-medium text-accent">Connected</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDisconnect}
                className="h-8 px-2 hover:text-destructive"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Address</p>
                <p className="text-sm font-mono">
                  {address.slice(0, 6)}...{address.slice(-4)}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Balance (Testnet)</p>
                <p className="text-lg font-bold text-accent">{balance} USDC</p>
              </div>

              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  BNB Testnet • 
                  <a 
                    href="https://testnet.bnbchain.org/faucet-smart"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline ml-1"
                  >
                    Get Testnet USDC
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
