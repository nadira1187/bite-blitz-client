/* eslint-disable react/prop-types */
import { FaUserCircle, FaUser } from "react-icons/fa"
import { HiOutlineShoppingBag } from "react-icons/hi"
import { MdAddShoppingCart } from "react-icons/md"
import { NavLink } from "react-router-dom"

const UserDashboard = ({ isCollapsed }) => {
  const menuItems = [
    {
      to: "/dashboard/myprofile",
      icon: FaUserCircle,
      label: "My Profile",
      description: "Personal information",
    },
    {
      to: "/dashboard/myproducts",
      icon: HiOutlineShoppingBag,
      label: "My Products",
      description: "Your product list",
    },
    {
      to: "/dashboard/addproduct",
      icon: MdAddShoppingCart,
      label: "Add Product",
      description: "Create new product",
    },
  ]

  return (
    <div className="space-y-2">
      {!isCollapsed && (
        <div className="mb-4 p-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2">
            <FaUser className="text-blue-600" />
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">User Panel</span>
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

export default UserDashboard
