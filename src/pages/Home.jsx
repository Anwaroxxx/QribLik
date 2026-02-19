import { useState } from "react";
import Sidebar from "../components/sidebar";
import MainFeed from "../components/Feed";

function Home() {
  const [activeView, setActiveView] = useState("feed");
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <MainFeed
        activeView={activeView}
        onViewChange={setActiveView}
        activeCategory={activeCategory}
      />
    </div>
  );
}

export default Home;
