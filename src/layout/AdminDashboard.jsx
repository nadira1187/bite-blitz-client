/* eslint-disable react/prop-types */
import { FaChartLine, FaUserFriends, FaCrown } from "react-icons/fa"
import { RiCoupon4Line } from "react-icons/ri"
import { NavLink } from "react-router-dom"

const AdminDashboard = ({ isCollapsed }) => {
  const menuItems = [
    {
      to: "/dashboard/statistics",
      icon: FaChartLine,
      label: "Statistics",
      description: "View analytics & reports",
    },
    {
      to: "/dashboard/manageuser",
      icon: FaUserFriends,
      label: "Manage Users",
      description: "User administration",
    },
    {
      to: "/dashboard/managecoupons",
      icon: RiCoupon4Line,
      label: "Manage Coupons",
      description: "Discount management",
    },
  ]

  return (
    <div className="space-y-2">
      {!isCollapsed && (
        <div className="mb-4 p-3 bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2">
            <FaCrown className="text-red-600" />
            <span className="text-xs font-semibold text-red-700 uppercase tracking-wide">Admin Panel</span>
          </div>
        </div>
      )}

      {menuItems.map((item) => (
        <li key={item.to} className="list-none">
          <NavLink
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group relative overflow-hidden ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`
            }
          >
            <item.icon
              className={`text-lg group-hover:scale-110 transition-transform ${isCollapsed ? "mx-auto" : ""}`}
            />
            {!isCollapsed && (
              <div className="flex-1">
                <span className="font-medium block">{item.label}</span>
                <span className="text-xs opacity-70">{item.description}</span>
              </div>
            )}
            <div className="absolute left-0 top-0 w-1 h-full bg-sidebar-primary transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
          </NavLink>
        </li>
      ))}
    </div>
  )
}

export default AdminDashboard
