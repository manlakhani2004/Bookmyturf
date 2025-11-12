import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  ChevronUp,
  ChevronDown,
  MapPin,
  Calendar,
  Star,
} from "lucide-react";
import { useSelector } from "react-redux";

export default function FindSports() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sportsData, setSportsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  // Redux city data
  const { city } = useSelector((state) => state.city);

  // Filters
  const [filters, setFilters] = useState({
    city: city || "Surat",
    categories: [],
    slots: [],
    minPrice: 300,
    maxPrice: 2000,
  });

  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    slots: true,
    price: true,
  });

  const slots = ["Morning", "Afternoon", "Evening"];

  // ✅ Fetch categories dynamically based on city
 const fetchCategories = async () => {
  try {
    setLoadingCategories(true);
    const response = await fetch(
      `http://localhost:8080/api/locations/sports/by-city?city=${city}`
    );
    const data = await response.json();

    if (data.Status === "OK" && Array.isArray(data.Data)) {
      // ✅ Use correct property name
      setCategories(data.Data.map((cat) => cat.name));
    } else {
      console.error("Invalid category data", data);
      setCategories([]);
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    setCategories([]);
  } finally {
    setLoadingCategories(false);
  }
};


  useEffect(() => {
    if (city) {
      fetchCategories();
    }
  }, [city]);

  // ✅ Fetch sports data based on filters
  const fetchSportsData = async () => {
    setLoading(true);
    try {
      const payload = {
        city: filters.city,
        ...(filters.categories.length > 0 && { categories: filters.categories }),
        ...(filters.slots.length > 0 && { slots: filters.slots }),
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
      };

      console.log("Filter Payload:", payload);

      const response = await fetch("http://localhost:8080/api/search/filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resJson = await response.json();
      if (resJson.Status === "OK" && Array.isArray(resJson.Data)) {
        setSportsData(resJson.Data);
      } else {
        setSportsData([]);
      }
    } catch (error) {
      console.error("Error fetching sports data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handlers
  const handleCategoryChange = (category) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handleSlotChange = (slot) => {
    setFilters((prev) => ({
      ...prev,
      slots: prev.slots.includes(slot)
        ? prev.slots.filter((s) => s !== slot)
        : [...prev.slots, slot],
    }));
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const applyFilters = () => {
    fetchSportsData();
  };

  const clearFilters = () => {
    setFilters({
      city,
      categories: [],
      slots: [],
      minPrice: 300,
      maxPrice: 2000,
    });
  };

  // Auto fetch when search changes
  useEffect(() => {
    fetchSportsData();
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* 🔍 Search Bar */}
      <div className="sticky top-0 z-40 bg-gray-900/95 backdrop-blur-xl border-b border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden bg-white/5 border border-white/10 text-white p-3 rounded-xl hover:bg-white/10 transition-all"
            >
              <Filter className="w-5 h-5" />
            </button>

            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={`Search sports venues in ${city}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-400 pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
              />
            </div>

            <div className="hidden md:flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
              <span className="text-emerald-400 font-semibold">{sportsData.length}</span>
              <span className="text-gray-400 text-sm">venues</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-6">
        {/* 🧩 Filters Sidebar */}
        <div className={`w-80 flex-shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}>
          <div className="sticky top-24 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-emerald-400" />
                <h2 className="text-xl font-bold text-white">Filters</h2>
              </div>
              <button onClick={clearFilters} className="text-gray-400 hover:text-white text-sm">
                Clear All
              </button>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection("categories")}
                className="w-full flex items-center justify-between mb-3"
              >
                <h3 className="text-white font-semibold">Sport Categories</h3>
                {expandedSections.categories ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </button>
              {expandedSections.categories && (
                <div className="space-y-3">
                  {loadingCategories ? (
                    <p className="text-gray-400 text-sm">Loading categories...</p>
                  ) : categories.length > 0 ? (
                    categories.map((category) => (
                      <label key={category} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.categories.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                          className="w-5 h-5 rounded border-gray-600 bg-white/5 text-emerald-500 focus:ring-2 focus:ring-emerald-500/50 cursor-pointer"
                        />
                        <span className="text-gray-300 group-hover:text-white transition-colors">
                          {category}
                        </span>
                      </label>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No categories found</p>
                  )}
                </div>
              )}
            </div>

            {/* Slots */}
            <div className="border-t border-white/10 my-6"></div>
            <div className="mb-6">
              <button
                onClick={() => toggleSection("slots")}
                className="w-full flex items-center justify-between mb-3"
              >
                <h3 className="text-white font-semibold">Time Slots</h3>
                {expandedSections.slots ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </button>
              {expandedSections.slots && (
                <div className="space-y-3">
                  {slots.map((slot) => (
                    <label key={slot} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={filters.slots.includes(slot)}
                        onChange={() => handleSlotChange(slot)}
                        className="w-5 h-5 rounded border-gray-600 bg-white/5 text-emerald-500 focus:ring-2 focus:ring-emerald-500/50 cursor-pointer"
                      />
                      <span className="text-gray-300 group-hover:text-white transition-colors">
                        {slot}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Price Filter */}
            <div className="border-t border-white/10 my-6"></div>
            <div className="mb-6">
              <button
                onClick={() => toggleSection("price")}
                className="w-full flex items-center justify-between mb-3"
              >
                <h3 className="text-white font-semibold">Price Range</h3>
                {expandedSections.price ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </button>
              {expandedSections.price && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      value={filters.minPrice}
                      onChange={(e) =>
                        setFilters({ ...filters, minPrice: Number(e.target.value) })
                      }
                      className="w-1/2 bg-white/5 border border-white/10 text-white px-3 py-2 rounded-lg"
                    />
                    <input
                      type="number"
                      value={filters.maxPrice}
                      onChange={(e) =>
                        setFilters({ ...filters, maxPrice: Number(e.target.value) })
                      }
                      className="w-1/2 bg-white/5 border border-white/10 text-white px-3 py-2 rounded-lg"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Apply */}
            <button
              onClick={applyFilters}
              className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-semibold py-3 rounded-xl transition-all duration-300"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* 🎯 Sports Grid */}
        <div className="flex-1 min-w-0">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : sportsData.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              No venues found for selected filters
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
              {sportsData.map((sport) => (
                <div
                  key={sport.id}
                  className="group bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 p-[2px] rounded-2xl hover:from-emerald-500/20 hover:to-cyan-500/20 transition-all"
                >
                  <div className="bg-gray-900 rounded-2xl overflow-hidden">
                    <div className="relative h-48">
                      {sport.mediaFiles?.length > 0 ? (
                        <img
                          src={sport.mediaFiles[0].base64Data}
                          alt={sport.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl">
                          ⚽
                        </div>
                      )}
                      <div className="absolute top-3 right-3 bg-black/60 rounded-full px-3 py-1 flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-white text-sm">4.8</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {sport.name}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <MapPin className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm">{sport.locationName}</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {sport.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="text-white font-semibold text-lg">
                          Starts From ₹{sport.minimumPrice}
                        </p>
                        <button className="bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-2 rounded-lg text-white font-semibold flex items-center gap-2">
                          <Calendar className="w-4 h-4" /> Book
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
