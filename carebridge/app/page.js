import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/HeroSection'
import HowItWorks from './components/Howitworks'
import DisasterRecovery from './components/Disaster'
import DonationPrompt from './components/DonationPrompt'
import PopularContributions from './components/Popular'
const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <HowItWorks />
      <DisasterRecovery />
      <PopularContributions />
      <DonationPrompt />


    </div>
  )
}

export default Home
