'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface NeuralNetworkContextType {
  isActivated: boolean
  activationProgress: number
  dataFlowIntensity: number
}

const NeuralNetworkContext = createContext<NeuralNetworkContextType | undefined>(undefined)

export function NeuralNetworkProvider({ children }: { children: ReactNode }) {
  const [isActivated, setIsActivated] = useState(false)
  const [activationProgress, setActivationProgress] = useState(0)
  const [dataFlowIntensity, setDataFlowIntensity] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroSection = document.getElementById('hero-section')
      
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect()
        const heroPassed = rect.bottom < 200
        
        // Activate when user scrolls past hero
        if (heroPassed && !isActivated) {
          setIsActivated(true)
          
          // Smooth activation animation
          let progress = 0
          const interval = setInterval(() => {
            progress += 0.02
            setActivationProgress(Math.min(progress, 1))
            if (progress >= 1) clearInterval(interval)
          }, 30)
        }

        // Calculate data flow intensity based on scroll speed and position
        const windowHeight = window.innerHeight
        const documentHeight = document.documentElement.scrollHeight
        const maxScroll = documentHeight - windowHeight
        const scrollPercentage = maxScroll > 0 ? scrollY / maxScroll : 0
        
        // Intensity increases as you scroll down, peaks at middle, then slightly decreases
        let intensity = 0.3 // Base intensity
        
        if (isActivated) {
          if (scrollPercentage < 0.3) {
            intensity = 0.3 + scrollPercentage * 1.5 // Ramp up
          } else if (scrollPercentage < 0.7) {
            intensity = 0.8 + (scrollPercentage - 0.3) * 0.5 // Peak
          } else {
            intensity = 1.0 - (scrollPercentage - 0.7) * 0.8 // Slight decrease
          }
          
          intensity = Math.min(1, Math.max(0.3, intensity))
        }
        
        setDataFlowIntensity(intensity)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isActivated])

  return (
    <NeuralNetworkContext.Provider value={{
      isActivated,
      activationProgress,
      dataFlowIntensity
    }}>
      {children}
    </NeuralNetworkContext.Provider>
  )
}

export function useNeuralNetwork() {
  const context = useContext(NeuralNetworkContext)
  if (context === undefined) {
    throw new Error('useNeuralNetwork must be used within a NeuralNetworkProvider')
  }
  return context
}