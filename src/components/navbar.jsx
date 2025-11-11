import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin, Calendar, User, LogIn, UserPlus, ChevronDown, BookOpen, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Logout } from '../services/operations/auth';
import { setCityData, updateCity } from '../slices/city';



// Mock Link component for demo - replace with your actual router Link
const Link = ({ to, children, className, title, ...props }) => (
  <a href={to} className={className} title={title} {...props}>
    {children}
  </a>
);

function NavbarWithDropdown() {
  const dispatch = useDispatch();
  const { city, data } = useSelector((state) => state.city);
  const [selectedCity, setSelectedCity] = useState(city);
  const cities = ["Ahmedabad", "Gandhinagar", "Surat"];

  // ✅ Change selected city and update Redux
  const handleChange = (e) => {
    const newCity = e.target.value;
    setSelectedCity(newCity);
    if (newCity !== city) {
      dispatch(updateCity(newCity)); // only update if changed
    }
  };

  // ✅ Fetch data only when `city` actually changes
function NavbarWithDropdown() {
  const dispatch = useDispatch();
  const { city, data } = useSelector((state) => state.city);
  const [selectedCity, setSelectedCity] = useState(city);

  // ✅ Keep track of last fetched city (prevents re-fetch loops)
  const lastFetchedCity = useRef(null);

  const cities = ["Ahmedabad", "Gandhinagar", "Surat"];

  const handleChange = (e) => {
    const newCity = e.target.value;
    setSelectedCity(newCity);
    if (newCity !== city) {
      dispatch(updateCity(newCity));
    }
  };

  useEffect(() => {
    // ✅ Only fetch if city actually changed
    if (!city || lastFetchedCity.current === city) return;

    lastFetchedCity.current = city;

    const fetchCityData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/locations/sports/by-city?city=${city}`
        );
        const responseJson = await response.json();
        console.log("response",responseJson);
        const cityData = responseJson.data || [];

        // ✅ Only update Redux if array actually contains items or differs
        if (JSON.stringify(data) !== JSON.stringify(cityData)) {
          dispatch(setCityData(cityData));
        }

        console.log("Fetched once for:", city);
      } catch (error) {
        console.error("Error fetching city data:", error);
      }
    };

    fetchCityData();
  }, [city]); // only re-run when city changes

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <MapPin className="h-4 w-4 text-emerald-400" />
        <select
          value={selectedCity}
          onChange={handleChange}
          className="relative text-gray-300 hover:text-white bg-transparent border border-gray-700 hover:border-gray-600 px-4 py-2 pr-10 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 group"
        >
          {cities.map((cityName, index) => (
            <option key={index} value={cityName} className="bg-gray-800 text-gray-300">
              {cityName}
            </option>
          ))}
        </select>
        <ChevronDown className="h-4 w-4 text-gray-400 absolute right-3 pointer-events-none" />
      </div>
    </div>
  );
}
  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <MapPin className="h-4 w-4 text-emerald-400" />
        <select
          value={selectedCity}
          onChange={handleChange}
          className="relative text-gray-300 hover:text-white bg-transparent border border-gray-700 hover:border-gray-600 px-4 py-2 pr-10 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 group"
        >
          {cities.map((cityName, index) => (
            <option key={index} value={cityName} className="bg-gray-800 text-gray-300">
              {cityName}
            </option>
          ))}
        </select>
        <ChevronDown className="h-4 w-4 text-gray-400 absolute right-3 pointer-events-none" />
      </div>
    </div>
  );
}







// Profile Dropdown Component
const ProfileDropDown = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-300 hover:text-white p-2 rounded-xl transition-all duration-300 group"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">
            {user?.firstName?.charAt(0) || user?.name?.charAt(0) || 'U'}
          </span>
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-800/95 backdrop-blur-xl border border-gray-700 rounded-xl shadow-xl z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">
                  {user?.firstName?.charAt(0) || user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <p className="text-white font-medium text-sm">
                  {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : user?.name || 'User'}
                </p>
                <p className="text-gray-400 text-xs">{user?.email}</p>
              </div>
            </div>
          </div>
        
          {/* Menu Items */}
          <div className="py-2">
            <Link
              to="/profile"
              className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              <User className="h-4 w-4 mr-3" />
              My Profile
            </Link>
            
            <Link
              to="/my-bookings"
              className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              <BookOpen className="h-4 w-4 mr-3" />
              My Bookings
            </Link>
            
            <button
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="w-full flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Redux selectors - same as your first navbar
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
     dispatch(Logout(navigate));
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
      scrolled 
        ? 'bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-gray-800' 
        : 'bg-gray-900/90 backdrop-blur-lg shadow-lg'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center group">
              <div className="relative">
                <MapPin className="h-8 w-8 text-emerald-400 mr-3 transition-all duration-300 group-hover:text-emerald-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-md group-hover:bg-emerald-300/30 transition-all duration-300"></div>
              </div>
              <span className="text-white text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent hover:from-emerald-300 hover:to-cyan-300 transition-all duration-300">
                BookMyTurf
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              <Link 
                to="/" 
                className="relative text-gray-300 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group overflow-hidden"
              >
                <span className="relative z-10">Home</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/20 group-hover:to-cyan-500/20 rounded-xl transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
              
              <Link 
                to="/turfs" 
                className="relative text-gray-300 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group overflow-hidden"
              >
                <span className="relative z-10">Find Turfs</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/20 group-hover:to-cyan-500/20 rounded-xl transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
              
              {/* Only show My Bookings if user is logged in */}
              {token && (
                <Link 
                  to="/bookings" 
                  className="relative text-gray-300 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group overflow-hidden flex items-center"
                >
                  <Calendar className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                  <span className="relative z-10">My Bookings</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/20 group-hover:to-cyan-500/20 rounded-xl transition-all duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 group-hover:w-full transition-all duration-300"></div>
                </Link>
              )}
              
              <Link 
                to="/about" 
                className="relative text-gray-300 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group overflow-hidden"
              >
                <span className="relative z-10">About</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/20 group-hover:to-cyan-500/20 rounded-xl transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
              
              <Link 
                to="/contact" 
                className="relative text-gray-300 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group overflow-hidden"
              >
                <span className="relative z-10">Contact</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/20 group-hover:to-cyan-500/20 rounded-xl transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 group-hover:w-full transition-all duration-300"></div>
              </Link>

              <NavbarWithDropdown/>
                            

            </div>
          </div>

          {/* User Actions */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-3">
              {token !== null ? (
                <ProfileDropDown user={user} onLogout={handleLogout} />
              ) : (
                <>
                  <Link
                    to="/login"
                    className="relative text-gray-300 hover:text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center border border-gray-700 hover:border-gray-600 group overflow-hidden"
                  >
                    <LogIn className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                    <span className="relative z-10">Login</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-800/0 to-gray-700/0 group-hover:from-gray-800/50 group-hover:to-gray-700/50 transition-all duration-300"></div>
                  </Link>
                  
                  <Link
                    to="/signup"
                    className="relative bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center group overflow-hidden shadow-lg hover:shadow-emerald-500/25"
                  >
                    <UserPlus className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                    <span className="relative z-10">Sign Up</span>
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="relative text-gray-300 hover:text-white p-2 rounded-xl transition-all duration-300 group"
              aria-label="Toggle menu"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/20 group-hover:to-cyan-500/20 rounded-xl transition-all duration-300"></div>
              {isOpen ? (
                <X className="h-6 w-6 relative z-10 transition-transform duration-300 group-hover:scale-110" />
              ) : (
                <Menu className="h-6 w-6 relative z-10 transition-transform duration-300 group-hover:scale-110" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-4 pt-2 pb-4 space-y-2 bg-gray-800/95 backdrop-blur-xl border-t border-gray-700">
          <Link 
            to="/" 
            className="text-gray-300 hover:text-white hover:bg-gray-700/50 block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300"
          >
            Home
          </Link>
          <Link 
            to="/turfs" 
            className="text-gray-300 hover:text-white hover:bg-gray-700/50 block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300"
          >
            Find Turfs
          </Link>
          
          {/* Only show My Bookings in mobile if user is logged in */}
          {token && (
            <Link 
              to="/bookings" 
              className="text-gray-300 hover:text-white hover:bg-gray-700/50 block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 flex items-center"
            >
              <Calendar className="h-4 w-4 mr-3" />
              My Bookings
            </Link>
          )}
          
          <Link 
            to="/about" 
            className="text-gray-300 hover:text-white hover:bg-gray-700/50 block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300"
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className="text-gray-300 hover:text-white hover:bg-gray-700/50 block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300"
          >
            Contact
          </Link>
          
          <div className="border-t border-gray-700 pt-4 mt-4">
            {token !== null ? (
              <div className="px-2 space-y-2">
                {/* User Info in Mobile */}
                <div className="flex items-center space-x-3 px-4 py-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user?.firstName?.charAt(0) || user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">
                      {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : user?.name || 'User'}
                    </p>
                    <p className="text-gray-400 text-xs">{user?.email}</p>
                  </div>
                </div>
                
                <Link
                  to="/profile"
                  className="text-gray-300 hover:text-white hover:bg-gray-700/50 flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-300"
                >
                  <User className="h-4 w-4 mr-3" />
                  My Profile
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="w-full text-gray-300 hover:text-white hover:bg-gray-700/50 flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-300"
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-3 px-2">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white hover:bg-gray-700/50 flex items-center justify-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 border border-gray-600"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white flex items-center justify-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 shadow-lg"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;