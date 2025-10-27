import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="py-20 px-4 border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-mono font-bold uppercase mb-4">
              BUILD_ON_X402
            </h3>
            <p className="text-sm font-mono text-muted-foreground mb-6">
              Join the AI payment revolution. Deploy autonomous agents.
              Launch $GROKPAY Q1/2026.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg">
                [JOIN_DISCORD]
              </Button>
              <Button variant="outline" size="lg">
                [DEV_DOCS]
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="text-xs font-mono uppercase mb-4 text-muted-foreground">
                &gt; product
              </div>
              <ul className="space-y-2 text-sm font-mono">
                <li><a href="#use-cases" className="hover:text-foreground transition-colors text-muted-foreground">use_cases</a></li>
                <li><a href="#demo" className="hover:text-foreground transition-colors text-muted-foreground">live_demo</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors text-muted-foreground">documentation</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors text-muted-foreground">sdk_api</a></li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-mono uppercase mb-4 text-muted-foreground">
                &gt; community
              </div>
              <ul className="space-y-2 text-sm font-mono">
                <li><a href="#" className="hover:text-foreground transition-colors text-muted-foreground">github</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors text-muted-foreground">twitter_x</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors text-muted-foreground">discord</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 border border-foreground flex items-center justify-center font-mono font-bold text-xs">
                GP
              </div>
              <span className="font-mono font-semibold">GROKPAY_PROXY</span>
            </div>

            <p className="text-xs font-mono text-muted-foreground text-center">
              POWERED_BY_X402_PROTOCOL_ON_BNB_CHAIN
            </p>

            <div className="flex items-center gap-4 text-xs font-mono">
              <a href="#" className="hover:text-foreground transition-colors text-muted-foreground">GITHUB</a>
              <a href="#" className="hover:text-foreground transition-colors text-muted-foreground">X</a>
              <a href="#" className="hover:text-foreground transition-colors text-muted-foreground">DISCORD</a>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs font-mono text-muted-foreground">
              (c) 2025 GROKPAY | TESTNET_ONLY | NOT_FINANCIAL_ADVICE | DYOR
            </p>
          </div>
        </div>

        <div className="mt-12 border border-border p-6 text-center">
          <p className="text-sm font-mono mb-2">
            &gt; dont_miss_x402_wave
          </p>
          <p className="text-xs font-mono text-muted-foreground">
            follow @GROKPAYPROXY for updates
          </p>
        </div>
      </div>
    </footer>
  );
};
