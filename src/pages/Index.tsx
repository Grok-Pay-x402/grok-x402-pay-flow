import { useState } from "react";
import { Hero } from "@/components/Hero";
import { UseCases } from "@/components/UseCases";
import { Demo } from "@/components/Demo";
import { Footer } from "@/components/Footer";
import { WalletConnect } from "@/components/WalletConnect";

const Index = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleConnectWallet = () => {
    // This will be triggered from Hero CTA, scrolls to wallet connect
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTryDemo = (useCase: string) => {
    // Scroll to demo section
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <WalletConnect onConnect={setIsWalletConnected} />
      <Hero onConnectWallet={handleConnectWallet} />
      <UseCases onTryDemo={handleTryDemo} />
      <Demo isWalletConnected={isWalletConnected} />
      <Footer />
    </div>
  );
};

export default Index;
