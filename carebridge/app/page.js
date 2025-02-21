import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/HeroSection';
import HowItWorks from './components/Howitworks';
import DisasterRecovery from './components/Disaster';
import DonationPrompt from './components/DonationPrompt';
import PopularContributions from './components/Popular';
import ImageSlider from './components/Slider';
import Footer from './components/Footer';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <HowItWorks />
      <DisasterRecovery />
      <PopularContributions />
      <ImageSlider />
      <DonationPrompt />
      <Footer />
    </div>
  );
};

export default Home;
