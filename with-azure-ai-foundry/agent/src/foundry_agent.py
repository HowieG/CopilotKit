"""Azure AI Foundry agent for CopilotKit.

Supports two backend modes:
  1. Azure AI Foundry Agent (recommended) — set AZURE_AI_PROJECT_ENDPOINT
  2. Direct Azure OpenAI (fallback) — set AZURE_OPENAI_ENDPOINT
"""

from __future__ import annotations

import os

import uvicorn
from azure.identity import DefaultAzureCredential
from dotenv import load_dotenv
from fastapi import FastAPI

from agent_framework import ChatAgent, ChatClientProtocol
from agent_framework.ag_ui import add_agent_framework_fastapi_endpoint
from agent_framework.azure import AzureAIAgentClient, AzureOpenAIChatClient

load_dotenv()


def _build_chat_client() -> ChatClientProtocol:
    """Select the right chat client based on available env vars."""

    # Option 1: Azure AI Foundry Agent (recommended)
    if os.getenv("AZURE_AI_PROJECT_ENDPOINT"):
        return AzureAIAgentClient(
            credential=DefaultAzureCredential(),
            endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
            model=os.getenv("AZURE_AI_MODEL_DEPLOYMENT_NAME", "gpt-4o"),
        )

    # Option 2: Direct Azure OpenAI
    if os.getenv("AZURE_OPENAI_ENDPOINT"):
        api_key = os.getenv("AZURE_OPENAI_API_KEY")
        credential = api_key if api_key else DefaultAzureCredential()
        return AzureOpenAIChatClient(
            credential=credential,
            endpoint=os.environ["AZURE_OPENAI_ENDPOINT"],
            deployment_name=os.getenv(
                "AZURE_OPENAI_CHAT_DEPLOYMENT_NAME", "gpt-4o"
            ),
        )

    raise RuntimeError(
        "No Azure credentials configured. "
        "Set AZURE_AI_PROJECT_ENDPOINT (recommended) or AZURE_OPENAI_ENDPOINT "
        "in agent/.env. See agent/.env.example for details."
    )


chat_client = _build_chat_client()

agent = ChatAgent(
    name="foundry_agent",
    instructions="You are a helpful assistant powered by Azure AI Foundry.",
    chat_client=chat_client,
)

app = FastAPI(title="Azure AI Foundry Agent")
add_agent_framework_fastapi_endpoint(app=app, agent=agent, path="/")

if __name__ == "__main__":
    uvicorn.run("foundry_agent:app", host="0.0.0.0", port=8000, reload=True)
