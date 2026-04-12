const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-[#E5E5E5]">
      {/* Left: Brand */}
      <div className="flex items-center">
        <span
          className="font-semibold text-[20px] text-[#444746]"
          style={{
            fontFamily:
              '"Google Sans Flex", "Google Sans", "Helvetica Neue","sans-serif"'
          }}
        >
          Orion
        </span>
      </div>

      {/* Right: Navigation */}
      <div className="flex items-center gap-1">
        <button className="text-[13px] px-3 py-1.5 text-[#555] hover:bg-[#F2F2F2] rounded-md transition">
          Home
        </button>

        <button className="text-[13px] px-3 py-1.5 bg-[#F7F7F8] text-[#111] rounded-md">
          Chat
        </button>

        <button className="text-[13px] px-3 py-1.5 text-[#555] hover:bg-[#F2F2F2] rounded-md transition">
          Contacts
        </button>

        <button className="text-[13px] px-3 py-1.5 text-[#555] hover:bg-[#F2F2F2] rounded-md transition">
          Settings
        </button>
      </div>
    </header>
  );
};

export default Header;
