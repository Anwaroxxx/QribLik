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
<<<<<<< HEAD
    <div className={`flex h-screen overflow-hidden transition-colors duration-500 ${dark ? "bg-[#0f0a1e]" : "bg-[#f9fafb]"}`}>
=======
    <div className="flex-1 bg-gray-50 min-h-screen overflow-y-auto">
>>>>>>> 898741a66c499d61e0d218f0af633c02a978dd4a
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