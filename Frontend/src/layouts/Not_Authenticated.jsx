import React from "react";
import { Outlet, useNavigate } from "react-router";
import { userStore } from "../zustand/store";

const Not_Authenticated = () => {
    const navigate = useNavigate();
    const { user } = userStore();
    if (user != null) {
        navigate("/"); // Redirect to home if user is authenticated
    }
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default Not_Authenticated;
