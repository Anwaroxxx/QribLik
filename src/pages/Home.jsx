import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import Sidebar from "../components/sidebar";
import MainFeed from "../components/Feed";

function Home() {
   const { dark } = useTheme();
  const [activeView, setActiveView] = useState("feed");
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  return (
    <div className={`flex h-screen overflow-hidden transition-colors duration-500 ${dark ? "bg-[#0f0a1e]" : "bg-[#f9fafb]"}`}>
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="flex-1 ml-0 md:ml-64 overflow-hidden">
        <MainFeed
          activeView={activeView}
          onViewChange={setActiveView}
          activeCategory={selectedCategory}
        />
      </div>
    </div>
  );
}

export default Home;