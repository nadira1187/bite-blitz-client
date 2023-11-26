// Example in index.css or index.js
import 'tailwindcss/tailwind.css';
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
//import { FaUserCircle } from "react-icons/fa";
import swal from 'sweetalert';
const links = <>
    <NavLink to="/" className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ?
            "text-[#b8553a] font-bold underline" : ""
    }>Home</NavLink>
    <NavLink to="/products" className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ?
            "text-[#b8553a] font-bold underline" : ""
    }>Products</NavLink>
    <NavLink to="/myproducts" className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ?
            "text-[#b8553a] font-bold underline" : ""
    }>My Products</NavLink>

</>

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleSignOut = () => {
        logOut()
            .then(result => {
                console.log(result.user);
                swal("Are you sure you want to do this?", {
                    buttons: ["Oh noez!", true],
                });

            })
            .catch()
    }

    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme")
        : "light");
    const handleToggle = (e) => {
        if (e.target.checked) { setTheme("dark"); }
        else {
            setTheme("light");
        }
    };
    useEffect(() => {
        localStorage.setItem("theme", theme);
        const localTheme = localStorage.getItem("theme");
        document.querySelector("html").setAttribute("data-theme", localTheme);
    },
        [theme]);
    const dropdownItems = (
        <div className="card compact dropdown-content shadow bg-base-100 -left-20 origin-top-left">
            <div className="card-body w-32">
                <h2 className=""><Link to="/dashboard/myproducts">Dashboard</Link> </h2>
                <p>Your Profile</p>
                <button onClick={handleSignOut} className="btn btn-xs btn-primary text-white bg-blue-900 border-blue-900 normal-case">
                    Sign Out
                </button>
            </div>
        </div>
    );
    return (
        <div>
            <div className="navbar bg-base-100 rounded-xl p-4 mt-4">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 gap-4">
                            {links}
                        </ul>
                    </div>

                    <a className="btn btn-ghost normal-case invisible md:visible text-black-500  text-4xl font-bold">
                        <img className='w-[40px] h-[40px] ' src="https://i.ibb.co/68zDmj3/shopping-bag.png" alt="icon1" border="0" />ByteBlitz</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-4 px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end gap-0 lg:gap-5">
                    <label className="swap swap-rotate">

                        {/* this hidden checkbox controls the state */}
                        <input type="checkbox" onChange={handleToggle} />

                        {/* sun icon */}
                        <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

                        {/* moon icon */}
                        <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

                    </label>
                    <p>{user?.displayName}</p>
                    <div className={`relative ${user ? 'dropdown' : ''}`}>{user ?
                        <>

                            <label tabIndex={0} className=" text-info">
                                <img className='rounded-full w-12 h-12' src={user?.photoURL} alt="" />
                            </label>
                            {dropdownItems}
                        </>
                        :
                        <button className='btn btn-primary text-white bg-blue-900 border-blue-900 normal-case'>
                            <Link to='/login'>Login</Link>
                        </button>
                    }


                    </div>
                    {/* {
        user? 
        <button onClick={handleSignOut} className='btn btn-primary text-white bg-blue-900 border-blue-900 normal-case'>Sign Out</button>
        :
        <button className='btn btn-primary text-white bg-blue-900 border-blue-900 normal-case'> 
        <Link to='/login'>Login</Link>
        </button>
    } */}

                </div>
            </div>
        </div>

    );
};

export default Navbar;