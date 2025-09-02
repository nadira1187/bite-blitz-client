"use client"

import { FaHome, FaArrowLeft, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa"
import { FiBell } from "react-icons/fi"
import { NavLink, Outlet } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "@/provider/AuthProvider"
import useAdmin from "../hooks/useAdmin"
import useModerator from "../hooks/useModerator"
import AdminDashboard from "./AdminDashboard"
import ModeratorDashboard from "./ModeratorDashboard"
import UserDashboard from "./UserDashboard"

const Dashboard = () => {
  const [isAdmin] = useAdmin()
  const [isModerator] = useModerator()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const isUser = !isAdmin && !isModerator
  const { user, logOut } = useContext(AuthContext)
const handleSignOut = () => {
    logOut()
      .then((result) => {
        console.log(result.user)
        swal("Signed out successfully!", {
          icon: "success",
        })
      })
      .catch((err) => console.error(err))
  }
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  const getRoleColor = () => {
    if (isAdmin) return "bg-gradient-to-r from-red-500 to-red-600"
    if (isModerator) return "bg-gradient-to-r from-amber-500 to-amber-600"
    return "bg-gradient-to-r from-blue-500 to-blue-600"
  }

  const getRoleIcon = () => {
    if (isAdmin) return "👑"
    if (isModerator) return "🛡️"
    return "👤"
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="h-16 bg-gradient-to-r from-primary via-primary to-secondary shadow-lg border-b border-border fixed top-0 w-full z-50">
        <div className="flex justify-between items-center px-6 h-16">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-full ${getRoleColor()} flex items-center justify-center text-white font-bold shadow-lg`}
              >
                {getRoleIcon()}
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Dashboard</h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-blue-100">
                    {isAdmin ? "Administrator" : isModerator ? "Moderator" : "User"}
                  </span>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            <button
              onClick={toggleSidebar}
              className="hidden lg:flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/20"
            >
              <FaArrowLeft
                className={`text-white transition-transform duration-300 ${isSidebarCollapsed ? "rotate-180" : "rotate-0"}`}
              />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/20">
              <FiBell className="text-lg text-white" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center animate-pulse">
                3
              </span>
            </button>
            <div className="relative">
              <button
                className="flex items-center gap-3 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/20"
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              >
                <img
                  className="w-8 h-8 rounded-full ring-2 ring-white/30"
                  src={user.photoURL}
                  alt="User"
                />
                <span className="text-white text-sm font-medium hidden md:block">{user?.displayName}</span>
              </button>
              {isUserDropdownOpen && (
                <div className="absolute right-0 top-14 bg-card border border-border rounded-lg shadow-xl py-2 w-48 backdrop-blur-sm">
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-card-foreground hover:bg-muted transition-colors">
                    <FaUser className="text-sm" />
                    Profile
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-card-foreground hover:bg-muted transition-colors">
                    <FaCog className="text-sm" />
                    Settings
                  </button>
                  <hr className="my-2 border-border" />
                  <button onClick={() => {
                              handleSignOut()
                              setIsDropdownOpen(false)
                            }} className="w-full flex items-center gap-3 px-4 py-2 text-destructive hover:bg-destructive/10 transition-colors">
                    <FaSignOutAlt className="text-sm" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex pt-16">
        <aside
          className={`bg-sidebar border-r border-sidebar-border ${
            isSidebarCollapsed ? "lg:w-16" : "lg:w-64"
          } transition-all duration-300 ease-in-out fixed h-full shadow-lg backdrop-blur-sm`}
        >
          <div className="flex flex-col justify-between h-full pt-6">
            <div className="px-4">
              <div className="mb-6">
                <div
                  className={`text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 ${isSidebarCollapsed ? "text-center" : ""}`}
                >
                  {!isSidebarCollapsed && "Navigation"}
                </div>
              </div>
              <ul className="space-y-2">
                {isAdmin && <AdminDashboard isCollapsed={isSidebarCollapsed} />}
                {isModerator && <ModeratorDashboard isCollapsed={isSidebarCollapsed} />}
                {isUser && <UserDashboard isCollapsed={isSidebarCollapsed} />}
              </ul>
            </div>

            <div className="p-4 border-t border-sidebar-border">
              <ul className="space-y-2">
                <li>
                  <NavLink
                    to="/"
                    className="flex items-center gap-3 px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg transition-all duration-200 group"
                  >
                    <FaHome className="text-lg group-hover:scale-110 transition-transform" />
                    {!isSidebarCollapsed && <span className="font-medium">Home</span>}
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        <div
          className={`flex-1 transition-all duration-300 ease-in-out ${
            isSidebarCollapsed ? "ml-16" : "ml-0 lg:ml-64"
          } bg-background min-h-screen`}
        >
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </main>

      <footer className="bg-card border-t border-border p-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">© 2023 Dashboard System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Dashboard
