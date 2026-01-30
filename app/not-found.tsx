export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-regen-gold mb-4">404</h1>
        <p className="text-xl text-gray-400 mb-8">Page not found</p>
        <a href="/" className="glass-effect px-8 py-4 rounded-lg hover:bg-white/10 transition-all duration-300 inline-block">
          <span className="text-regen-gold font-semibold">Return Home</span>
        </a>
      </div>
    </div>
  )
}
