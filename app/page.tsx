

import Hero from '../src/components/sections/Hero'
import WhatWeDo from '../src/components/sections/WhatWeDo'
import Industries from '../src/components/sections/Industries'
import EngineeringCapabilities from '../src/components/sections/EngineeringCapabilities'
import WhyChooseUs from '../src/components/sections/WhyChooseUs'

export default function Home() {
  return (
    <main style={{ 
      backgroundColor: '#0B0616', 
      minHeight: '100vh',
      margin: 0,
      padding: 0
    }}>
      <Hero />
      <WhatWeDo />
      <Industries />
      <EngineeringCapabilities />
      <WhyChooseUs />
      
    </main>
  )
}


