'use client'

import { motion } from 'framer-motion'
import Button from '../ui/Button'

export default function Hero() {
  return (
    <section 
    id="hero-section"
    className="relative min-h-screen flex items-center justify-center overflow-hidden bg-midnight"
    >
        <div style={{ textAlign: 'center', maxWidth: '1200px', padding: '0 20px' }}>
        {/* Logo */}
        <div style={{ marginBottom: '2rem' }}>
            <div style={{
            width: '80px',
            height: '80px',
            margin: '0 auto',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF2E9F, #5B6CFF)',
            padding: '2px'
            }}>
            <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                backgroundColor: '#0B0616',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <span style={{
                fontSize: '24px',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #FF2E9F, #5B6CFF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
                }}>OC</span>
            </div>
            </div>
        </div>

        {/* Headline */}
        <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            lineHeight: 1.2
        }}>
            <span style={{ color: 'white' }}>Engineering Intelligent</span>
            <br />
            <span style={{
            background: 'linear-gradient(135deg, #FF2E9F, #5B6CFF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
            }}>Software Systems</span>
            <br />
            <span style={{
            fontSize: 'clamp(1.2rem, 3vw, 2rem)',
            color: '#9CA3AF',
            display: 'block',
            marginTop: '1rem'
            }}>
            for the Modern Digital Economy
            </span>
        </h1>

        {/* Subtext */}
        <p style={{
            fontSize: '1.25rem',
            color: '#D1D5DB',
            maxWidth: '800px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6
        }}>
            Premium software engineering consultancy in Dubai, delivering intelligent
            digital systems for enterprises across the UAE and Middle East.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Button variant="primary" size="large">
            Start a Project
            </Button>
            <Button variant="secondary" size="large">
            Explore Solutions
            </Button>
        </div>
        </div>
    </section>
  )
}