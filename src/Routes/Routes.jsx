import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/signup/Register";
import Products from "../pages/products/Products";
import Details from "../pages/details/Details";
import ErrorPage from "../components/error/ErrorPage";
import Dashboard from "../layout/Dashboard";
import MyProduct from "../pages/dashboard/myProduct/MyProduct";
import MyProfile from "../pages/dashboard/myProfile/MyProfile";
import AddProduct from "../pages/addProduct/AddProduct";
import ManageUser from "../pages/dashboard/manageUser/ManageUser";
import ProductReview from "../pages/dashboard/productReview/ProductReview";
import Report from "../pages/dashboard/report/Report";
import PrivateRoute from "../components/private/PrivateRoute";
import Payment from "../pages/dashboard/payment/Payment";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement:<ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/products",
                element: <Products></Products>
            },
            {
                path: "/details/:id",
                element:<PrivateRoute><Details></Details></PrivateRoute> ,
                loader:({params}) => fetch(`https://byte-blitz-server.vercel.app/products/${params.id}`),
            }
        ]
    },
    {
        path:'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children:[
            {
                path:'myproducts',
                element:<MyProduct></MyProduct>
            },
            {
                path:'myprofile',
                element:<MyProfile></MyProfile>
            },
            {
                path:'addproduct',
                element:<AddProduct></AddProduct>
            },
            {
                path:'payment',
                element:<Payment></Payment>
            },
            //admin routes
            {
                path:'manageuser',
                element:<ManageUser></ManageUser>
            },
            //moderator routes
            {
                path:'productreview',
                element:<ProductReview></ProductReview>
            },
            {
                path:'report',
                element:<Report></Report>
            },
        ]
    }
]);