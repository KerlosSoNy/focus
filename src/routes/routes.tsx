import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Home from "../Pages/home/Home";
import Profile from "../Pages/profile/Profile";



export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      }, {
        path: "/profile",
        element: <Profile />
      }
    ],
  }

])