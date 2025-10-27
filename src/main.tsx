import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { config, projectId } from './config/wagmi'
import App from "./App.tsx";
import "./index.css";

const queryClient = new QueryClient()

// Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: false,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-font-family': '"Courier New", Courier, monospace',
    '--w3m-accent': 'hsl(0, 0%, 100%)',
    '--w3m-border-radius-master': '0px'
  }
})

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);
