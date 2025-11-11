import React, { useState, useEffect } from 'react';
import HeroSection from '../components/Home/HeroSection';
import PopularSportsSection from '../components/Home/PopularSportsSection';
import HowItWorksSection from '../components/Home/HowItWorksSection';
import ReviewsSection from '../components/Home/ReviewsSection';
import WhyChooseUsSection from '../components/Home/WhyChooseUsSection';
import SportsSlider from '../components/Home/SportsSlider';

const HomePage = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());

  // Fake sports data
  const popularSports = [
    {
      _id: '1',
      name: 'Premium Football Ground',
      description: 'Professional FIFA standard football ground with floodlights',
      location: 'Downtown Sports Complex',
      category: 'Team Sport',
      timeSlots: ['6:00 AM - 8:00 AM', '6:00 PM - 8:00 PM', '8:00 PM - 10:00 PM'],
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop',
      rating: 4.8,
      price: 2500
    },
    {
      _id: '2',
      name: 'Elite Cricket Stadium',
      description: 'International standard cricket ground with pavilion',
      location: 'Central Cricket Hub',
      category: 'Team Sport',
      timeSlots: ['5:00 AM - 9:00 AM', '4:00 PM - 8:00 PM'],
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=300&fit=crop',
      rating: 4.9,
      price: 3000
    },
    {
      _id: '3',
      name: 'Premium Football Ground',
      description: 'Professional FIFA standard football ground with floodlights',
      location: 'Downtown Sports Complex',
      category: 'Team Sport',
      timeSlots: ['6:00 AM - 8:00 AM', '6:00 PM - 8:00 PM', '8:00 PM - 10:00 PM'],
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop',
      rating: 4.8,
      price: 2500
    },
    {
      _id: '4',
      name: 'Elite Cricket Stadium',
      description: 'International standard cricket ground with pavilion',
      location: 'Central Cricket Hub',
      category: 'Team Sport',
      timeSlots: ['5:00 AM - 9:00 AM', '4:00 PM - 8:00 PM'],
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=300&fit=crop',
      rating: 4.9,
      price: 3000
    },
    
    // Add more sports data as needed...
  ];

  const reviews = [
    {
      name: 'Rajesh Kumar',
      rating: 5,
      comment: 'Amazing experience! The booking process was seamless and the ground quality was excellent.',
      sport: 'Football Ground',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
    },
    {
      name: 'Priya Sharma',
      rating: 5,
      comment: 'Love the variety of sports available. Booked a tennis court and it was perfect!',
      sport: 'Tennis Court',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b217?w=100&h=100&fit=crop'
    },
    {
      name: 'Amit Patel',
      rating: 4,
      comment: 'Great platform for sports enthusiasts. Easy to use and reliable booking system.',
      sport: 'Cricket Ground',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
    }
  ];

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const isVisible = (sectionId) => visibleSections.has(sectionId);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Your existing Header component would go here */}
      
      <HeroSection isVisible={isVisible} />
      {/* <PopularSportsSection isVisible={isVisible} popularSports={popularSports} /> */}
      <SportsSlider/>
      <HowItWorksSection isVisible={isVisible} />
      <ReviewsSection isVisible={isVisible} reviews={reviews} />
      <WhyChooseUsSection isVisible={isVisible} />
      
      {/* Your existing Footer component would go here */}
    </div>
  );
};

export default HomePage;