import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';

const TurfDetails = () => {
  // For demo purposes, using ID from URL or default to 5
  const {id} = useParams();

 
  const [turfData, setTurfData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedDays, setExpandedDays] = useState({});
  const [maxPrice, setMaxPrice] = useState(1000);
  const [priceFilter, setPriceFilter] = useState(1000);

  useEffect(() => {
    fetchTurfDetails();
  }, [id]);

  const fetchTurfDetails = async () => {
    try {
      setLoading(true);
      
      // Real API call - uncomment to use
    //   http://localhost:8080/api/locations/sports/5/details
    console.log(id);
      const response = await fetch(`http://localhost:8080/api/locations/sports/${id}/details`);
      const result = await response.json();
      console.log(result);
      if (result.Status === 'OK' && result.Data) {
        setTurfData(result.Data);
        const max = Math.max(...result.Data.slotTimings.map(s => s.price));
        setMaxPrice(max);
        setPriceFilter(max);
      } else {
        setError(result.Message || 'Failed to fetch turf details');
      }
      setLoading(false);
      
      
      // Static data for demo
    //   setTimeout(() => {
    //     const staticData = {
    //       id: 5,
    //       name: "Cricket Turf A",
    //       description: "Premium cricket turf with flood lights and changing rooms.",
    //       categoryName: "Cricket",
    //       locationName: "Ahmedabad Sports Arena",
    //       mediaFiles: [
    //         {
    //           fileType: "image",
    //           base64Data: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800"
    //         }
    //       ],
    //       slotTimings: [
    //         { dayOfWeek: "MONDAY", startTime: "06:00", endTime: "07:00", price: 500 },
    //         { dayOfWeek: "MONDAY", startTime: "07:00", endTime: "08:00", price: 600 },
    //         { dayOfWeek: "MONDAY", startTime: "18:00", endTime: "19:00", price: 750 },
    //         { dayOfWeek: "TUESDAY", startTime: "06:00", endTime: "07:00", price: 500 },
    //         { dayOfWeek: "TUESDAY", startTime: "19:00", endTime: "20:00", price: 800 },
    //         { dayOfWeek: "WEDNESDAY", startTime: "07:00", endTime: "08:00", price: 600 },
    //         { dayOfWeek: "WEDNESDAY", startTime: "18:00", endTime: "19:00", price: 750 },
    //         { dayOfWeek: "THURSDAY", startTime: "06:00", endTime: "07:00", price: 500 },
    //         { dayOfWeek: "FRIDAY", startTime: "17:00", endTime: "18:00", price: 700 },
    //         { dayOfWeek: "FRIDAY", startTime: "18:00", endTime: "19:00", price: 850 },
    //         { dayOfWeek: "SATURDAY", startTime: "08:00", endTime: "09:00", price: 900 },
    //         { dayOfWeek: "SATURDAY", startTime: "18:00", endTime: "19:00", price: 950 },
    //         { dayOfWeek: "SUNDAY", startTime: "07:00", endTime: "08:00", price: 850 },
    //         { dayOfWeek: "SUNDAY", startTime: "18:00", endTime: "19:00", price: 1000 }
    //       ]
    //     };
        
    //     setTurfData(staticData);
    //     const max = Math.max(...staticData.slotTimings.map(s => s.price));
    //     setMaxPrice(max);
    //     setPriceFilter(max);
    //     setLoading(false);
    //   }, 1000);
      
    } catch (err) {
      setError(err.message || 'Failed to fetch turf details');
      setLoading(false);
    }
  };

  const toggleDay = (day) => {
    setExpandedDays(prev => ({ ...prev, [day]: !prev[day] }));
  };

  const groupSlotsByDay = () => {
    if (!turfData?.slotTimings) return {};
    
    const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
    const grouped = {};
    
    days.forEach(day => {
      grouped[day] = turfData.slotTimings.filter(
        slot => slot.dayOfWeek === day && slot.price <= priceFilter
      );
    });
    
    return grouped;
  };

  const goBack = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error || !turfData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
        >
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-white mb-2">Oops!</h2>
          <p className="text-gray-400 mb-6">{error || 'No data found'}</p>
          <button
            onClick={goBack}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition shadow-lg shadow-emerald-500/20"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  const slotsByDay = groupSlotsByDay();
  
  // Handle both base64 and URL images
  const getImageUrl = () => {
    if (!turfData.mediaFiles?.[0]?.base64Data) {
      return 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800';
    }
    
    const imageData = turfData.mediaFiles[0].base64Data;
    
    // If it's already a complete data URL or regular URL, use it directly
    if (imageData.startsWith('data:') || imageData.startsWith('http')) {
      return imageData;
    }
    
    // If it's base64 without the data URL prefix, add it
    return `data:image/jpeg;base64,${imageData}`;
  };
  
  const imageUrl = getImageUrl();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={goBack}
          className="mb-6 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg shadow-lg hover:shadow-xl hover:bg-slate-700 transition flex items-center gap-2 text-gray-300 hover:text-emerald-400"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </motion.button>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl h-96 lg:h-full border border-slate-700">
              <img
                src={imageUrl}
                alt={turfData.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-emerald-500/30">
                <span className="text-emerald-400 font-semibold">{turfData.categoryName}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-8">
              <h1 className="text-4xl font-bold text-white mb-3">{turfData.name}</h1>
              <div className="flex items-center gap-2 text-gray-400 mb-4">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-medium">{turfData.locationName}</span>
              </div>
              <p className="text-gray-300 leading-relaxed">{turfData.description}</p>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Price Filter</h3>
                <span className="text-2xl font-bold text-emerald-400">₹{priceFilter}</span>
              </div>
              <input
                type="range"
                min="0"
                max={maxPrice}
                step="50"
                value={priceFilter}
                onChange={(e) => setPriceFilter(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>₹0</span>
                <span>₹{maxPrice}</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Available Slots</h2>
          <div className="space-y-4">
            {Object.entries(slotsByDay).map(([day, slots]) => (
              <motion.div
                key={day}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleDay(day)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-700 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-white capitalize">
                      {day.toLowerCase()}
                    </span>
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium border border-emerald-500/30">
                      {slots.length} slots
                    </span>
                  </div>
                  <motion.svg
                    animate={{ rotate: expandedDays[day] ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>

                <AnimatePresence>
                  {expandedDays[day] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-slate-700"
                    >
                      <div className="p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {slots.length > 0 ? (
                          slots.map((slot, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.05 }}
                              className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg p-4 border-2 border-emerald-500/30 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10 transition cursor-pointer group"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-200 font-semibold">
                                  {slot.startTime} - {slot.endTime}
                                </span>
                                <svg className="w-5 h-5 text-emerald-400 opacity-0 group-hover:opacity-100 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                              <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold text-emerald-400">₹{slot.price}</span>
                                <span className="text-sm text-gray-400">/hour</span>
                              </div>
                            </motion.div>
                          ))
                        ) : (
                          <p className="col-span-full text-gray-500 text-center py-4">
                            No slots available in this price range
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TurfDetails;