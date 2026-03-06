'use client'

import { useEffect, useRef } from 'react'
import { useNeuralNetwork } from '@/context/NeuralNetworkContext'

interface NeuralNetworkCanvasProps {
  className?: string
}

export default function NeuralNetworkCanvas({ className = '' }: NeuralNetworkCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { isActivated, activationProgress, dataFlowIntensity } = useNeuralNetwork()
  const intelligenceCenterRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Configuration
    const NUM_LINES = 14 // 14 radiating lines
    const NODES_PER_LINE = 10 // 10 nodes per line
    const LINE_LENGTH = 2000 // Length of lines in pixels
    const NODE_SIZE = 3

    // Pre-calculate line angles (radiating downward in a fan)
    const angles: number[] = []
    const startAngle = -40 // Start angle in degrees (left side)
    const endAngle = 40 // End angle in degrees (right side)
    
    for (let i = 0; i < NUM_LINES; i++) {
      const angle = startAngle + (i / (NUM_LINES - 1)) * (endAngle - startAngle)
      angles.push(angle * (Math.PI / 180)) // Convert to radians
    }

    // Store node positions for each line
    const nodePositions: { x: number; y: number; progress: number }[][] = []

    // Set canvas size to full document height
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = document.documentElement.scrollHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Find intelligence center (OC logo) position
    const updateIntelligenceCenter = () => {
      const logo = document.querySelector('.intelligence-center')
      if (logo) {
        const rect = logo.getBoundingClientRect()
        intelligenceCenterRef.current = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2 + window.scrollY
        }
      }
    }

    // Animation variables
    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.02

      // Update intelligence center position
      updateIntelligenceCenter()
      const centerX = intelligenceCenterRef.current.x
      const centerY = intelligenceCenterRef.current.y

      // Skip if center is not valid
      if (centerX === 0 && centerY === 0) {
        animationFrame = requestAnimationFrame(animate)
        return
      }

      // Calculate line endpoints and node positions
      const lineEndpoints: { x: number; y: number }[] = []
      
      angles.forEach((angle) => {
        const endX = centerX + Math.sin(angle) * LINE_LENGTH
        const endY = centerY + Math.cos(angle) * LINE_LENGTH
        lineEndpoints.push({ x: endX, y: endY })
      })

      // Draw lines and nodes
      lineEndpoints.forEach((endpoint, lineIndex) => {
        const angle = angles[lineIndex]
        
        // Calculate if this line is within viewport (optimization)
        const lineBounds = {
          minY: Math.min(centerY, endpoint.y),
          maxY: Math.max(centerY, endpoint.y)
        }
        
        // Only draw if line is potentially visible
        if (lineBounds.maxY < window.scrollY - 100 || 
            lineBounds.minY > window.scrollY + window.innerHeight + 100) {
          return
        }

        // Calculate node positions along this line
        const nodesThisLine: { x: number; y: number; progress: number }[] = []
        
        for (let i = 1; i <= NODES_PER_LINE; i++) {
          const t = i / (NODES_PER_LINE + 1) // Position along line (0-1)
          const nodeX = centerX + (endpoint.x - centerX) * t
          const nodeY = centerY + (endpoint.y - centerY) * t
          
          // Calculate distance from center for activation effect
          const distanceFromCenter = Math.sqrt(
            Math.pow(nodeX - centerX, 2) + 
            Math.pow(nodeY - centerY, 2)
          )
          
          // Progress value for pulse animation
          const progress = (time + lineIndex * 0.5) % 1
          
          nodesThisLine.push({ 
            x: nodeX, 
            y: nodeY, 
            progress 
          })
        }

        nodePositions[lineIndex] = nodesThisLine

        // Determine if line should be active based on scroll
        const distanceFromTop = centerY - window.scrollY
        const shouldBeActive = isActivated && 
          activationProgress > 0.2 && 
          window.scrollY > 100

        // Calculate line opacity based on activation
        let lineOpacity = 0.15 // Base inactive opacity
        let nodeOpacity = 0.3 // Base inactive node opacity
        
        if (shouldBeActive) {
          // Progressive activation - lines closer to viewport are brighter
          const viewportProgress = Math.min(1, Math.max(0, 
            (window.scrollY - 100) / 500
          ))
          lineOpacity = 0.3 + viewportProgress * 0.5
          nodeOpacity = 0.5 + viewportProgress * 0.4
        }

        // Draw the main line
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(endpoint.x, endpoint.y)

        if (shouldBeActive) {
          // Active gradient line
          const gradient = ctx.createLinearGradient(centerX, centerY, endpoint.x, endpoint.y)
          gradient.addColorStop(0, `rgba(255, 46, 159, ${lineOpacity})`)
          gradient.addColorStop(0.3, `rgba(91, 108, 255, ${lineOpacity * 1.2})`)
          gradient.addColorStop(0.6, `rgba(255, 46, 159, ${lineOpacity})`)
          gradient.addColorStop(1, `rgba(91, 108, 255, ${lineOpacity * 0.8})`)
          ctx.strokeStyle = gradient
          ctx.lineWidth = 1.5
        } else {
          // Inactive grey line
          ctx.strokeStyle = `rgba(120, 120, 140, ${lineOpacity * 0.7})`
          ctx.lineWidth = 1
        }
        
        ctx.stroke()

        // Draw nodes on this line
        nodesThisLine.forEach((node, nodeIndex) => {
          const distanceFromCenter = Math.sqrt(
            Math.pow(node.x - centerX, 2) + 
            Math.pow(node.y - centerY, 2)
          )
          
          // Calculate individual node opacity
          let nodeActiveOpacity = nodeOpacity
          
          if (shouldBeActive) {
            // Nodes further from center have slightly different opacity
            const distanceFactor = 1 - (distanceFromCenter / LINE_LENGTH) * 0.3
            nodeActiveOpacity = nodeOpacity * distanceFactor
            
            // Pulse effect on active nodes
            const pulse = Math.sin(time * 3 + nodeIndex + lineIndex) * 0.2 + 0.8
            nodeActiveOpacity *= pulse
          }

          // Draw node
          ctx.beginPath()
          ctx.arc(node.x, node.y, NODE_SIZE, 0, Math.PI * 2)

          if (shouldBeActive) {
            // Active node with gradient
            const nodeGradient = ctx.createRadialGradient(
              node.x, node.y, 0,
              node.x, node.y, NODE_SIZE * 2
            )
            nodeGradient.addColorStop(0, `rgba(255, 46, 159, ${nodeActiveOpacity})`)
            nodeGradient.addColorStop(0.7, `rgba(91, 108, 255, ${nodeActiveOpacity})`)
            nodeGradient.addColorStop(1, 'transparent')
            ctx.fillStyle = nodeGradient
            
            // Add glow for active nodes
            ctx.shadowColor = '#5B6CFF'
            ctx.shadowBlur = 8
          } else {
            // Inactive grey node
            ctx.fillStyle = `rgba(140, 140, 160, ${nodeOpacity * 0.8})`
            ctx.shadowBlur = 0
          }
          
          ctx.fill()
          ctx.shadowBlur = 0
        })

        // Draw pulsing data flow along the line
        if (shouldBeActive && dataFlowIntensity > 0.3) {
          // Multiple pulses traveling down the line
          for (let p = 0; p < 3; p++) {
            const pulseOffset = (time * 0.5 + p * 0.3) % 1
            const pulseX = centerX + (endpoint.x - centerX) * pulseOffset
            const pulseY = centerY + (endpoint.y - centerY) * pulseOffset

            ctx.beginPath()
            ctx.arc(pulseX, pulseY, NODE_SIZE * 1.5, 0, Math.PI * 2)
            
            const pulseGradient = ctx.createRadialGradient(
              pulseX, pulseY, 0,
              pulseX, pulseY, NODE_SIZE * 3
            )
            pulseGradient.addColorStop(0, `rgba(255, 255, 255, ${dataFlowIntensity * 0.8})`)
            pulseGradient.addColorStop(0.5, `rgba(91, 108, 255, ${dataFlowIntensity * 0.6})`)
            pulseGradient.addColorStop(1, 'transparent')
            
            ctx.fillStyle = pulseGradient
            ctx.shadowColor = '#5B6CFF'
            ctx.shadowBlur = 12
            ctx.fill()
            ctx.shadowBlur = 0
          }
        }
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    // Handle scroll to reactivate center periodically
    const handleScroll = () => {
      // No need to do anything here, activation is handled by context
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', setCanvasSize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', setCanvasSize)
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isActivated, activationProgress, dataFlowIntensity])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none z-0 ${className}`}
      style={{ 
        opacity: 1,
        transition: 'opacity 0.3s ease'
      }}
    />
  )
}