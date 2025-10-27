import { Button } from "@/components/ui/button";
import { Github, Twitter, MessageCircle, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export const Footer = () => {
  const links = {
    github: "https://github.com",
    twitter: "https://twitter.com",
    discord: "https://discord.com",
    docs: "https://docs.lovable.dev",
  };

  return (
    <footer className="relative py-20 px-4 border-t border-border/50">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Left Column - CTA */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold mb-4">
              Ready to Build on <span className="gradient-text">x402?</span>
            </h3>
            <p className="text-muted-foreground mb-6 text-lg">
              Join the AI payment revolution. Deploy autonomous agents that pay for themselves. 
              Launch $GROKPAY Q1/2026 🚀
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg">
                <MessageCircle className="w-5 h-5" />
                Join Discord Beta
              </Button>
              <Button variant="outline" size="lg" className="border-primary hover:bg-primary/10">
                <ExternalLink className="w-5 h-5" />
                Developer Docs
              </Button>
            </div>
          </motion.div>

          {/* Right Column - Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-8"
          >
            <div>
              <h4 className="font-semibold mb-4 text-lg">Product</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#use-cases" className="text-muted-foreground hover:text-accent transition-colors">
                    Use Cases
                  </a>
                </li>
                <li>
                  <a href="#demo" className="text-muted-foreground hover:text-accent transition-colors">
                    Live Demo
                  </a>
                </li>
                <li>
                  <a href={links.docs} className="text-muted-foreground hover:text-accent transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                    SDK & API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-lg">Community</h4>
              <ul className="space-y-3">
                <li>
                  <a href={links.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                </li>
                <li>
                  <a href={links.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2">
                    <Twitter className="w-4 h-4" />
                    Twitter/X
                  </a>
                </li>
                <li>
                  <a href={links.discord} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Discord
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="pt-8 border-t border-border/50"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center font-bold text-sm">
                GP
              </div>
              <span className="font-semibold">GrokPay Proxy</span>
            </div>

            <p className="text-sm text-muted-foreground text-center">
              Powered by x402 Protocol on BNB Chain. Built for the autonomous AI economy.
            </p>

            <div className="flex items-center gap-4">
              <a 
                href={links.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href={links.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href={links.discord} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              © 2025 GrokPay. Testnet only - not financial advice. Always DYOR. 🚀
            </p>
          </div>
        </motion.div>

        {/* FOMO Exit Intent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 glass-card p-6 rounded-xl border border-accent/30 text-center"
        >
          <p className="text-lg font-semibold mb-2">
            Don't Miss the x402 Wave! 🌊
          </p>
          <p className="text-sm text-muted-foreground">
            Follow <span className="text-accent font-semibold">@GrokPayProxy</span> for launch updates and exclusive airdrop announcements
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
