
import { FaChartLine } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { RiCoupon4Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const AdminDashboard = ({ isCollapsed }) => {
    return (
        <div className="p-4" >
             <li >
                                <NavLink className="flex flex-row gap-2" to="/dashboard/statistics">
                                    <FaChartLine className="mt-1 text-2xl" /> {!isCollapsed && <span className="pl-1">Statistics</span>}
                                </NavLink>
                            </li>

                            <li>
                                <NavLink className="flex flex-row gap-2" to="/dashboard/manageuser">
                                    <FaUserGroup className="mt-1 text-2xl" /> {!isCollapsed && <span className="pl-1">Manage Users</span>}
                                </NavLink>
                            </li>

                            <li>
                                <NavLink className="flex flex-row gap-2" to="/dashboard/managecoupons">
                                    <RiCoupon4Line className="mt-1 text-2xl" /> {!isCollapsed && <span className="pl-1">Manage Coupons</span>}
                                </NavLink>
                            </li>
        </div>
    );
};

export default AdminDashboard;