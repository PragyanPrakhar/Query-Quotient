import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { userStore } from "../zustand/store";

const Authenticated = () => {
    const { user } = userStore();
    const navigate = useNavigate();
    console.log("Authenticated user:", user);
    useEffect(() => {
        if (user == null) {
            navigate("/signup", { replace: true });
        }
    }, [user, navigate]);
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default Authenticated;
