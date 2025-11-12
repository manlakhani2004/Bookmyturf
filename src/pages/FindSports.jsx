import { useState, useEffect } from 'react';
import { Search, Filter, X, MapPin, Calendar, Star, ChevronDown, ChevronUp } from 'lucide-react';

export default function FindSports() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sportsData, setSportsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  
  // Filter states
  const [filters, setFilters] = useState({
    city: 'Surat',
    categories: [],
    slots: [],
    minPrice: 300,
    maxPrice: 2000
  });

  // Expand/collapse states for filter sections
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    slots: true,
    price: true
  });

  const categories = ['Cricket', 'Football', 'PickleBall', '8 Ball', 'Snooker'];
  const slots = ['Morning', 'Afternoon', 'Evening'];

  // Handle category checkbox change
  const handleCategoryChange = (category) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  // Handle slot checkbox change
  const handleSlotChange = (slot) => {
    setFilters(prev => ({
      ...prev,
      slots: prev.slots.includes(slot)
        ? prev.slots.filter(s => s !== slot)
        : [...prev.slots, slot]
    }));
  };

  // Toggle section expand/collapse
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Fetch sports data based on filters
  const fetchSportsData = async () => {
    setLoading(true);
    try {
      // Prepare payload - only send non-empty arrays
      const payload = {
        city: filters.city,
        ...(filters.categories.length > 0 && { categories: filters.categories }),
        ...(filters.slots.length > 0 && { slots: filters.slots }),
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice
      };

      console.log('API Payload:', payload);

      // Replace with actual API call:
      // const response = await fetch('http://localhost:8080/api/sports/filter', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload)
      // });
      // const data = await response.json();
      // setSportsData(data.Data);

      // Mock data for demonstration
      const mockData = [
        {
          id: 4,
          name: 'Football Turf A',
          description: 'Premium 7-a-side football ground with night lighting.',
          categoryId: 2,
          categoryName: 'Football',
          locationId: 5,
          locationName: 'Turf Sports Ahmedabad',
          price: 800,
          mediaFiles: [{
            fileType: 'image',
            path: 'uploads\\sports-media\\img_0edaf945-ade0-4526-b10f-d98c40364e62.jpg'
          }]
        },
        {
          id: 5,
          name: 'Cricket Ground Elite',
          description: 'Professional cricket ground with modern facilities and coaching.',
          categoryId: 1,
          categoryName: 'Cricket',
          locationId: 3,
          locationName: 'Elite Sports Complex',
          price: 1200,
          mediaFiles: [{
            fileType: 'image',
            path: 'uploads\\sports-media\\cricket.jpg'
          }]
        },
        {
          id: 6,
          name: 'PickleBall Court Pro',
          description: 'Indoor PickleBall court with climate control.',
          categoryId: 3,
          categoryName: 'PickleBall',
          locationId: 4,
          locationName: 'Pro Sports Arena',
          price: 600,
          mediaFiles: [{
            fileType: 'image',
            path: 'uploads\\sports-media\\pickleball.jpg'
          }]
        }
      ];

      // Filter based on search query
      const filtered = mockData.filter(sport =>
        sport.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sport.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sport.locationName.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setSportsData(filtered);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters
  const applyFilters = () => {
    fetchSportsData();
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      city: 'Surat',
      categories: [],
      slots: [],
      minPrice: 300,
      maxPrice: 2000
    });
  };

  // Initial load
  useEffect(() => {
    fetchSportsData();
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Top Search Bar */}
      <div className="sticky top-0 z-40 bg-gray-900/95 backdrop-blur-xl border-b border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden bg-white/5 border border-white/10 text-white p-3 rounded-xl hover:bg-white/10 transition-all"
            >
              <Filter className="w-5 h-5" />
            </button>

            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search sports venues, categories, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-400 pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
              />
            </div>

            {/* Results Count */}
            <div className="hidden md:flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
              <span className="text-emerald-400 font-semibold">{sportsData.length}</span>
              <span className="text-gray-400 text-sm">venues</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Left Sidebar - Filters */}
          <div className={`w-80 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
                {/* Filter Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-emerald-400" />
                    <h2 className="text-xl font-bold text-white">Filters</h2>
                  </div>
                  <button
                    onClick={clearFilters}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                {/* Categories Filter */}
                <div className="mb-6">
                  <button
                    onClick={() => toggleSection('categories')}
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
                      {categories.map((category) => (
                        <label
                          key={category}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
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
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t border-white/10 my-6"></div>

                {/* Slots Filter */}
                <div className="mb-6">
                  <button
                    onClick={() => toggleSection('slots')}
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
                        <label
                          key={slot}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
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

                <div className="border-t border-white/10 my-6"></div>

                {/* Price Range Filter */}
                <div className="mb-6">
                  <button
                    onClick={() => toggleSection('price')}
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
                        <div className="flex-1">
                          <label className="text-gray-400 text-sm mb-1 block">Min</label>
                          <input
                            type="number"
                            value={filters.minPrice}
                            onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
                            className="w-full bg-white/5 border border-white/10 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="text-gray-400 text-sm mb-1 block">Max</label>
                          <input
                            type="number"
                            value={filters.maxPrice}
                            onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                            className="w-full bg-white/5 border border-white/10 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">₹{filters.minPrice}</span>
                        <span className="text-gray-400">₹{filters.maxPrice}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Apply Filters Button */}
                <button
                  onClick={applyFilters}
                  className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Right Content - Sports Grid */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-400 text-lg">Loading venues...</p>
                </div>
              </div>
            ) : sportsData.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-gray-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-400 mb-2">No venues found</h3>
                <p className="text-gray-500">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <div>
                {/* Results Header */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Available Sports Venues
                  </h2>
                  <p className="text-gray-400">
                    Showing {sportsData.length} results {filters.categories.length > 0 && `for ${filters.categories.join(', ')}`}
                  </p>
                </div>

                {/* Sports Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                {sportsData.map((sport) => (
                  <div
                    key={sport.id}
                    className="group relative bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-2xl p-[2px] hover:from-emerald-500/20 hover:to-cyan-500/20 transition-all duration-500"
                  >
                    <div className="h-full bg-gray-900/95 backdrop-blur-xl rounded-2xl overflow-hidden">
                      {/* Image */}
                      <div className="relative h-48 bg-gradient-to-br from-emerald-900/30 to-cyan-900/30 overflow-hidden">
                        {sport.mediaFiles && sport.mediaFiles.length > 0 ? (
                          <img
                            src={`http://localhost:8080/${sport.mediaFiles[0].path.replace(/\\/g, '/')}`}
                            alt={sport.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-5xl">⚽</span>
                          </div>
                        )}
                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-white text-sm font-semibold">4.8</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="inline-block bg-emerald-500/20 border border-emerald-500/30 rounded-full px-3 py-1 mb-2">
                          <span className="text-emerald-400 text-xs font-semibold">{sport.categoryName}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-cyan-400 transition-all">
                          {sport.name}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-400 mb-3">
                          <MapPin className="w-4 h-4 text-emerald-400" />
                          <span className="text-sm">{sport.locationName}</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                          {sport.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-400 text-xs">Starting from</p>
                            <p className="text-2xl font-bold text-white">₹{sport.price}</p>
                          </div>
                          <button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Book
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}