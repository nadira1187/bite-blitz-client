import { MdOutlineReviews } from "react-icons/md";
import { MdOutlineReportProblem } from "react-icons/md";
import { NavLink } from "react-router-dom";

const ModeratorDashboard = () => {
    return (
        <div>
             <li>
                                <NavLink className="flex flex-row gap-2" to="/dashboard/productreview">
                                    {/* Add moderator-specific icon */}
                                    <MdOutlineReviews className="mt-1" /> Product Review
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="flex flex-row gap-2" to="/dashboard/report">
                                    {/* Add moderator-specific icon */}
                                    <MdOutlineReportProblem className="mt-1" /> Reported Contents
                                </NavLink>
                            </li>
        </div>
    );
};

export default ModeratorDashboard;