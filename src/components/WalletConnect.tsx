import { useAccount, useDisconnect, useBalance } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { toast } from "sonner";
import logo from "@/assets/grokpay-logo.jpg";

export const WalletConnect = ({ 
  onConnect 
}: { 
  onConnect: (connected: boolean) => void 
}) => {
  const { address, isConnected, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();
  const { data: balance } = useBalance({
    address: address,
  });

  useEffect(() => {
    onConnect(isConnected);
    if (isConnected) {
      toast.success("Wallet connected to BNB Chain");
    }
  }, [isConnected, onConnect]);

  const handleDisconnect = () => {
    disconnect();
    toast.info("Wallet disconnected");
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {!isConnected ? (
        <Button onClick={() => open()}>
          [CONNECT_WALLET]
        </Button>
      ) : (
        <div className="border border-border p-4 bg-background min-w-64">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <img src={logo} alt="GrokPay" className="w-5 h-5 object-contain" />
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
              <div>{address?.slice(0, 6)}...{address?.slice(-4)}</div>
            </div>

            <div>
              <div className="text-muted-foreground mb-1">BALANCE:</div>
              <div className="text-sm font-bold">
                {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : '0.00 BNB'}
              </div>
            </div>

            <div className="pt-2 border-t border-border">
              <div className="text-muted-foreground">
                {chain?.name?.toUpperCase() || 'BNB_CHAIN'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
