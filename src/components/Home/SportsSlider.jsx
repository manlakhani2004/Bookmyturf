import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SportsSlider = () => {
  const { city, data } = useSelector((state) => state.city);
  const scrollRef = useRef(null);

  // ✅ Define default sports (for first load / fallback)
  const defaultSports = [
    {
      name: "Cricket",
      icon: "🏏",
      gradient: "from-emerald-400 via-teal-500 to-cyan-500",
      shadow: "shadow-emerald-500/50",
      glow: "group-hover:shadow-emerald-500/60",
    },
    {
      name: "Football",
      icon: "⚽",
      gradient: "from-blue-400 via-indigo-500 to-purple-500",
      shadow: "shadow-blue-500/50",
      glow: "group-hover:shadow-blue-500/60",
    },
    {
      name: "PickleBall",
      icon: "🎾",
      gradient: "from-amber-400 via-orange-500 to-red-500",
      shadow: "shadow-orange-500/50",
      glow: "group-hover:shadow-orange-500/60",
    },
    {
      name: "8 Ball",
      icon: "🎱",
      gradient: "from-purple-400 via-pink-500 to-rose-500",
      shadow: "shadow-purple-500/50",
      glow: "group-hover:shadow-purple-500/60",
    },
    {
      name: "Snooker",
      icon: "🎯",
      gradient: "from-red-400 via-rose-500 to-pink-500",
      shadow: "shadow-red-500/50",
      glow: "group-hover:shadow-red-500/60",
    },
  ];

  // ✅ Use Redux data (API response) if available, else default
  const sports =
    data && data.length > 0
      ? data.map((item, i) => ({
          name: item.sportName || item.name || "Unknown Sport",
          icon:
            item.sportName?.toLowerCase().includes("cricket")
              ? "🏏"
              : item.sportName?.toLowerCase().includes("football")
              ? "⚽"
              : item.sportName?.toLowerCase().includes("pickle")
              ? "🎾"
              : item.sportName?.toLowerCase().includes("snooker")
              ? "🎯"
              : "🎮",
          gradient:
            i % 2 === 0
              ? "from-emerald-400 via-teal-500 to-cyan-500"
              : "from-blue-400 via-indigo-500 to-purple-500",
          shadow: "shadow-emerald-500/50",
          glow: "group-hover:shadow-emerald-500/60",
        }))
      : defaultSports;

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = 300;
    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full mt-8">
      {/* Title */}
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        {city ? `Sports in ${city}` : "Popular Sports"}
      </h2>

      {/* Scroll Buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700 p-2 rounded-full z-10"
      >
        <ChevronLeft className="text-white" />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700 p-2 rounded-full z-10"
      >
        <ChevronRight className="text-white" />
      </button>

      {/* Sports Grid - 2 items per row with 75% width and increased height */}
      <div
        ref={scrollRef}
        className="grid grid-cols-2 gap-6 px-8 py-4 overflow-x-auto scroll-smooth"
      >
        {/* http://localhost:8080/api/locations/sports/by-city-category */}
        {/* http://localhost:8080/api/locations/sports/by-city-category?city=Ahmedabad&categoryName=Football */}
        {sports.map((sport, index) => (
          <Link to={`/sports/by-city-category?city=${city}&categoryName=${sport.name}`} key={index} className="flex justify-center">
            <motion.div
              className={`w-3/4 cursor-pointer group p-10 rounded-2xl bg-gradient-to-br ${sport.gradient} shadow-lg ${sport.shadow} hover:scale-105 transition-transform duration-300 text-center h-52`}
              whileHover={{ y: -5 }}
            >
              <div className="text-6xl mb-4">{sport.icon}</div>
              <h3 className="text-white font-semibold text-xl">{sport.name}</h3>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SportsSlider;