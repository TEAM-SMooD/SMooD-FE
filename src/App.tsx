import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Concept from './pages/Concept';
import Site from './pages/Site';
import Analysis from './pages/Analysis';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound/>,
    // children: [
    //   {path: '/concept', element: <Concept/>},
    //   // {path: '/site', element: <Site/>},
    //   {path: '/analysis', element: <Analysis/>},
    // ], 
    // 여기 <Home /> 내에 <Outlet>으로 위치 준 부분에 바뀌며 들어올 자식 컴포넌트들
  },
  {
    path: '/site',
    element: <Site />,
    errorElement: <NotFound/>,
  },
  {
    path: '/concept',
    element: <Concept />,
    errorElement: <NotFound/>,
  },
])
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
