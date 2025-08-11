"use client"

import { Link, NavLink } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../provider/AuthProvider"
import swal from "sweetalert"
import { Menu, X, Sun, Moon, LogOut, LayoutDashboard } from "lucide-react"

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleSignOut = () => {
    logOut()
      .then((result) => {
        console.log(result.user)
        swal("Are you sure you want to do this?", {
          buttons: ["Oh noez!", true],
        })
      })
      .catch()
  }

  const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light")

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }

  useEffect(() => {
    localStorage.setItem("theme", theme)
    const localTheme = localStorage.getItem("theme")
    document.querySelector("html")?.setAttribute("data-theme", localTheme || "light")
  }, [theme])

  const navigationLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          `relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            isPending
              ? "text-blue-300"
              : isActive
                ? "text-white bg-white/10 shadow-lg backdrop-blur-sm border border-white/20"
                : "text-blue-100 hover:text-white hover:bg-white/5"
          }`
        }
        onClick={() => setIsMenuOpen(false)}
      >
        Home
      </NavLink>
      <NavLink
        to="/products"
        className={({ isActive, isPending }) =>
          `relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            isPending
              ? "text-blue-300"
              : isActive
                ? "text-white bg-white/10 shadow-lg backdrop-blur-sm border border-white/20"
                : "text-blue-100 hover:text-white hover:bg-white/5"
          }`
        }
        onClick={() => setIsMenuOpen(false)}
      >
        Products
      </NavLink>
    </>
  )

  return (
    <div className="relative z-50">
      {/* Luxury navbar with navy blue gradient */}
      <nav className="bg-blue-500 backdrop-blur-lg border-b border-white/10 shadow-2xl">
        <div className=" px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl"></div>
                <img
                  className="relative w-12 h-12 rounded-full shadow-lg ring-2 ring-white/30"
                  src="https://i.ibb.co/68zDmj3/shopping-bag.png"
                  alt="ByteBlitz Logo"
                />
              </div>
              <div className="hidden md:block">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  ByteBlitz
                </h1>
                <p className="text-xs text-blue-200 font-light">Premium Tech Store</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">{navigationLinks}</div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <div className="relative">
                <input
                  type="checkbox"
                  onChange={handleToggle}
                  className="sr-only"
                  id="theme-toggle"
                  checked={theme === "dark"}
                />
                <label
                  htmlFor="theme-toggle"
                  className="flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl cursor-pointer transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/30"
                >
                  {theme === "dark" ? (
                    <Moon className="w-5 h-5 text-blue-100" />
                  ) : (
                    <Sun className="w-5 h-5 text-yellow-300" />
                  )}
                </label>
              </div>

              {/* User Section */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 rounded-xl p-2 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/30"
                  >
                    <img
                      className="w-10 h-10 rounded-lg object-cover ring-2 ring-white/30"
                      src={user?.photoURL || "/placeholder.svg"}
                      alt="Profile"
                    />
                    <div className="hidden md:block text-left">
                      <p className="text-white font-medium text-sm">{user?.displayName}</p>
                      <p className="text-blue-200 text-xs">Premium Member</p>
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                      <div className="p-4 bg-gradient-to-r from-navy-900 to-blue-900">
                        <div className="flex items-center space-x-3">
                          <img
                            className="w-12 h-12 rounded-lg object-cover ring-2 ring-white/30"
                            src={user?.photoURL || "/placeholder.svg"}
                            alt="Profile"
                          />
                          <div>
                            <p className="text-white font-semibold">{user?.displayName}</p>
                            <p className="text-blue-200 text-sm">{user?.email}</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-2">
                        <Link
                          to="/dashboard/myproducts"
                          className="flex items-center space-x-3 w-full px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-xl transition-colors duration-200"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <LayoutDashboard className="w-5 h-5 text-blue-600" />
                          <span className="font-medium">Dashboard</span>
                        </Link>

                        <button
                          onClick={() => {
                            handleSignOut()
                            setIsDropdownOpen(false)
                          }}
                          className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-200"
                        >
                          <LogOut className="w-5 h-5" />
                          <span className="font-medium">Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login">
                  <button className="bg-white text-navy-900 hover:bg-blue-50 font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Login
                  </button>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/20"
              >
                {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-6 border-t border-white/10">
              <div className="flex flex-col space-y-2">{navigationLinks}</div>
            </div>
          )}
        </div>
      </nav>

      {/* Backdrop for dropdown */}
      {isDropdownOpen && <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)}></div>}
    </div>
  )
}

export default Navbar
