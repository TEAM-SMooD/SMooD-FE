import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Concept from "./pages/Concept";
import Site from "./pages/Site";
import Analysis from "./pages/Analysis";
import NotFound from "./pages/NotFound";

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
]);
function App() {
    return <RouterProvider router={router} />;
}

export default App;
