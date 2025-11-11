import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function SportsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const {city,data} = useSelector((state)=>state.city);
  console.log(city,data);
  const sports = [
    { 
      name: 'Cricket', 
      icon: '🏏',
      gradient: 'from-emerald-400 via-teal-500 to-cyan-500',
      shadow: 'shadow-emerald-500/50',
      glow: 'group-hover:shadow-emerald-500/60'
    },
    { 
      name: 'Football', 
      icon: '⚽',
      gradient: 'from-blue-400 via-indigo-500 to-purple-500',
      shadow: 'shadow-blue-500/50',
      glow: 'group-hover:shadow-blue-500/60'
    },
    { 
      name: 'PickleBall', 
      icon: '🎾',
      gradient: 'from-amber-400 via-orange-500 to-red-500',
      shadow: 'shadow-orange-500/50',
      glow: 'group-hover:shadow-orange-500/60'
    },
    { 
      name: '8 Ball', 
      icon: '🎱',
      gradient: 'from-purple-400 via-pink-500 to-rose-500',
      shadow: 'shadow-purple-500/50',
      glow: 'group-hover:shadow-purple-500/60'
    },
    { 
      name: 'Snooker', 
      icon: '🎯',
      gradient: 'from-red-400 via-rose-500 to-pink-500',
      shadow: 'shadow-red-500/50',
      glow: 'group-hover:shadow-red-500/60'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= sports.length - 2 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? sports.length - 2 : prevIndex - 1
    );
  };

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="w-full max-w-5xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Choose Your Sport
            </h1>
            <Sparkles className="w-6 h-6 text-pink-400 animate-pulse" />
          </div>
          <p className="text-gray-400 text-lg">Discover your passion, book your game</p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 md:-left-20 top-1/2 -translate-y-1/2 z-20 bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 text-white p-4 rounded-2xl transition-all duration-300 hover:scale-110 hover:border-cyan-400/50 shadow-xl group"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 group-hover:text-cyan-400 transition-colors" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 md:-right-20 top-1/2 -translate-y-1/2 z-20 bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 text-white p-4 rounded-2xl transition-all duration-300 hover:scale-110 hover:border-cyan-400/50 shadow-xl group"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 group-hover:text-cyan-400 transition-colors" />
          </button>

          {/* Slider Container */}
          <div className="overflow-hidden rounded-3xl">
            <div className="flex gap-6">
              {sports.slice(currentIndex, currentIndex + 2).map((sport, index) => (
                <div
                  key={currentIndex + index}
                  className="w-1/2 flex-shrink-0"
                >
                  <div className={`group cursor-pointer h-full`}>
                    {/* Modern Glass Card */}
                    <div className={`relative h-80 rounded-3xl overflow-hidden bg-gradient-to-br ${sport.gradient} p-[2px] transition-all duration-500 hover:scale-105 ${sport.shadow} hover:shadow-2xl ${sport.glow}`}>
                      {/* Inner Content */}
                      <div className="h-full rounded-3xl bg-slate-900/90 backdrop-blur-xl flex flex-col items-center justify-center relative overflow-hidden">
                        {/* Animated Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
                          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-transparent to-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                        </div>
                        
                        {/* Icon Container */}
                        <div className="relative z-10 mb-6 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                          <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${sport.gradient} flex items-center justify-center shadow-2xl ${sport.shadow}`}>
                            <span className="text-7xl filter drop-shadow-2xl">
                              {sport.icon}
                            </span>
                          </div>
                        </div>
                        
                        {/* Sport Name */}
                        <h3 className={`text-3xl font-black bg-gradient-to-r ${sport.gradient} bg-clip-text text-transparent mb-2 relative z-10`}>
                          {sport.name}
                        </h3>
                        
                        {/* Action Button */}
                        {/* <button className={`mt-4 px-8 py-3 rounded-xl bg-gradient-to-r ${sport.gradient} text-white font-bold transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${sport.shadow} relative z-10 opacity-0 group-hover:opacity-100`}>
                          Book Now
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-10 flex justify-center items-center gap-3">
            {Array.from({ length: sports.length - 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="group relative"
                aria-label={`Go to slide ${index + 1}`}
              >
                <div className={`h-2 rounded-full transition-all duration-500 ${
                  index === currentIndex
                    ? 'w-16 bg-gradient-to-r from-cyan-400 to-purple-400'
                    : 'w-8 bg-white/20 group-hover:bg-white/40'
                }`}></div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}