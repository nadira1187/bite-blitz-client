import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/signup/Register";
import Products from "../pages/products/Products";
import Details from "../pages/details/Details";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
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
]);