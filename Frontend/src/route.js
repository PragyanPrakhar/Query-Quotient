import { createBrowserRouter } from "react-router";
import App from "./App";
import SignUp from "./Pages/SignUp";
import Root from "./layouts/Root";
import Not_Authenticated from "./layouts/Not_Authenticated";
import Authenticated from "./layouts/Authenticated";
import Dashboard from "./Pages/Dashboard";

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
                    
                ],
            },
        ],
    },
]);
