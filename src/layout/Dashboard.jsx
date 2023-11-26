import { FaChartLine, FaHome, FaUserCircle } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { MdAddShoppingCart } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { RiCoupon4Line } from "react-icons/ri";


// Import necessary icons and components

const Dashboard = () => {
    const isAdmin = true; // Set to true for admin, false for other roles
    const isModerator = true; // Set to true for moderator, false for other roles

    return (
        <div className="flex flex-col lg:flex-row">
            <div className="w-64 min-h-screen bg-blue-900 text-white">
                <ul className="menu p-4 text-xl">
                    {isAdmin ? (
                        <>
                            <li>
                                <NavLink className="flex flex-row gap-2" to="/dashboard/myprofile">
                                    <FaChartLine className="mt-1" /> Statistics
                                </NavLink>
                            </li>

                            <li>
                                <NavLink className="flex flex-row gap-2" to="/dashboard/manageuser">
                                    <FaUserGroup className="mt-1" /> Manage Users
                                </NavLink>
                            </li>

                            <li>
                                <NavLink className="flex flex-row gap-2" to="/dashboard/addproduct">
                                    <RiCoupon4Line className="mt-1" /> Manage Coupons
                                </NavLink>
                            </li>
                        </>
                    ) : isModerator ? (
                        // Render moderator-specific menu items here
                        <>
                            <li>
                                <NavLink className="flex flex-row gap-2" to="/dashboard/moderator-section">
                                    {/* Add moderator-specific icon */}
                                    <IconModerator className="mt-1" /> Moderator Section
                                </NavLink>
                            </li>
                            {/* Add more moderator-specific menu items as needed */}
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink className="flex flex-row gap-2" to="/dashboard/myprofile">
                                    <FaUserCircle className="mt-1"></FaUserCircle> My Profile
                                </NavLink>
                            </li>

                            <li>
                                <NavLink className="flex flex-row gap-2" to="/dashboard/myproducts">
                                    <HiOutlineShoppingBag className="mt-1" /> My Products
                                </NavLink>
                            </li>

                            <li>
                                <NavLink className="flex flex-row gap-2" to="/dashboard/addproduct">
                                    <MdAddShoppingCart className="mt-1" /> Add Product
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
                <div className="divider bg-blue-200 p-2"></div>

                <ul className="menu p-4 text-xl">
                    <li>
                        <NavLink className="flex flex-row gap-2" to="/">
                            <FaHome className="mt-1"></FaHome> Home
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;
