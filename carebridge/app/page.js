import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/HeroSection'
import HowItWorks from './components/Howitworks'
import DisasterRecovery from './components/Disaster'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <HowItWorks />
      <DisasterRecovery />
    </div>
  )
}

export default Home
