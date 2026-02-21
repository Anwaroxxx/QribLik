import { useState } from "react";
import Sidebar from "../components/sidebar";
import MainFeed from "../components/Feed";

function Home() {
  const [activeView, setActiveView] = useState("feed");
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
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