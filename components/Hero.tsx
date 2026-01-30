'use client'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden concrete-texture">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-regen-gold/10 via-transparent to-transparent opacity-30"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="text-sm md:text-base tracking-[0.3em] text-regen-gold/80 mb-4">
            🛡️ REGENEXCALIBUR
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 glow-gold">
            THE OMNIPOTENT<br />
            <span className="text-regen-gold">DESIGN</span>
          </h1>
          <div className="text-lg md:text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            <p className="mb-2">Architect: JGM | Protocol: Base | Mission: Planetary Sovereignty</p>
            <p className="text-xl md:text-2xl font-semibold text-white mt-6">
              The physical evolution of the blockchain.<br />
              We move from <span className="text-regen-gold">Proof-of-Work</span> to{' '}
              <span className="text-regen-gold">Proof-of-Protection</span>.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#facade-os" 
            className="glass-effect px-8 py-4 rounded-lg hover:bg-white/10 transition-all duration-300 border-regen-gold/30 hover:border-regen-gold/60"
          >
            <span className="text-regen-gold font-semibold">Explore Facade OS™</span>
          </a>
          <a 
            href="#alliance" 
            className="glass-effect px-8 py-4 rounded-lg hover:bg-white/10 transition-all duration-300"
          >
            <span className="text-white font-semibold">Alliance Protocol</span>
          </a>
        </div>

        {/* Tagline */}
        <div className="mt-16 text-gray-400 text-sm md:text-base tracking-wide">
          Harvest Toxicity. Transmute Value. Secure the Biosphere. 🦁
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-regen-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-regen-gold/5 rounded-full blur-3xl"></div>
    </section>
  )
}
