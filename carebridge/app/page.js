import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/HeroSection'
import HowItWorks from './components/Howitworks'
import DisasterRecovery from './components/Disaster'
// import Admin from './admin/page'
const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <HowItWorks />
      
    </div>
  )
}

export default Home
