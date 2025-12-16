import './App.css'
import Navbar from './components/navbar'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import { Routes, Route, useLocation } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import AboutPage from './pages/AboutPage'
import ContactUs from './pages/ContactUs'
import Footer from './components/Footer'
import VerifyEmail from './pages/verify-email'
import AdminDashboard from './components/admin_dashboard/locations/AdminDashboard'
import CitySports from './pages/CitySports'
import FindSports from './pages/FindSports'
import TurfDetails from './pages/TurfDetails'
import LocationCategory from './components/admin_dashboard/locations/locationCategory'
import CheckoutPage from './pages/checkout/CheckoutPage'
import SuperAdmin from './pages/SuperAdmin'

// import Location from './components/admin_dashboard/sports/Location'
// import Location from './components/admin_dashboard/sports/page/Location'

function App() {
  const location = useLocation();

  // Define paths where you want to hide Navbar and Footer
  const hideLayout = location.pathname.startsWith('/admin')||
  location.pathname.startsWith('/superadmin');

  return (
    <>
      {!hideLayout && <Navbar />}
      <div className="">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path='/sports/by-city-category' element={<CitySports/>}/>
          <Route path='/turfs' element={<FindSports/>}/>
          <Route path='/turfdetails/:id' element={<TurfDetails/>}/>
          <Route path='/location/:locationID' element={<LocationCategory/> }/>
          <Route path='/checkout/:turfId' element={<CheckoutPage/>}/>
          <Route path='/superadmin/dashboard' element={<SuperAdmin/>}/>
          {/* <Route path='location/:id' element={<Location/>}/> */}
        </Routes>
      </div>
     
    </>
  )
}

export default App
