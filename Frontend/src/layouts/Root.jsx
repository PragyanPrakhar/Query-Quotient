import React, { useEffect } from "react";
import { Outlet } from "react-router";
import { userStore } from "../zustand/store";

const Root = () => {
    const { setUser } = userStore();
    useEffect(() => {
        // This is where you can add any global setup or side effects
        fetchProfileDetails();
    }, []);
    const fetchProfileDetails = async () => {
        try {
            const response = await fetch(
                import.meta.env.VITE_API_URL + "/api/auth/me",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include", // Include cookies in the request
                    // If you need to send a token, you can add it here
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setUser(data?.user);
        } catch (error) {
            console.error(
                "There has been a problem with your fetch operation:",
                error
            );
        }
    };
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default Root;
