import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/HeroSection'
import HowItWorks from './components/Howitworks'
import DisasterRecovery from './components/Disaster'
import HealthMedical from './Health/HealthMedical'
import HealthCharities from './Health/HealthCharities'
const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <HowItWorks />
      <HealthMedical />
      <HealthCharities />
    </div>
  )
}

export default Home
