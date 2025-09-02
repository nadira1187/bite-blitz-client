
import { Link } from "react-router-dom"
import { Facebook, Twitter, Youtube, Mail, Phone, MapPin, ArrowUp } from "lucide-react"

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="mt-20 relative">
      {/* Luxury footer with navy blue gradient */}
      <footer className="bg-blue-800 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05),transparent_50%)]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-xl"></div>
                  <img
                    className="relative w-12 h-12 rounded-full shadow-lg ring-2 ring-white/30"
                    src="https://i.ibb.co/68zDmj3/shopping-bag.png"
                    alt="ByteBlitz Logo"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                    ByteBlitz
                  </h2>
                  <p className="text-blue-200 font-light">Premium Tech Store</p>
                </div>
              </div>
              <p className="text-blue-100 leading-relaxed mb-6 max-w-md">
                Discover innovation with our curated collection of cutting-edge tech accessories. Quality, performance,
                and style in every product.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/30 group"
                >
                  <Facebook className="w-5 h-5 text-blue-100 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/30 group"
                >
                  <Twitter className="w-5 h-5 text-blue-100 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/30 group"
                >
                  <Youtube className="w-5 h-5 text-blue-100 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-6 relative">
                Quick Links
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-white to-transparent"></div>
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/"
                    className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-blue-300 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-blue-300 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                    Products
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-blue-300 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-blue-300 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-6 relative">
                Contact Info
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-white to-transparent"></div>
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3 text-blue-100">
                  <Mail className="w-5 h-5 text-blue-300" />
                  <span>info@byteblitz.com</span>
                </li>
                <li className="flex items-center space-x-3 text-blue-100">
                  <Phone className="w-5 h-5 text-blue-300" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-start space-x-3 text-blue-100">
                  <MapPin className="w-5 h-5 text-blue-300 mt-0.5" />
                  <span>123 Tech Street, Digital City, TC 12345</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <p className="text-blue-200">© 2023 ByteBlitz Corporation Ltd. All rights reserved.</p>
                <p className="text-blue-300 text-sm mt-1">Crafted with ❤️ for tech enthusiasts</p>
              </div>

              {/* Back to Top Button */}
              <button
                onClick={scrollToTop}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-blue-100 hover:text-white px-6 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/30 group"
              >
                <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                <span className="font-medium">Back to Top</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
