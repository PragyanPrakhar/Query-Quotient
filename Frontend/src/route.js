import { createBrowserRouter } from "react-router";
import App from "./App";
import SignUp from "./Pages/SignUp";
import Root from "./layouts/Root";
import Not_Authenticated from "./layouts/Not_Authenticated";
import Authenticated from "./layouts/Authenticated";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Ticket from "./Pages/Ticket";
import Profile from "./Pages/Profile";
import Users from "./Pages/Users";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                path: "/",
                Component: Authenticated,
                children: [
                    {
                        path: "/",
                        Component: Dashboard,
                        children: [
                            {
                                path: "/",
                                Component: Ticket,
                            },
                            {
                                path: "/me",
                                Component: Profile,
                            },
                            {
                                path: "/users",
                                Component: Users,
                            },
                        ],
                    },
                ],
            },
            {
                path: "/",
                Component: Not_Authenticated,
                children: [
                    {
                        path: "/signup",
                        Component: SignUp,
                    },
                    {
                        path: "/login",
                        Component: Login,
                    },
                ],
            },
        ],
    },
]);
