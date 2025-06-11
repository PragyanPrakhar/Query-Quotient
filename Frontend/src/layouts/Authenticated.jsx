// import React, { useEffect } from "react";
// import { Outlet, useNavigate } from "react-router";
// import { userStore } from "../zustand/store";

// const Authenticated = () => {
//     const { user } = userStore();
//     const navigate = useNavigate();
//     console.log("Authenticated user:", user);
//     useEffect(() => {
//         if (user == null) {
//             navigate("/signup", { replace: true });
//         }
//     }, [user, navigate]);
//     return (
//         <div>
//             <Outlet />
//         </div>
//     );
// };

// export default Authenticated;

import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { userStore } from "../zustand/store";

const Authenticated = () => {
    const { user, setUser } = userStore();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    console.log("Authenticated user:", user);

    useEffect(() => {
        const checkAuth = async () => {
            // If user is already in store, no need to check
            if (user) {
                setIsLoading(false);
                return;
            }

            try {
                // Check if user is authenticated by calling your auth endpoint
                const response = await fetch(
                    import.meta.env.VITE_API_URL + "/api/auth/me", // Adjust endpoint as needed
                    {
                        credentials: "include",
                    }
                );

                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    // User is not authenticated
                    navigate("/signup", { replace: true });
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                navigate("/signup", { replace: true });
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [user, navigate, setUser]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
                <div className="text-white text-lg">Loading...</div>
            </div>
        );
    }

    // If user is not authenticated, the useEffect will handle redirect
    if (!user) {
        return null;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
};

export default Authenticated;
