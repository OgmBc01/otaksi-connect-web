'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useRef } from 'react'

export default function NameMeaning() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Neural network animation - brain neurons
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      const section = canvas.parentElement?.parentElement
      if (section) {
        const rect = section.getBoundingClientRect()
        canvas.width = rect.width
        canvas.height = rect.height
      }
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Brain-like neural network
    const neurons: { x: number; y: number; connections: number[]; pulse: number }[] = []
    
    // Create neurons in a brain-like pattern
    for (let i = 0; i < 20; i++) {
      neurons.push({
        x: 200 + Math.random() * (canvas.width - 400),
        y: 200 + Math.random() * (canvas.height - 400),
        connections: [],
        pulse: Math.random() * Math.PI * 2,
      })
    }

    // Connect neurons
    neurons.forEach((neuron, i) => {
      neurons.forEach((other, j) => {
        if (i !== j) {
          const dx = neuron.x - other.x
          const dy = neuron.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 150) {
            neuron.connections.push(j)
          }
        }
      })
    })

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw connections
      neurons.forEach((neuron, i) => {
        neuron.connections.forEach(connIndex => {
          const target = neurons[connIndex]
          if (!target) return

          const opacity = 0.15 + Math.sin(time * 3 + i) * 0.05
          const gradient = ctx.createLinearGradient(neuron.x, neuron.y, target.x, target.y)
          gradient.addColorStop(0, `rgba(255, 46, 159, ${opacity})`)
          gradient.addColorStop(0.5, `rgba(91, 108, 255, ${opacity})`)
          gradient.addColorStop(1, `rgba(255, 46, 159, ${opacity})`)

          ctx.beginPath()
          ctx.moveTo(neuron.x, neuron.y)
          ctx.lineTo(target.x, target.y)
          ctx.strokeStyle = gradient
          ctx.lineWidth = 1.5
          ctx.stroke()
        })
      })

      // Draw neurons
      neurons.forEach((neuron) => {
        neuron.pulse += 0.02
        const size = 5 + Math.sin(neuron.pulse) * 2

        ctx.beginPath()
        ctx.arc(neuron.x, neuron.y, size, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(neuron.x, neuron.y, 0, neuron.x, neuron.y, size * 3)
        gradient.addColorStop(0, `rgba(91, 108, 255, 0.4)`)
        gradient.addColorStop(0.7, `rgba(255, 46, 159, 0.3)`)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fill()
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <section className="relative py-24 bg-midnight border-t border-white/5 overflow-hidden">
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-30"
      />
      
      <div className="absolute inset-0 bg-gradient-glow" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-clash)' }}>
            The Meaning Behind{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Otaksi</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Visual representation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-3xl opacity-30 blur-2xl" />
            
            <div className="relative backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 p-8">
              <div className="grid grid-cols-2 gap-6">
                {/* Otak - Brain */}
                <div className="text-center">
                  <div className="text-6xl mb-4">🧠</div>
                  <h3 className="text-3xl font-bold gradient-text mb-2">Otak</h3>
                  <p className="text-lg text-gray-300">Brain</p>
                  <p className="text-sm text-gray-500 mt-2">The center of intelligence</p>
                </div>

                {/* Si - Neurons */}
                <div className="text-center">
                  <div className="text-6xl mb-4">⚡</div>
                  <h3 className="text-3xl font-bold gradient-text mb-2">Si</h3>
                  <p className="text-lg text-gray-300">Neurons</p>
                  <p className="text-sm text-gray-500 mt-2">The neural connections</p>
                </div>
              </div>

              {/* Plus sign */}
              <div className="text-center text-4xl text-gray-500 my-4">+</div>

              {/* Equal - Otaksi */}
              <div className="text-center">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-3xl font-bold gradient-text mb-2">Otaksi</h3>
                <p className="text-lg text-gray-300">Artificial Neural Networks</p>
                <p className="text-sm text-gray-500 mt-2">Computers that think</p>
              </div>
            </div>
          </motion.div>

          {/* Right side - Explanation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 p-8">
              <h3 className="text-2xl font-bold mb-6 gradient-text">The Neural Observer</h3>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  <span className="text-white font-semibold">'Otak'</span> - meaning 'brain' in Malay/Indonesian. 
                  It represents the center of intelligence, processing, and decision-making.
                </p>
                
                <p>
                  <span className="text-white font-semibold">'Si'</span> - short for 'sinir' meaning 'neurons' in Turkish.
                  These are the fundamental building blocks of neural networks.
                </p>
                
                <p className="text-white font-medium pt-4">
                  Together, <span className="gradient-text">Otaksi</span> represents Artificial Neural Networks (ANN) - 
                  computer systems that learn and make decisions inspired by the human brain.
                </p>
                
                <p className="text-sm text-gray-500 italic pt-4">
                  ANN helps computers make computational decisions with less human interaction, 
                  observing complex systems and engineering intelligent solutions.
                </p>
              </div>

              {/* Neural Network Visual */}
              <div className="mt-8 flex justify-center gap-2">
                <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] animate-pulse" />
                <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#5B6CFF] to-[#FF2E9F] animate-pulse animation-delay-200" />
                <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] animate-pulse animation-delay-400" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}