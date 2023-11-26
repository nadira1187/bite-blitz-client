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
                element: <Details></Details>,
                loader:({params}) => fetch(`http://localhost:5000/products/${params.id}`),
            }
        ]
    },
    {
        path:'dashboard',
        element:<Dashboard></Dashboard>,
        children:[
            {
                path:'myproducts',
                element:<MyProduct></MyProduct>
            }
        ]
    }
]);