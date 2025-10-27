import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import logo from "@/assets/grokpay-logo.jpg";
export const Hero = ({
  onConnectWallet
}: {
  onConnectWallet: () => void;
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 0,
    minutes: 0
  });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.minutes > 0) return {
          ...prev,
          minutes: prev.minutes - 1
        };
        if (prev.hours > 0) return {
          ...prev,
          hours: prev.hours - 1,
          minutes: 59
        };
        if (prev.days > 0) return {
          ...prev,
          days: prev.days - 1,
          hours: 23,
          minutes: 59
        };
        return prev;
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);
  return <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center space-y-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src={logo} alt="GrokPay x402 Logo" className="w-48 h-48 object-contain" />
          </div>

          {/* Badge */}
          <div className="inline-block border border-foreground px-4 py-2">
            <span className="text-xs font-mono uppercase tracking-widest">
              &gt; x402_hype_active
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-mono font-bold uppercase tracking-tight">
            GROK AI<br />
            0.01 USDC/CHAT
          </h1>

          <div className="border-t border-b border-foreground py-4">
            <p className="text-sm md:text-base font-mono">
              x402 PROTOCOL | BNB CHAIN | NO_SUBSCRIPTIONS
            </p>
          </div>

          {/* Stats */}
          

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={onConnectWallet} className="px-8 py-6 h-auto">
              [CONNECT_WALLET]
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-6 h-auto">
              [READ_DOCS]
            </Button>
          </div>

          {/* Countdown */}
          

          {/* Footer text */}
          <p className="text-xs font-mono text-muted-foreground pt-4">
            &gt; EARLY_TESTERS_GET_$GROKPAY_AIRDROP
          </p>
        </div>
      </div>
    </section>;
};