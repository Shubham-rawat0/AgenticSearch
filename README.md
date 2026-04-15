# Agentic Search Engine (Perplexity-like System)

Orion AI is an **agentic search system** that combines real-time web search, LLM reasoning, and streaming responses to deliver accurate, source-backed answers.

Built using **LangGraph + Gemini + Tavily**, it mimics modern AI search engines like Perplexity by executing multi-step reasoning workflows and presenting results with live sources.

---

## 🚀 Features

### 🧠 Agentic Search Workflow

* Powered by **LangGraph** for structured reasoning
* Multi-step pipeline:

  1. Query understanding  
  2. Web search (Tavily)  
  3. Source reading  
  4. Answer synthesis  

* Maintains context using **checkpoint-based memory**

---

### 🌐 Real-Time Web Search

* Uses **Tavily Search API**
* Fetches:

  * Relevant web pages  
  * Source URLs  

* Enables **grounded and up-to-date answers**

---

### ⚡ Streaming Responses (SSE)

* Uses **Server-Sent Events (SSE)** for real-time updates
* Streams:

  * Search stages (`searching → reading → writing`)
  * Incremental response tokens
  * Sources as they are discovered  

---

### 🔗 Source Transparency (Perplexity-style)

* Displays sources alongside responses
* Supports:

  * Multiple source batches  
  * Deduplication  
  * Clickable source chips  

---

### 💾 Stateful Memory (LangGraph Checkpoints)

* Maintains conversation context using `checkpoint_id`
* Enables:

  * Multi-turn conversations  
  * Session continuity  
  * Context-aware responses  

---

### 🧾 Session History

* Tracks user queries within session
* Restore previous context via checkpoint reuse
* Sidebar-based navigation

---

### 🎨 Modern UI (Next.js + Tailwind)

* Clean ChatGPT-style interface
* Features:

  * Streaming chat UI  
  * Search stage visualization  
  * Typing animations  
  * Responsive layout  

---

## 🏗️ Tech Stack

### Frontend

* Next.js (React)
* TypeScript
* Tailwind CSS

---

### Backend

* Python
* FastAPI
* LangGraph

---

### AI / LLM

* Google Gemini (`langchain_google_genai`)

---

### Search Layer

* Tavily Search API

---

### Streaming

* Server-Sent Events (SSE)

---

## ⚙️ How It Works

### 1️⃣ User Query

User sends a query from frontend UI

---

### 2️⃣ Agent Execution (LangGraph)

LangGraph orchestrates:

* LLM reasoning
* Tool usage (Tavily search)

---

### 3️⃣ Web Search

* Tavily retrieves relevant sources
* URLs streamed back to frontend

---

### 4️⃣ Response Generation

* Gemini processes:

  * Retrieved documents  
  * Context  

* Generates final answer

---

### 5️⃣ Streaming to UI

Frontend receives:

* Partial content (token streaming)
* Search stages
* Sources

---

## 🧠 Architecture Overview

```text
Frontend (Next.js)
        ↓
FastAPI (SSE Streaming)
        ↓
LangGraph Agent
   ↓          ↓
Gemini      Tavily
   ↓          ↓
Final Answer + Sources
