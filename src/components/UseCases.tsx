import { Button } from "@/components/ui/button";

const useCases = [
  {
    title: "AI_CHAT",
    description: "Ask Grok about DeFi, crypto, any question",
    price: "0.01 USDC",
    example: "explain_bitcoin_halving",
  },
  {
    title: "IMAGE_GEN",
    description: "Generate unique AI images with Grok models",
    price: "0.05 USDC",
    example: "futuristic_city_flying_cars",
  },
  {
    title: "AI_AGENT",
    description: "Deploy autonomous agents with auto-pay",
    price: "CUSTOM",
    example: "agent_analyzes_market_24_7",
  },
];

export const UseCases = ({ onTryDemo }: { onTryDemo: (useCase: string) => void }) => {
  return (
    <section className="py-20 px-4 border-t border-border" id="use-cases">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-mono font-bold uppercase mb-4">
            USE_CASES
          </h2>
          <p className="text-sm font-mono text-muted-foreground">
            &gt; x402_protocol_micro_payments
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <div key={useCase.title} className="border border-border p-6 hover:bg-muted transition-colors">
              <div className="space-y-4">
                <div className="text-xs font-mono text-muted-foreground">
                  [{String(index + 1).padStart(2, '0')}]
                </div>
                
                <h3 className="text-xl font-mono font-bold">{useCase.title}</h3>
                
                <p className="text-sm font-mono text-muted-foreground">
                  {useCase.description}
                </p>

                <div className="border-t border-border pt-4 flex justify-between items-center">
                  <span className="text-xs font-mono text-muted-foreground">COST:</span>
                  <span className="text-sm font-mono font-bold">{useCase.price}</span>
                </div>

                <div className="bg-secondary p-3 text-xs font-mono text-muted-foreground">
                  &gt; {useCase.example}
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => onTryDemo(useCase.title)}
                >
                  [TRY_NOW]
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 border border-border p-6 max-w-4xl mx-auto">
          <div className="text-xs font-mono text-muted-foreground mb-2">
            &gt; x402_info
          </div>
          <p className="text-sm font-mono">
            x402 powers Anthropic MCP - enabling AI agents to pay each other on-chain.
            Like Virtuals Protocol capturing 10% revenue from AI agents.
            Join before $GROKPAY launches.
          </p>
        </div>
      </div>
    </section>
  );
};
