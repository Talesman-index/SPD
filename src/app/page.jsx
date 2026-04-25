import React from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import CartDrawer from '../components/ui/CartDrawer'
import Hero from '../components/sections/Hero'
import WhyItMatters from '../components/sections/WhyItMatters'
import Services from '../components/sections/Services'
import HowItWorks from '../components/sections/HowItWorks'
import PartnerProviders from '../components/sections/PartnerProviders'
import OurImpact from '../components/sections/OurImpact'
import OrderDevice from '../components/sections/OrderDevice'

import Contact from '../components/sections/Contact'
import StickyBar from '../components/sections/StickyBar'
import ErrorBoundary from '../components/ui/ErrorBoundary'

import TrialModal from '../components/ui/TrialModal'

const Page = () => {
  const [isTrialOpen, setIsTrialOpen] = React.useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      <ErrorBoundary name="Navbar"><Navbar /></ErrorBoundary>
      <ErrorBoundary name="CartDrawer"><CartDrawer /></ErrorBoundary>
      <TrialModal isOpen={isTrialOpen} onClose={() => setIsTrialOpen(false)} />

      <main className="flex-grow">
        {/* 1. Hero */}
        <ErrorBoundary name="Hero"><Hero onOpenTrial={() => setIsTrialOpen(true)} /></ErrorBoundary>

        {/* 2. The Problem (Why It Matters) */}
        <ErrorBoundary name="WhyItMatters"><WhyItMatters /></ErrorBoundary>

        {/* 3. The Technology (Services) */}
        <ErrorBoundary name="Services"><Services /></ErrorBoundary>

        {/* 4. The Process (How It Works) */}
        <ErrorBoundary name="HowItWorks"><HowItWorks /></ErrorBoundary>

        {/* 5. Our Providers (Partner Providers) */}
        <ErrorBoundary name="PartnerProviders"><PartnerProviders /></ErrorBoundary>

        {/* 6. The Science (Our Impact) */}
        <ErrorBoundary name="OurImpact"><OurImpact /></ErrorBoundary>

        {/* 7. Product (Order Device) */}
        <ErrorBoundary name="OrderDevice"><OrderDevice /></ErrorBoundary>



        {/* 9. Contact */}
        <ErrorBoundary name="Contact"><Contact /></ErrorBoundary>
      </main>

      <ErrorBoundary name="Footer"><Footer /></ErrorBoundary>
      <ErrorBoundary name="StickyBar"><StickyBar /></ErrorBoundary>
    </div>
  )
}

export default Page
