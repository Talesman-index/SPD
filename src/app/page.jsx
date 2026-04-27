import React from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import CartDrawer from '../components/ui/CartDrawer'
import Hero from '../components/sections/Hero'
import MissionProblem from '../components/sections/MissionProblem'
import HowItWorks from '../components/sections/HowItWorks'
import TrustProof from '../components/sections/TrustProof'
import GetStarted from '../components/sections/GetStarted'
import OurImpact from '../components/sections/OurImpact'
import CommunityFAQ from '../components/sections/CommunityFAQ'
import Contact from '../components/sections/Contact'
import StickyBar from '../components/sections/StickyBar'
import ErrorBoundary from '../components/ui/ErrorBoundary'
import TrialModal from '../components/ui/TrialModal'

const Page = () => {
  const [isTrialOpen, setIsTrialOpen] = React.useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <ErrorBoundary name="Navbar"><Navbar /></ErrorBoundary>
      <ErrorBoundary name="CartDrawer"><CartDrawer /></ErrorBoundary>
      <TrialModal isOpen={isTrialOpen} onClose={() => setIsTrialOpen(false)} />

      <main className="flex-grow">
        {/* 1. HERO */}
        <ErrorBoundary name="Hero">
          <Hero onOpenTrial={() => setIsTrialOpen(true)} />
        </ErrorBoundary>

        {/* 2. MISSION & THE PROBLEM */}
        <ErrorBoundary name="MissionProblem">
          <MissionProblem />
        </ErrorBoundary>

        {/* 3. HOW IT WORKS (Process & Science) */}
        <ErrorBoundary name="HowItWorks">
          <HowItWorks />
        </ErrorBoundary>

        {/* 4. TRUST & PROOF */}
        <ErrorBoundary name="TrustProof">
          <TrustProof />
        </ErrorBoundary>

        {/* 5. GET STARTED (Order & Sign Up) */}
        <ErrorBoundary name="GetStarted">
          <GetStarted />
        </ErrorBoundary>

        {/* 6. OUR IMPACT */}
        <ErrorBoundary name="OurImpact">
          <OurImpact />
        </ErrorBoundary>

        {/* 7. COMMUNITY & FAQ */}
        <ErrorBoundary name="CommunityFAQ">
          <CommunityFAQ />
        </ErrorBoundary>

        {/* 8. CONTACT */}
        <ErrorBoundary name="Contact">
          <Contact />
        </ErrorBoundary>
      </main>

      <ErrorBoundary name="Footer"><Footer /></ErrorBoundary>
      <ErrorBoundary name="StickyBar"><StickyBar /></ErrorBoundary>
    </div>
  )
}

export default Page
