import {  FaHome} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";


import useAdmin from "../hooks/useAdmin";

import useModerator from "../hooks/useModerator";
import AdminDashboard from "./AdminDashboard";
import ModeratorDashboard from "./ModeratorDashboard";
import UserDashboard from "./UserDashboard";


// Import necessary icons and components

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isModerator]=useModerator();
    const isUser = !isAdmin && !isModerator;
    // Set to true for admin, false for other roles
    //const isAdmin=false;
   // const isModerator = true; // Set to true for moderator, false for other roles

    return (
        <div className="flex flex-col lg:flex-row">
            <div className="w-64 min-h-screen bg-blue-900 text-white">
                <ul className="menu p-4 text-xl">
                {isAdmin && <AdminDashboard />}
        {isModerator && <ModeratorDashboard />}
        {isUser && <UserDashboard />}
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
// {isAdmin && <AdminDashboard/>}
// {isInstructor && <InstructorDashboard/>}
// {isStudent && <StudentDashboard/>}
