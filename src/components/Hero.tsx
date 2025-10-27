import { Button } from "@/components/ui/button";
import { Wallet, Zap, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import heroBg from "@/assets/hero-bg.jpg";

export const Hero = ({ onConnectWallet }: { onConnectWallet: () => void }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 7, hours: 0, minutes: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59 };
        return prev;
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Animated grid overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(hsl(263 70% 50% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(263 70% 50% / 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container relative z-10 px-4 py-20 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* FOMO Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glass-card border border-accent/30"
          >
            <TrendingUp className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-sm font-medium">
              <span className="text-accent">x402 Hype Đang Nóng</span> – Test Ngay Trước Khi $GROKPAY Launch!
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Unlock <span className="gradient-text">Grok AI</span>
            <br />
            Với 0.01 USDC/Chat
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            Powered by <span className="text-primary font-semibold">x402 Protocol</span> on BNB Chain. 
            No subscriptions, instant payments, pure AI magic 🚀
          </motion.p>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              <span className="text-lg font-semibold">1K+ Tx Today</span>
            </div>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              <span className="text-lg font-semibold">+93% Growth YoY</span>
            </div>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-accent" />
              <span className="text-lg font-semibold">5K+ Beta Users</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button 
              size="lg" 
              variant="hero"
              onClick={onConnectWallet}
              className="text-lg px-8 py-6 h-auto"
            >
              <Wallet className="w-5 h-5" />
              Connect BNB Wallet & Test Now
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 h-auto border-primary hover:bg-primary/10"
            >
              View Documentation
            </Button>
          </motion.div>

          {/* Countdown */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="glass-card inline-flex items-center gap-6 px-8 py-4 rounded-xl"
          >
            <span className="text-sm text-muted-foreground">Beta Ends In:</span>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">{timeLeft.days}</div>
                <div className="text-xs text-muted-foreground">Days</div>
              </div>
              <div className="text-3xl font-bold text-muted-foreground">:</div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="text-xs text-muted-foreground">Hours</div>
              </div>
              <div className="text-3xl font-bold text-muted-foreground">:</div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="text-xs text-muted-foreground">Mins</div>
              </div>
            </div>
          </motion.div>

          {/* Floating badge */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="mt-12 inline-block"
          >
            <div className="px-6 py-3 rounded-full bg-accent/10 border border-accent/30 text-accent font-semibold">
              Early Testers Get $GROKPAY Airdrop! 🎁
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated elements */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-20 w-32 h-32 border border-primary/20 rounded-full"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 left-20 w-40 h-40 border border-accent/20 rounded-full"
      />
    </section>
  );
};
