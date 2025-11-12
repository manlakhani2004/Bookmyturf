import React from 'react';
import { Edit, Trash2, Image } from 'lucide-react';
import { Link } from 'react-router-dom';
const LocationCard = ({ location, index }) => {
  return (
     <Link to={`/location/${location.id}`}>
    <div 
      className="bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 transform hover:scale-105 overflow-hidden group"
      style={{animationDelay: `${index * 100}ms`}}
    >
      {/* Image Section */}
      <div className="h-48 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 relative overflow-hidden">
        {location.mediaFiles?.length > 0 ? (
          <img 
            src={location.mediaFiles[0].base64Data}
            alt={location.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Image className="w-12 h-12 text-white/30 group-hover:text-white/50 transition-colors duration-300" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button className="p-2 bg-slate-800/80 backdrop-blur-sm rounded-lg hover:bg-emerald-500/80 text-white transition-all duration-300 hover:scale-110">
            <Edit className="w-4 h-4" />
          </button>
          <button className="p-2 bg-slate-800/80 backdrop-blur-sm rounded-lg hover:bg-red-500/80 text-white transition-all duration-300 hover:scale-110">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
          {location.name}
        </h3>
        <p className="text-slate-400 mb-4 line-clamp-2">
          {location.address}, {location.city}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">
            {location.sports?.length || 0} Sports Available
          </span>
          <span className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-300 px-3 py-1 rounded-full text-sm font-medium">
            {location.state}
          </span>
        </div>
      </div>
    </div>
   </Link>
  );
};

export default LocationCard;