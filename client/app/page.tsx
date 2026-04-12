"use client";

import React, { useState, useEffect, useRef } from "react";
import { BookOpen, RefreshCw, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import InputBar from "@/components/Inputbar";
import MessageArea from "@/components/MessageArea";

interface SearchInfo {
  stages: string[];
  query: string;
  urls: string[];
}

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  isLoading?: boolean;
  searchInfo?: SearchInfo;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Welcome to Orion AI. How can I assist you today?",
      isUser: false,
    },
  ]);

  const [history, setHistory] = useState<
    { id: string; query: string; checkpoint: string | null }[]
  >([]);

  const [currentMessage, setCurrentMessage] = useState("");
  const [checkpointId, setCheckpointId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleNewInquiry = () => {
    setMessages([
      {
        id: 1,
        content: "New session started.",
        isUser: false,
      },
    ]);
    setCheckpointId(null);
  };

  const restoreHistory = (item: any) => {
    setMessages([
      {
        id: 1,
        content: `Restored: "${item.query}"`,
        isUser: false,
      },
    ]);
    setCheckpointId(item.checkpoint);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!currentMessage.trim() || isProcessing) return;

    setIsProcessing(true);

    const userInput = currentMessage;
    const userId = Date.now();
    const aiId = userId + 1;

    setCurrentMessage("");

    // Save history
    setHistory((prev) => [
      { id: String(userId), query: userInput, checkpoint: checkpointId },
      ...prev,
    ]);

    // Add messages
    setMessages((prev) => [
      ...prev,
      { id: userId, content: userInput, isUser: true },
      {
        id: aiId,
        content: "",
        isUser: false,
        isLoading: true,
        searchInfo: { stages: ["Analyzing"], query: "", urls: [] },
      },
    ]);

    try {
      let url = `http://127.0.0.1:8000/chat_stream/${encodeURIComponent(
        userInput,
      )}`;

      if (checkpointId) {
        url += `?checkpoint_id=${encodeURIComponent(checkpointId)}`;
      }

      const eventSource = new EventSource(url);

      let streamed = "";
      let searchData: SearchInfo = { stages: [], query: "", urls: [] };

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          // CHECKPOINT
          if (data.type === "checkpoint") {
            setCheckpointId(data.checkpoint_id);
            return;
          }

          // CONTENT
          if (data.type === "content") {
            streamed += data.content;

            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === aiId
                  ? { ...msg, content: streamed, isLoading: false }
                  : msg,
              ),
            );
            return;
          }

          // SEARCH START
          if (data.type === "search_start") {
            searchData = {
              stages: ["searching"],
              query: data.query,
              urls: [],
            };

            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === aiId ? { ...msg, searchInfo: searchData } : msg,
              ),
            );
            return;
          }

          // SEARCH RESULTS (FIXED)
          if (data.type === "search_results") {
            let urls: string[] = [];

            if (data.urls) {
              urls =
                typeof data.urls === "string"
                  ? JSON.parse(data.urls)
                  : data.urls;
            } else if (data.results) {
              urls = data.results.map((r: any) => r.url);
            }

            const mergedUrls = Array.from(
              new Set([...(searchData.urls || []), ...urls]),
            );

            searchData = {
              ...searchData,
              urls: mergedUrls,
              stages: [...searchData.stages, "reading"],
            };

            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === aiId ? { ...msg, searchInfo: searchData } : msg,
              ),
            );
            return;
          }

          // END
          if (data.type === "end") {
            searchData = {
              ...searchData,
              stages: [...searchData.stages, "writing"],
            };

            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === aiId
                  ? { ...msg, searchInfo: searchData, isLoading: false }
                  : msg,
              ),
            );

            eventSource.close();
            setIsProcessing(false);
          }
        } catch (err) {
          console.error("Parse error:", event.data);
        }
      };

      eventSource.onerror = () => {
        eventSource.close();
        setIsProcessing(false);
      };
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#F8F9FB]">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r hidden lg:flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <BookOpen className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-lg">Orion AI</span>
          </div>

          <button
            onClick={handleNewInquiry}
            className="w-full py-3 bg-black text-white rounded-xl flex justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4">
          <p className="text-xs text-gray-400 mb-3">History</p>

          {history.map((item) => (
            <div
              key={item.id}
              onClick={() => restoreHistory(item)}
              className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 flex gap-2 mb-2"
            >
              <ChevronRight className="w-4 h-4" />
              <span className="truncate text-sm">{item.query}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col">
        <Header />

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-6 py-6 space-y-6"
        >
          <MessageArea messages={messages} />
        </div>

        <div className="p-4 bg-white border-t">
          <InputBar
            currentMessage={currentMessage}
            setCurrentMessage={setCurrentMessage}
            onSubmit={handleSubmit}
            disabled={isProcessing}
          />
        </div>
      </main>
    </div>
  );
}
