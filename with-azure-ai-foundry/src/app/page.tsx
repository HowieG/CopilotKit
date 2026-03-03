"use client";

import { CopilotSidebar } from "@copilotkit/react-ui";

export default function Home() {
  return (
    <main>
      <CopilotSidebar
        labels={{
          title: "Azure AI Foundry Assistant",
          initial: "Hi! I'm your Azure AI Foundry assistant. How can I help you today?",
        }}
      >
        <div className="container">
          <h1>Azure AI Foundry + CopilotKit</h1>
          <p>
            This template connects CopilotKit to Azure AI Foundry via the
            Microsoft Agent Framework and the AG-UI protocol.
          </p>
          <p>
            Open the sidebar to start chatting with your Azure AI Foundry agent.
          </p>
        </div>
      </CopilotSidebar>
    </main>
  );
}
