import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import Sidebar from "../components/sidebar";
import MainFeed from "../components/Feed";

function Home() {
  const { dark } = useTheme();
  const [activeView, setActiveView]           = useState("feed");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  return (
    /**
     * Outer wrapper:
     *  - h-screen + overflow-hidden keeps the page itself from scrolling
     *  - Each inner panel (sidebar / feed) handles its own scroll
     */
    <div
      className={`flex h-screen overflow-hidden transition-colors duration-500 ${
        dark ? "bg-[#0f0a1e]" : "bg-[#f9fafb]"
      }`}
    >
      {/* ── Sidebar (fixed on desktop, bottom nav on mobile) ── */}
      <Sidebar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onViewChange={setActiveView}
      />

      {/* ── Main content area ── */}
      {/*
        ml-0 on mobile (sidebar is bottom nav, doesn't take horizontal space)
        ml-64 on desktop (matches sidebar width)
        flex-1 + min-w-0 prevents overflow blowout
        overflow-y-auto gives this column its own scroll context
      */}
      <main className="flex-1 min-w-0 ml-0 md:ml-64 overflow-y-auto flex flex-col">
        <MainFeed
          activeView={activeView}
          onViewChange={setActiveView}
          activeCategory={selectedCategory}
        />
      </main>
    </div>
  );
}

export default Home;