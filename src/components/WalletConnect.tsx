import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export const WalletConnect = ({ 
  onConnect 
}: { 
  onConnect: (connected: boolean) => void 
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("10.00");

  const handleConnect = async () => {
    toast.loading("Connecting to BNB Chain...");
    
    setTimeout(() => {
      const mockAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
      setAddress(mockAddress);
      setIsConnected(true);
      onConnect(true);
      
      toast.success("Wallet connected - BNB Testnet ready");
    }, 1500);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setAddress("");
    onConnect(false);
    toast.info("Wallet disconnected");
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {!isConnected ? (
        <Button onClick={handleConnect}>
          [CONNECT_WALLET]
        </Button>
      ) : (
        <div className="border border-border p-4 bg-background min-w-64">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-foreground" />
              <span className="text-xs font-mono uppercase">Connected</span>
            </div>
            <button
              onClick={handleDisconnect}
              className="text-xs font-mono hover:text-muted-foreground transition-colors"
            >
              [X]
            </button>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div>
              <div className="text-muted-foreground mb-1">ADDRESS:</div>
              <div>{address.slice(0, 6)}...{address.slice(-4)}</div>
            </div>

            <div>
              <div className="text-muted-foreground mb-1">BALANCE:</div>
              <div className="text-sm font-bold">{balance} USDC</div>
            </div>

            <div className="pt-2 border-t border-border">
              <div className="text-muted-foreground">
                BNB_TESTNET
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
