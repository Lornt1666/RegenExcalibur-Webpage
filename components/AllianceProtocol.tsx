'use client'

export default function AllianceProtocol() {
  const partners = [
    {
      category: 'Logistics',
      companies: ['Global Freight Systems', 'TransContinental Solutions', 'NextGen Supply Chain'],
      icon: '🚚'
    },
    {
      category: 'Construction',
      companies: ['MegaInfra Corp', 'Sustainable Buildings Inc', 'Urban Development Alliance'],
      icon: '🏗️'
    },
    {
      category: 'Energy',
      companies: ['Solar Innovations', 'Grid Dynamics', 'Renewable Power Collective'],
      icon: '⚡'
    }
  ]

  return (
    <section id="alliance" className="min-h-screen py-20 px-4 relative concrete-texture">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            ALLIANCE <span className="text-regen-gold">PROTOCOL</span>
          </h2>
          <p className="text-xl text-gray-400">
            Integration Portal for Global Industrial Partnerships
          </p>
        </div>

        {/* Partnership Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {partners.map((sector, idx) => (
            <div key={idx} className="glass-effect p-6 rounded-2xl hover:bg-white/10 transition-all duration-300">
              <div className="text-4xl mb-4 text-center">{sector.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-regen-gold text-center">
                {sector.category}
              </h3>
              <ul className="space-y-3">
                {sector.companies.map((company, companyIdx) => (
                  <li key={companyIdx} className="flex items-center gap-2 text-gray-300">
                    <span className="text-regen-gold text-xs">●</span>
                    <span className="text-sm">{company}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Integration Benefits */}
        <div className="glass-effect p-8 rounded-2xl mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Protocol Benefits</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="text-regen-gold text-xl mt-1">✓</div>
                <div>
                  <h4 className="font-semibold mb-1">Decentralized Coordination</h4>
                  <p className="text-sm text-gray-400">
                    Seamless integration across global supply chains through blockchain verification
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-regen-gold text-xl mt-1">✓</div>
                <div>
                  <h4 className="font-semibold mb-1">Carbon Credit Tokenization</h4>
                  <p className="text-sm text-gray-400">
                    Convert environmental impact into tradeable digital assets
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-regen-gold text-xl mt-1">✓</div>
                <div>
                  <h4 className="font-semibold mb-1">Real-Time Analytics</h4>
                  <p className="text-sm text-gray-400">
                    Monitor resource flows and optimize operational efficiency
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="text-regen-gold text-xl mt-1">✓</div>
                <div>
                  <h4 className="font-semibold mb-1">Smart Contract Automation</h4>
                  <p className="text-sm text-gray-400">
                    Trustless execution of multi-party agreements and payments
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-regen-gold text-xl mt-1">✓</div>
                <div>
                  <h4 className="font-semibold mb-1">Immutable Audit Trail</h4>
                  <p className="text-sm text-gray-400">
                    Complete transparency and accountability for all transactions
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-regen-gold text-xl mt-1">✓</div>
                <div>
                  <h4 className="font-semibold mb-1">Planetary Impact Tracking</h4>
                  <p className="text-sm text-gray-400">
                    Measure and verify contributions to global sustainability goals
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="glass-effect inline-block px-8 py-4 rounded-lg">
            <p className="text-gray-400 mb-4">Ready to join the alliance?</p>
            <button className="bg-regen-gold text-regen-dark font-bold px-8 py-3 rounded-lg hover:bg-regen-gold/90 transition-all duration-300">
              Request Integration Access
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
