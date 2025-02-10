import { FaHome, FaArrowLeft } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import useAdmin from "../hooks/useAdmin";
import useModerator from "../hooks/useModerator";
import AdminDashboard from "./AdminDashboard";
import ModeratorDashboard from "./ModeratorDashboard";
import UserDashboard from "./UserDashboard";

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isModerator] = useModerator();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const isUser = !isAdmin && !isModerator;

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className="h-screen flex flex-col">
            {/* Header */}
            <header className="h-14 bg-gray-100 top-0 w-full fixed shadow z-50">
                <div className="flex justify-between items-center px-10 h-14">
                    <div className="flex items-center gap-x-14">
                        <div className="w-40">
                            <h2 className="text-md font-bold">Dashboard</h2>
                            <p className="text-gray-400 text-[12px]">
                                {isAdmin ? 'Admin' : isModerator ? 'Moderator' : 'User'}
                            </p>
                        </div>
                        <button
                            onClick={toggleSidebar}
                            className="hidden lg:block bg-gray-200 rounded-full transition-all duration-500 ease-in-out"
                        >
                            <FaArrowLeft className={`p-3 ${isSidebarCollapsed ? 'rotate-180' : 'rotate-0'}`} />
                        </button>
                    </div>

                    <div className="flex items-center gap-5">
                        <button className="bg-gray-200 px-3 py-2 rounded-sm">
                            <FiBell className="text-lg" />
                        </button>
                        <div className="relative">
                            <img
                                className="inline-block h-8 w-8 rounded-full ring-2 ring-white cursor-pointer"
                                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt="User"
                                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                            />
                            {isUserDropdownOpen && (
                                <ul className="absolute right-0 top-12 bg-white w-48 rounded shadow-md py-2">
                                    <li className="hover:bg-gray-100 px-4 py-2">Profile</li>
                                    <li className="hover:bg-gray-100 px-4 py-2">Settings</li>
                                    <li className="hover:bg-gray-100 px-4 py-2">Logout</li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex pt-14">
                {/* Sidebar */}
                <aside
                    className={`bg-gray-100 ${
                        isSidebarCollapsed ? 'lg:w-[60px]' : 'lg:w-[240px]'
                    } transition-all duration-500 ease-in-out fixed h-full`}
                >
                    <div className="flex flex-col justify-between h-full pt-4">
                        <ul className="flex flex-col gap-1">
                            {isAdmin && <AdminDashboard isCollapsed={isSidebarCollapsed} />}
                            {isModerator && <ModeratorDashboard isCollapsed={isSidebarCollapsed} />}
                            {isUser && <UserDashboard isCollapsed={isSidebarCollapsed} />}
                        </ul>

                        <div className="pb-4">
                            <div className="divider px-4"></div>
                            <ul className="flex flex-col gap-1 mt-2 px-4">
                                <li>
                                    <NavLink
                                        to="/"
                                        className="flex items-center py-2 text-gray-600 hover:bg-gray-200 rounded"
                                    >
                                        <FaHome className="min-w-[20px] text-center" />
                                        {!isSidebarCollapsed && <span className="ml-3">Home</span>}
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <div
                    className={`flex-1 p-5 transition-all duration-500 ease-in-out ${
                        isSidebarCollapsed ? 'ml-[60px]' : 'ml-0 lg:ml-[240px]'
                    }`}
                >
                    <Outlet />
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-50 p-4 text-center">
                <p>Copyright @2023</p>
            </footer>
        </div>
    );
};

export default Dashboard;