import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, MapPin, Calendar, User, LogIn, UserPlus, ChevronDown, BookOpen, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Logout } from '../services/operations/auth';
import { setCityData, updateCity } from '../slices/city';

// Router Link (replace with actual if needed)
const Link = ({ to, children, className, title, ...props }) => (
  <a href={to} className={className} title={title} {...props}>
    {children}
  </a>
);

// ✅ City Dropdown Component
function NavbarWithDropdown() {
  const dispatch = useDispatch();
  const { city, data } = useSelector((state) => state.city);

  // Default city = Ahmedabad
  const [selectedCity, setSelectedCity] = useState(city || 'Ahmedabad');
  const lastFetchedCity = useRef(null);
  const cities = ['Ahmedabad', 'Gandhinagar', 'Surat'];

  const handleChange = (e) => {
    const newCity = e.target.value;
    setSelectedCity(newCity);
    if (newCity !== city) {
      dispatch(updateCity(newCity));
    }
  };

  // ✅ Fetch data when city changes
  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const currentCity = selectedCity;
        if (lastFetchedCity.current === currentCity) return;

        const response = await fetch(
          `http://localhost:8080/api/locations/sports/by-city?city=${currentCity}`
        );
        

        if (!response.ok) throw new Error('Failed to fetch city data');
        const responseJson = await response.json();
        const cityData = responseJson.Data || responseJson.data || [];

        dispatch(setCityData(cityData));
        dispatch(updateCity(currentCity));

        lastFetchedCity.current = currentCity;
        console.log('Fetched sports for:', currentCity);
      } catch (error) {
        console.error('Error fetching city data:', error);
      }
    };

    fetchCityData();
  }, [selectedCity, dispatch]);

  return (
    <div className="relative flex items-center space-x-2">
      <MapPin className="h-4 w-4 text-emerald-400" />
      <select
        value={selectedCity}
        onChange={handleChange}
        className="text-gray-300 hover:text-white bg-transparent border border-gray-700 hover:border-gray-600 px-4 py-2 pr-10 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
      >

        {cities.map((cityName, index) => (
    
          <option key={index} value={cityName} className="bg-gray-800 text-gray-300">
            {cityName}
          </option>
    
        ))}
      </select>
      <ChevronDown className="h-4 w-4 text-gray-400 absolute right-3 pointer-events-none" />
    </div>
  );
}

// ✅ Profile Dropdown
const ProfileDropDown = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-300 hover:text-white p-2 rounded-xl transition-all duration-300"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">
            {user?.firstName?.charAt(0) || user?.name?.charAt(0) || 'U'}
          </span>
        </div>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-800/95 backdrop-blur-xl border border-gray-700 rounded-xl shadow-xl z-50">
          <div className="px-4 py-3 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">
                  {user?.firstName?.charAt(0) || user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <p className="text-white font-medium text-sm">
                  {user?.firstName
                    ? `${user.firstName} ${user.lastName || ''}`
                    : user?.name || 'User'}
                </p>
                <p className="text-gray-400 text-xs">{user?.email}</p>
              </div>
            </div>
          </div>

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

// ✅ Main Navbar
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLogout = () => dispatch(Logout(navigate));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-gray-800'
          : 'bg-gray-900/90 backdrop-blur-lg shadow-lg'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ✅ Logo */}
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

          {/* ✅ Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              <Link to="/" className="text-gray-300 hover:text-white px-4 py-2 text-sm font-medium transition-all">Home</Link>
              <Link to="/turfs" className="text-gray-300 hover:text-white px-4 py-2 text-sm font-medium transition-all">Find Turfs</Link>
              {token && (
                <Link to="/bookings" className="text-gray-300 hover:text-white px-4 py-2 text-sm font-medium transition-all flex items-center">
                  <Calendar className="h-4 w-4 mr-2" /> My Bookings
                </Link>
              )}
              <Link to="/about" className="text-gray-300 hover:text-white px-4 py-2 text-sm font-medium transition-all">About</Link>
              <Link to="/contact" className="text-gray-300 hover:text-white px-4 py-2 text-sm font-medium transition-all">Contact</Link>
              {/* ✅ Dropdown added here */}
              <NavbarWithDropdown />
            </div>
          </div>

          {/* ✅ Right section */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-3">
              {token ? (
                <ProfileDropDown user={user} onLogout={handleLogout} />
              ) : (
                <>
                  <Link to="/login" className="text-gray-300 hover:text-white border border-gray-700 px-4 py-2 rounded-lg text-sm flex items-center">
                    <LogIn className="h-4 w-4 mr-2" /> Login
                  </Link>
                  <Link to="/signup" className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-4 py-2 rounded-lg text-sm flex items-center">
                    <UserPlus className="h-4 w-4 mr-2" /> Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* ✅ Mobile Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-300 hover:text-white p-2 rounded-xl">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

