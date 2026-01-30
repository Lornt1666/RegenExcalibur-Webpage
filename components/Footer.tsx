'use client'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🛡️</span>
              <span className="text-xl font-bold">REGENEXCALIBUR</span>
            </div>
            <p className="text-gray-400 text-sm max-w-md">
              The physical evolution of the blockchain. Moving from Proof-of-Work to Proof-of-Protection 
              for planetary sovereignty.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-regen-gold">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#facade-os" className="hover:text-regen-gold transition-colors">Facade OS™</a></li>
              <li><a href="#alliance" className="hover:text-regen-gold transition-colors">Alliance Protocol</a></li>
              <li><a href="#" className="hover:text-regen-gold transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-regen-gold transition-colors">Whitepaper</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-regen-gold">Connect</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-regen-gold transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-regen-gold transition-colors">Discord</a></li>
              <li><a href="#" className="hover:text-regen-gold transition-colors">GitHub</a></li>
              <li><a href="#" className="hover:text-regen-gold transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-400">
            © 2026 RegenExcalibur. Architect: JGM | Protocol: Base
          </div>
          <div className="text-sm text-gray-400 flex items-center gap-2">
            <span>🦁</span>
            <span>Harvest Toxicity. Transmute Value. Secure the Biosphere.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
