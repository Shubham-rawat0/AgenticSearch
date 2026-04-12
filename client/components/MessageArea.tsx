import React from "react";

const PremiumTypingAnimation = () => {
  return (
    <div className="flex items-center gap-1.5">
      {[0, 150, 300].map((delay, i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </div>
  );
};

const SourceChip = ({ url }: any) => {
  let hostname = "";
  try {
    hostname = new URL(url).hostname.replace("www.", "");
  } catch {
    hostname = url.slice(0, 30);
  }

  return (
    <a
      href={url}
      target="_blank"
      className="px-3 py-1.5 text-xs rounded-full bg-white border border-gray-200 hover:bg-gray-100 transition"
    >
      {hostname}
    </a>
  );
};

const SearchStages = ({ searchInfo }: any) => {
  if (!searchInfo?.stages?.length) return null;

  return (
    <div className="mb-4 mt-1 pl-4 animate-fadeIn">
      <div className="space-y-5 text-sm text-gray-700">
        
        {/* Searching */}
        {searchInfo.stages.includes("searching") && (
          <div className="relative">
            <div className="absolute -left-3 top-1 w-2 h-2 bg-emerald-500 rounded-full" />
            <div className="ml-2">
              <p className="font-medium text-gray-800 mb-2">
                Searching the web
              </p>
              <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-md bg-gray-100 border border-gray-200">
                🔍 {searchInfo.query}
              </div>
            </div>
          </div>
        )}

        {/* Reading */}
        {searchInfo.stages.includes("reading") && (
          <div className="relative animate-slideUp">
            <div className="absolute -left-3 top-1 w-2 h-2 bg-emerald-500 rounded-full" />
            <div className="ml-2">
              <p className="font-medium text-gray-800 mb-2">
                Reading sources
              </p>

              {searchInfo.urls?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {searchInfo.urls.map((url: string, i: number) => (
                    <SourceChip key={i} url={url} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Writing */}
        {searchInfo.stages.includes("writing") && (
          <div className="relative animate-fadeIn">
            <div className="absolute -left-3 top-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="ml-2 font-medium text-gray-800">
              Writing response
            </span>
          </div>
        )}

        {/* Error */}
        {searchInfo.stages.includes("error") && (
          <div className="relative">
            <div className="absolute -left-3 top-1 w-2 h-2 bg-red-500 rounded-full" />
            <span className="ml-2 text-red-500 font-medium">
              Search failed
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const MessageArea = ({ messages }: any) => {
  return (
    <div className="flex-grow overflow-y-auto bg-[#f7f7f8] border-b border-gray-200">
      <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        {messages.map((message: any) => (
          <div
            key={message.id}
            className={`flex ${
              message.isUser ? "justify-end" : "justify-start"
            }`}
          >
            <div className="flex flex-col max-w-[80%]">
              {/* SEARCH STAGES */}
              {!message.isUser && message.searchInfo && (
                <SearchStages searchInfo={message.searchInfo} />
              )}

              {/* MESSAGE */}
              <div
                className={`
                  px-5 py-3 rounded-2xl text-sm leading-relaxed
                  transition-all duration-200
                  ${
                    message.isUser
                      ? "bg-[#2F2F2F] text-white rounded-br-sm"
                      : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm"
                  }
                `}
              >
                {message.isLoading ? (
                  <PremiumTypingAnimation />
                ) : message.content ? (
                  message.content
                ) : (
                  <span className="text-gray-400 text-xs italic">
                    Waiting for response...
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageArea;