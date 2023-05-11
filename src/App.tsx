import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Concept from "./pages/Concept";
import Site from "./pages/Site";
import Analysis from "./pages/Analysis";
import NotFound from "./pages/NotFound";
import { RecoilRoot } from "recoil";
// import Login from "./pages/Login";
import MyLogin from "./pages/MyLogin";
import Mypage from "./pages/Mypage";
import Community from "./pages/Community";
import CommunityPostEach from "./components/CommuityPostEach";
import Chatting2 from "./socket/Chatting";

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
        path: "/community/*",
        element: <Community />,
        errorElement: <NotFound />,
    },
    {
        path: "/community/post/:postid",
        element: <Community />,
        errorElement: <NotFound />,
    },
    {
        path: "/mylogin",
        element: <MyLogin />,
        errorElement: <NotFound />,
    },
    {
        path: "/mypage",
        element: <Mypage />,
        errorElement: <NotFound />,
    },
    {
        path: "/test",
        element: <Chatting2 />,
    },
    // {
    //     path: "/login/oauth2/code/kakao",
    //     element: <Login />,
    //     errorElement: <NotFound />,
    // },
]);
function App() {
    return (
        <RecoilRoot>
            <RouterProvider router={router} />
        </RecoilRoot>
    );
}

export default App;
