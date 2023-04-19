import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Concept from "./pages/Concept";
import Site from "./pages/Site";
import Analysis from "./pages/Analysis";
import NotFound from "./pages/NotFound";
import { RecoilRoot } from "recoil";
import Login from "./pages/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <NotFound />,
    },
    {
        path: "/concept",
        element: <Concept />,
        errorElement: <NotFound />,
    },
    {
        path: "/site",
        element: <Site />,
        errorElement: <NotFound />,
    },
    {
        path: "/analysis",
        element: <Analysis />,
        errorElement: <NotFound />,
    },
    {
        path: "/login/oauth2/code/kakao",
        element: <Login />,
        errorElement: <NotFound />,
    },
]);
function App() {
    return (
        <RecoilRoot>
            <RouterProvider router={router} />
        </RecoilRoot>
    );
}

export default App;
