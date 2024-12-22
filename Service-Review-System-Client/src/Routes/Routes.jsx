import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../ErrorPage/ErrorPage";
import Home from "../Page/Home/Home";
import Services from "../Page/Services/Services";
import Login from "../Page/Login/Login";
import Register from "../Page/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import AddService from "../Page/AddService/AddService";
import MyReviews from "../Page/MyReviews/MyReviews";
 

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<ErrorPage></ErrorPage>,
      children: [
        {
            path:'/',
            element:<Home></Home>
        },
        {
          path:'/services',
          element:<Services></Services>
        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/register',
          element:<Register></Register>
        },
        {
          path:'/addService',
          element:<PrivateRoutes><AddService></AddService></PrivateRoutes>
        },
        {
          path:'/myReviews',
          element:<PrivateRoutes><MyReviews></MyReviews></PrivateRoutes>
        }
      ]
    },
  ]);