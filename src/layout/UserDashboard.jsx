
import { FaUserCircle } from 'react-icons/fa';
import { HiOutlineShoppingBag } from "react-icons/hi";
import { MdAddShoppingCart } from "react-icons/md";
import { NavLink } from 'react-router-dom';
const UserDashboard = () => {
    return (
        <div>
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
        </div>
    );
};

export default UserDashboard;