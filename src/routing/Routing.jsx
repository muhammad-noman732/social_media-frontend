import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupPage from "../pages/signup/SignupPage";
import LoginPage from "../pages/login/LoginPage";
import Profle from "../pages/userProfile/Profle";
import Layout from "../components/layout/Layout";
import ProtctedRoutes from "./ProtctedRoutes";
import PublicRoutes from "./PublicRoutes";
import Feed from "../pages/feeds/feed";
import SinglePost from  '../components/singlePost/SinglePost'

const Routing = () => {

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          element: <ProtctedRoutes />,
          children: [{ path: "/", element: <Feed /> },
            {path:'/profile' , element:<Profle/>},
            {path:`/post/:postId` , element: <SinglePost/>}
          ],
        },
        {
          element: <PublicRoutes />,
          children: [
            { path: "/signup", element: <SignupPage /> },
            { path: "/login", element: <LoginPage /> },
          ],
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default Routing;
