import { MessageSquare, Image, Bot, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const useCases = [
  {
    icon: MessageSquare,
    title: "AI Chat",
    description: "Hỏi Grok về DeFi, crypto trends, hoặc bất kỳ câu hỏi nào",
    price: "0.01 USDC",
    color: "from-purple-500/20 to-violet-500/20",
    borderColor: "border-purple-500/30",
    example: "Explain Bitcoin halving in simple terms",
  },
  {
    icon: Image,
    title: "Image Generation",
    description: "Tạo ảnh AI độc đáo với Grok's creative models",
    price: "0.05 USDC",
    color: "from-cyan-500/20 to-blue-500/20",
    borderColor: "border-cyan-500/30",
    example: "Generate a futuristic city with flying cars",
  },
  {
    icon: Bot,
    title: "AI Agent Auto-Pay",
    description: "Deploy autonomous agents tự động pay cho API calls",
    price: "Custom",
    color: "from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-500/30",
    example: "Agent analyzes market data 24/7",
  },
];

export const UseCases = ({ onTryDemo }: { onTryDemo: (useCase: string) => void }) => {
  return (
    <section className="py-20 px-4" id="use-cases">
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powered by <span className="gradient-text">x402 Protocol</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real use cases for micro-payments on BNB Chain. No subscriptions, pay per use 🎯
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className={`glass-card p-8 rounded-2xl border ${useCase.borderColor} hover:border-primary/50 transition-all duration-300 h-full flex flex-col`}>
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${useCase.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <useCase.icon className="w-8 h-8 text-foreground" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3">{useCase.title}</h3>
                <p className="text-muted-foreground mb-4 flex-grow">{useCase.description}</p>

                {/* Price */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                  <span className="text-sm text-muted-foreground">Cost per request:</span>
                  <span className="text-lg font-bold text-accent">{useCase.price}</span>
                </div>

                {/* Example */}
                <div className="bg-secondary/50 rounded-lg p-3 mb-6 text-sm text-muted-foreground italic border border-border/50">
                  "{useCase.example}"
                </div>

                {/* CTA */}
                <Button 
                  variant="outline" 
                  className="w-full group-hover:border-primary group-hover:text-primary transition-colors"
                  onClick={() => onTryDemo(useCase.title)}
                >
                  Try Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 glass-card p-6 rounded-xl border border-accent/30 max-w-4xl mx-auto"
        >
          <div className="flex items-start gap-4">
            <Bot className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold mb-2 text-lg">Why x402 Matters</h4>
              <p className="text-muted-foreground">
                x402 powers Anthropic MCP – enabling AI agents to pay each other on-chain. 
                Like Virtuals Protocol capturing 10% revenue from AI agents, x402 is the payment rails for autonomous AI economy. 
                <span className="text-accent font-semibold"> Join the wave before $GROKPAY launches! 🚀</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
