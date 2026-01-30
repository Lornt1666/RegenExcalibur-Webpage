'use client'

import { useState, useEffect } from 'react'

export default function FacadeOS() {
  const [solarOutput, setSolarOutput] = useState(0)
  const [efficiency, setEfficiency] = useState(0)

  useEffect(() => {
    // Simulate M3P Solar Rendering Engine
    const interval = setInterval(() => {
      setSolarOutput(Math.random() * 100)
      setEfficiency(85 + Math.random() * 15)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="facade-os" className="min-h-screen py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            FACADE OS<sup className="text-2xl">™</sup>
          </h2>
          <p className="text-xl text-gray-400">M3P Solar Rendering Engine</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Solar Stats Panel */}
          <div className="glass-effect p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6 text-regen-gold">Real-Time Metrics</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Solar Output</span>
                  <span className="text-regen-gold font-mono">{solarOutput.toFixed(2)} kW</span>
                </div>
                <div className="w-full bg-regen-gray rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-regen-gold to-yellow-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${solarOutput}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">System Efficiency</span>
                  <span className="text-regen-gold font-mono">{efficiency.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-regen-gray rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-regen-gold h-2 rounded-full transition-all duration-500"
                    style={{ width: `${efficiency}%` }}
                  ></div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className="text-green-400 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    ACTIVE
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* System Description */}
          <div className="glass-effect p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6">Bio-Digital Architecture</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                <span className="text-regen-gold font-semibold">Facade OS™</span> integrates 
                advanced photovoltaic technology with blockchain protocols to create a self-sustaining 
                energy ecosystem.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-regen-gold mt-1">▸</span>
                  <span>M3P (Multi-Modal Power Processing) architecture</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-regen-gold mt-1">▸</span>
                  <span>Real-time energy tokenization</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-regen-gold mt-1">▸</span>
                  <span>Quantum-resistant security protocols</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-regen-gold mt-1">▸</span>
                  <span>Autonomous grid optimization</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-sm text-gray-400 italic">
                  &ldquo;The convergence of renewable energy and decentralized finance 
                  creates an unstoppable force for planetary regeneration.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Stack */}
        <div className="mt-12 glass-effect p-8 rounded-2xl">
          <h3 className="text-xl font-bold mb-4 text-center">Technical Stack</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-regen-dark/50 rounded-lg">
              <div className="text-2xl mb-2">⚡</div>
              <div className="text-sm text-gray-400">Next.js 14</div>
            </div>
            <div className="p-4 bg-regen-dark/50 rounded-lg">
              <div className="text-2xl mb-2">🎨</div>
              <div className="text-sm text-gray-400">Tailwind CSS</div>
            </div>
            <div className="p-4 bg-regen-dark/50 rounded-lg">
              <div className="text-2xl mb-2">⛓️</div>
              <div className="text-sm text-gray-400">Base Protocol</div>
            </div>
            <div className="p-4 bg-regen-dark/50 rounded-lg">
              <div className="text-2xl mb-2">☀️</div>
              <div className="text-sm text-gray-400">Solar M3P</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
