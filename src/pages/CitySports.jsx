import { useState, useEffect } from 'react';
import { MapPin, Calendar, Star, Clock, ArrowRight } from 'lucide-react';
 import { Link, useSearchParams } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function CitySports() {
  const [sportsData, setSportsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {city:cityredx } = useSelector((state)=>state.city);
//   const [city, setCity] = useState('Ahmedabad');
//   const [categoryName, setCategoryName] = useState('Football');

    const [searchParams] = useSearchParams();
     
    const city = searchParams.get("city");
    const categoryName = searchParams.get("categoryName");


  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Simulating API call with mock data
        // const mockResponse = {
        //   "Status": "OK",
        //   "Message": "Sports fetched successfully for city: Ahmedabad and category: Football",
        //   "statusCode": 200,
        //   "Data": [
        //     {
        //       "id": 4,
        //       "name": "Football Turf A",
        //       "description": "Premium 7-a-side football ground with night lighting.",
        //       "categoryId": 2,
        //       "categoryName": "Football",
        //       "locationId": 5,
        //       "locationName": "Turf Sports Ahmedabad",
        //       "mediaFiles": [
        //         {
        //           "fileType": "image",
        //           "path": "uploads\\sports-media\\img_0edaf945-ade0-4526-b10f-d98c40364e62.jpg"
        //         }
        //       ]
        //     },
        //     {
        //       "id": 5,
        //       "name": "Football Turf B",
        //       "description": "State-of-the-art 11-a-side football ground with professional facilities.",
        //       "categoryId": 2,
        //       "categoryName": "Football",
        //       "locationId": 5,
        //       "locationName": "Premier Sports Complex",
        //       "mediaFiles": [
        //         {
        //           "fileType": "image",
        //           "path": "uploads\\sports-media\\img_example.jpg"
        //         }
        //       ]
        //     }
        //   ]
        // };
        
        // Replace with actual API call:
        const response = await fetch(`http://localhost:8080/api/locations/sports/by-city-category?city=${cityredx}&categoryName=${categoryName}`);
        const responseJson = await response.json();
        
        // setSportsData(mockResponse.Data);
        setSportsData(responseJson.Data);
        console.log(responseJson);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }
    fetchData();
  }, [city, categoryName,cityredx]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Loading sports venues...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-6 py-2 mb-4">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-medium">{cityredx}</span>
          </div>
          <h1 className="text-5xl font-black bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
            {categoryName} Venues
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover and book the best {categoryName.toLowerCase()} turfs in {cityredx}
          </p>
        </div>

        {/* Stats Bar */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-6 py-4">
            <p className="text-gray-400 text-sm mb-1">Available Venues</p>
            <p className="text-2xl font-bold text-white">{sportsData.length}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-6 py-4">
            <p className="text-gray-400 text-sm mb-1">Category</p>
            <p className="text-2xl font-bold text-emerald-400">{categoryName}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-6 py-4">
            <p className="text-gray-400 text-sm mb-1">Average Rating</p>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <p className="text-2xl font-bold text-white">4.8</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sports Venues Grid */}
      <div className="max-w-7xl mx-auto">
        {sportsData.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No venues found</h3>
            <p className="text-gray-500">Try searching for a different city or sport</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sportsData.map((sport) => (
              <Link to={`/turfdetails/${sport?.id}`}>
              <div
                key={sport.id}
                className="group relative bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-3xl p-[2px] hover:from-emerald-500/20 hover:to-cyan-500/20 transition-all duration-500"
              >
                <div className="h-full bg-gray-900/95 backdrop-blur-xl rounded-3xl overflow-hidden">
                  {/* Image Section */}
                  <div className="relative h-56 bg-gradient-to-br from-emerald-900/30 to-cyan-900/30 overflow-hidden">
                    {sport.mediaFiles && sport.mediaFiles.length > 0 ? (
                      <img
                        src={sport.mediaFiles[0].base64Data}
                        alt={sport.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-6xl">⚽</span>
                      </div>
                    )}
                    
                    {/* Overlay Badge */}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-white font-semibold">4.8</span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    {/* Category Badge */}
                    <div className="inline-block bg-emerald-500/20 border border-emerald-500/30 rounded-full px-3 py-1 mb-3">
                      <span className="text-emerald-400 text-xs font-semibold">{sport.categoryName}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-cyan-400 transition-all duration-300">
                      {sport.name}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-gray-400 mb-4">
                      <MapPin className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm">{sport.locationName}</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                      {sport.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center gap-2 group">
                        <Calendar className="w-4 h-4" />
                        <span>Book Now</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}



// import React, { useEffect } from "react";
// import { useSearchParams } from "react-router-dom";

// function CitySports()
// {
//      const [searchParams] = useSearchParams();
     
//   const city = searchParams.get("city");
//   const categoryName = searchParams.get("categoryName");

//     useEffect(()=>{
//         async function fetchdata() {
//             const response = await fetch(`http://localhost:8080/api/locations/sports/by-city-category?city=${city}&categoryName=${categoryName}`)
//         //    const response = await fetch("http://localhost:8080/api/locations/sports/by-city-category?city=Ahmedabad&categoryName=Football");
//             const responseJson = await response.json();
//             console.log(responseJson);
//         }
//         fetchdata();
//     },[])
//     return(
//         <div>
//             city info
//         </div>
//     )

// }

// export default CitySports;