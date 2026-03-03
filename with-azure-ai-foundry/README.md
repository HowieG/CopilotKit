# CopilotKit + Azure AI Foundry

A starter template that connects [CopilotKit](https://copilotkit.ai) to [Azure AI Foundry](https://ai.azure.com) via the Microsoft Agent Framework and the AG-UI protocol.

## Prerequisites

- **Node.js** 18+
- **Python** 3.11+
- **uv** — Python package manager ([install](https://docs.astral.sh/uv/getting-started/installation/))
- **Azure CLI** — for authentication (`az login`)
- An **Azure AI Foundry** project or **Azure OpenAI** resource

## Quick Start

### 1. Clone and install

```bash
git clone https://github.com/CopilotKit/with-azure-ai-foundry.git
cd with-azure-ai-foundry
npm install        # also installs Python deps via postinstall
```

### 2. Configure credentials

```bash
cp agent/.env.example agent/.env
```

Edit `agent/.env` with your Azure credentials. Two options:

**Option 1 — Azure AI Foundry Agent (recommended):**
```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4o
```

**Option 2 — Direct Azure OpenAI:**
```env
AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=gpt-4o
```

Then authenticate:
```bash
az login
```

### 3. Run

```bash
npm run dev
```

This starts:
- **Frontend** at [http://localhost:3000](http://localhost:3000) (Next.js + CopilotKit)
- **Agent** at [http://localhost:8000](http://localhost:8000) (FastAPI + Agent Framework)

Open [http://localhost:3000](http://localhost:3000) and use the sidebar to chat with your Azure AI Foundry agent.

## Architecture

```
Browser → Next.js (/api/copilotkit) → CopilotRuntime → HttpAgent → Agent Framework → Azure AI Foundry
                                        (AG-UI protocol, SSE-based)
```

- **Frontend**: Next.js app with `CopilotKit` provider and `CopilotSidebar`
- **Runtime**: CopilotRuntime routes messages to the Python agent via `HttpAgent`
- **Agent**: Python FastAPI server using Microsoft Agent Framework with `ChatAgent`
- **Backend**: Azure AI Foundry (`AzureAIAgentClient`) or Azure OpenAI (`AzureOpenAIChatClient`)

## Project Structure

```
with-azure-ai-foundry/
├── src/app/
│   ├── layout.tsx                 # CopilotKit provider
│   ├── page.tsx                   # CopilotSidebar chat UI
│   └── api/copilotkit/route.ts    # CopilotRuntime + HttpAgent
├── agent/
│   ├── src/foundry_agent.py       # Agent implementation
│   ├── pyproject.toml             # Python dependencies
│   └── .env.example               # Credential template
├── package.json                   # Scripts and JS dependencies
└── README.md
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both frontend and agent |
| `npm run dev:frontend` | Start only the Next.js frontend |
| `npm run dev:agent` | Start only the Python agent |
| `npm run build` | Build the Next.js app |
| `npm run install:agent` | Install Python agent dependencies |
