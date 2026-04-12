import { useState } from "react";

const InputBar = ({ currentMessage, setCurrentMessage, onSubmit }: any) => {
  const handleChange = (e: any) => {
    setCurrentMessage(e.target.value);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full flex justify-center px-4 py-4 bg-white border-t border-[#E5E5E5]"
    >
      <div className="w-full max-w-2xl flex items-center bg-[#F7F7F8] border border-[#E5E5E5] rounded-4xl px-4 py-2">
        {/* Input */}
        <input
          type="text"
          placeholder=" Ask anything"
          value={currentMessage}
          onChange={handleChange}
          className="flex-grow bg-transparent text-[14px] text-[#111] placeholder:text-[#888] focus:outline-none"
        />

        {/* Send Icon Button */}
        <button
          type="submit"
          className="ml-2 flex items-center justify-center w-9 h-9 rounded-2xl bg-[#111] hover:bg-[#222] transition disabled:opacity-50"
        >
          <svg
            className="w-4 h-4 text-white rotate-45"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12l14-7-7 14-2-5-5-2z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default InputBar;
