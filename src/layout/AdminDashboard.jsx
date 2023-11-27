
import { FaChartLine } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { RiCoupon4Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";
const AdminDashboard = () => {
    return (
        <div>
             <li>
                                <NavLink className="flex flex-row gap-2" to="/dashboard/statistics">
                                    <FaChartLine className="mt-1" /> Statistics
                                </NavLink>
                            </li>

                            <li>
                                <NavLink className="flex flex-row gap-2" to="/dashboard/manageuser">
                                    <FaUserGroup className="mt-1" /> Manage Users
                                </NavLink>
                            </li>

                            <li>
                                <NavLink className="flex flex-row gap-2" to="/dashboard/managecoupons">
                                    <RiCoupon4Line className="mt-1" /> Manage Coupons
                                </NavLink>
                            </li>
        </div>
    );
};

export default AdminDashboard;