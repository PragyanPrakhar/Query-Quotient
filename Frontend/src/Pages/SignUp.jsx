// import React, { useState, useRef } from "react";
// import { Button, Form, Input } from "antd";
// import { UserOutlined } from "@ant-design/icons";
// import { MdOutlineEmail } from "react-icons/md";
// import { RiLockPasswordLine } from "react-icons/ri";
// import { useNavigate } from "react-router";

// const SignUp = () => {
//     const [usernameError, setUsernameError] = useState("");
//     const [usernameStatus, setUsernameStatus] = useState(""); // "available", "taken", or ""
//     const debounceRef = useRef(null);
//     const navigate = useNavigate();
//     const lastCheckedUsernameRef = useRef("");

//     const onFinish = async (values) => {
//         const data = await fetch(
//             import.meta.env.VITE_API_URL + "/api/auth/signup",
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(values),
//                 credentials: "include",
//             }
//         );
//         const json = await data.json();
//         if (json.error) {
//             console.error("Error signing up:", json.error);
//         }
//         navigate("/", { replace: true });
//     };

//     const onFinishFailed = (errorInfo) => {
//         console.log("Failed:", errorInfo);
//     };

//     const checkUsername = (username) => {
//         if (username.length > 0 && username.length < 3) {
//             setUsernameError("Username must be at least 3 characters.");
//             setUsernameStatus("taken");
//             return;
//         }
//         if (debounceRef.current) clearTimeout(debounceRef.current);
//         if (!username) {
//             setUsernameError("");
//             setUsernameStatus("");
//             lastCheckedUsernameRef.current = "";
//             return;
//         }

//         debounceRef.current = setTimeout(() => {
//             checkUsernameAvailability(username);
//         }, 500);
//     };

//     const checkUsernameAvailability = async (username) => {
//         if (username === lastCheckedUsernameRef.current) return;
//         try {
//             const response = await fetch(
//                 import.meta.env.VITE_API_URL + "/api/auth/check-username",
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({ username }),
//                     credentials: "include",
//                 }
//             );
//             const json = await response.json();

//             if (json.available) {
//                 setUsernameStatus("available");
//                 setUsernameError("Username is available");
//             } else {
//                 setUsernameStatus("taken");
//                 setUsernameError("Username is already taken");
//             }
//             lastCheckedUsernameRef.current = username;
//         } catch (error) {
//             console.error("Error checking username:", error);
//             setUsernameStatus("taken");
//             setUsernameError("Error checking username");
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
//             <div className="bg-white p-8 shadow-2xl rounded-2xl w-full max-w-md">
//                 <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
//                     Create an Account
//                 </h2>

//                 <Form
//                     name="signup"
//                     layout="vertical"
//                     initialValues={{ remember: true }}
//                     onFinish={onFinish}
//                     onFinishFailed={onFinishFailed}
//                     autoComplete="off"
//                 >
//                     <Form.Item
//                         label="Username"
//                         name="username"
//                         rules={[
//                             {
//                                 required: true,
//                                 message: "Please input your username!",
//                             },
//                         ]}
//                         help={
//                             usernameStatus === "available" ||
//                             usernameStatus === "taken" ? (
//                                 <span
//                                     className={`text-sm ${
//                                         usernameStatus === "available"
//                                             ? "text-green-500"
//                                             : "text-red-500"
//                                     }`}
//                                 >
//                                     {usernameError}
//                                 </span>
//                             ) : null
//                         }
//                         validateStatus={
//                             usernameStatus === "available"
//                                 ? "success"
//                                 : usernameStatus === "taken"
//                                 ? "error"
//                                 : ""
//                         }
//                     >
//                         <Input
//                             prefix={<UserOutlined className="text-gray-400" />}
//                             placeholder="Enter your username"
//                             className="py-2"
//                             onChange={(e) => checkUsername(e.target.value)}
//                         />
//                     </Form.Item>

//                     <Form.Item
//                         label="Email"
//                         name="email"
//                         rules={[
//                             {
//                                 required: true,
//                                 message: "Please input your email!",
//                             },
//                         ]}
//                     >
//                         <Input
//                             prefix={
//                                 <MdOutlineEmail className="text-gray-400" />
//                             }
//                             placeholder="Enter your email"
//                             className="py-2"
//                         />
//                     </Form.Item>

//                     <Form.Item
//                         label="Password"
//                         name="password"
//                         rules={[
//                             {
//                                 required: true,
//                                 message: "Please input your password!",
//                             },
//                         ]}
//                     >
//                         <Input.Password
//                             prefix={
//                                 <RiLockPasswordLine className="text-gray-400" />
//                             }
//                             placeholder="Enter your password"
//                             className="py-2"
//                         />
//                     </Form.Item>

//                     <Form.Item>
//                         <Button
//                             type="primary"
//                             htmlType="submit"
//                             className="w-full bg-blue-600 hover:bg-blue-700"
//                         >
//                             Sign Up
//                         </Button>
//                     </Form.Item>
//                 </Form>
//             </div>
//         </div>
//     );
// };

// export default SignUp;

// import { useState, useRef } from "react";
// import { Button, Form, Input } from "antd";
// import { UserOutlined } from "@ant-design/icons";
// import { MdOutlineEmail } from "react-icons/md";
// import { RiLockPasswordLine } from "react-icons/ri";
// import { useNavigate } from "react-router-dom";

// const SignUp = () => {
//     const [usernameError, setUsernameError] = useState("");
//     const [usernameStatus, setUsernameStatus] = useState(""); // "available", "taken", or ""
//     const debounceRef = useRef(null);
//     const navigate = useNavigate();
//     const lastCheckedUsernameRef = useRef("");

//     const onFinish = async (values) => {
//         const data = await fetch(
//             import.meta.env.VITE_API_URL + "/api/auth/signup",
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(values),
//                 credentials: "include",
//             }
//         );
//         const json = await data.json();
//         if (json.error) {
//             console.error("Error signing up:", json.error);
//         }
//         navigate("/", { replace: true });
//     };

//     const onFinishFailed = (errorInfo) => {
//         console.log("Failed:", errorInfo);
//     };

//     const checkUsername = (username) => {
//         if (username.length > 0 && username.length < 3) {
//             setUsernameError("Username must be at least 3 characters.");
//             setUsernameStatus("taken");
//             return;
//         }
//         if (debounceRef.current) clearTimeout(debounceRef.current);
//         if (!username) {
//             setUsernameError("");
//             setUsernameStatus("");
//             lastCheckedUsernameRef.current = "";
//             return;
//         }

//         debounceRef.current = setTimeout(() => {
//             checkUsernameAvailability(username);
//         }, 500);
//     };

//     const checkUsernameAvailability = async (username) => {
//         if (username === lastCheckedUsernameRef.current) return;
//         try {
//             const response = await fetch(
//                 import.meta.env.VITE_API_URL + "/api/auth/check-username",
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({ username }),
//                     credentials: "include",
//                 }
//             );
//             const json = await response.json();

//             if (json.available) {
//                 setUsernameStatus("available");
//                 setUsernameError("Username is available");
//             } else {
//                 setUsernameStatus("taken");
//                 setUsernameError("Username is already taken");
//             }
//             lastCheckedUsernameRef.current = username;
//         } catch (error) {
//             console.error("Error checking username:", error);
//             setUsernameStatus("taken");
//             setUsernameError("Error checking username");
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4 relative overflow-hidden">
//             {/* Background decorative elements */}
//             <div className="absolute inset-0 overflow-hidden">
//                 <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
//                 <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
//                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
//             </div>

//             <div className="relative z-10 w-full max-w-md">
//                 {/* Logo/Illustration area */}
//                 <div className="text-center mb-8">
//                     <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
//                         <svg
//                             className="w-10 h-10 text-white"
//                             fill="currentColor"
//                             viewBox="0 0 20 20"
//                         >
//                             <path
//                                 fillRule="evenodd"
//                                 d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
//                                 clipRule="evenodd"
//                             />
//                         </svg>
//                     </div>
//                     <h1 className="text-3xl font-bold text-white mb-2">
//                         Join Us Today
//                     </h1>
//                     <p className="text-gray-400 text-sm">
//                         Create your account and get started
//                     </p>
//                 </div>

//                 {/* Form container with glassmorphism effect */}
//                 <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-3xl shadow-2xl">
//                     <Form
//                         name="signup"
//                         layout="vertical"
//                         initialValues={{ remember: true }}
//                         onFinish={onFinish}
//                         onFinishFailed={onFinishFailed}
//                         autoComplete="off"
//                         className="space-y-2"
//                     >
//                         <Form.Item
//                             label={
//                                 <span className="text-gray-200 font-medium">
//                                     Username
//                                 </span>
//                             }
//                             name="username"
//                             rules={[
//                                 {
//                                     required: true,
//                                     message: "Please input your username!",
//                                 },
//                             ]}
//                             help={
//                                 usernameStatus === "available" ||
//                                 usernameStatus === "taken" ? (
//                                     <span
//                                         className={`text-sm font-medium ${
//                                             usernameStatus === "available"
//                                                 ? "text-green-400"
//                                                 : "text-red-400"
//                                         }`}
//                                     >
//                                         {usernameError}
//                                     </span>
//                                 ) : null
//                             }
//                             validateStatus={
//                                 usernameStatus === "available"
//                                     ? "success"
//                                     : usernameStatus === "taken"
//                                     ? "error"
//                                     : ""
//                             }
//                         >
//                             <Input
//                                 prefix={
//                                     <UserOutlined className="text-gray-400" />
//                                 }
//                                 placeholder="Enter your username"
//                                 className="py-3 px-4 bg-white/5 border-white/20 text-white placeholder-gray-400 rounded-xl hover:border-blue-400/50 focus:border-blue-400 transition-all duration-200"
//                                 onChange={(e) => checkUsername(e.target.value)}
//                             />
//                         </Form.Item>

//                         <Form.Item
//                             label={
//                                 <span className="text-gray-200 font-medium">
//                                     Email
//                                 </span>
//                             }
//                             name="email"
//                             rules={[
//                                 {
//                                     required: true,
//                                     message: "Please input your email!",
//                                 },
//                             ]}
//                         >
//                             <Input
//                                 prefix={
//                                     <MdOutlineEmail className="text-gray-400" />
//                                 }
//                                 placeholder="Enter your email"
//                                 className="py-3 px-4 bg-white/5 border-white/20 text-white placeholder-gray-400 rounded-xl hover:border-blue-400/50 focus:border-blue-400 transition-all duration-200"
//                             />
//                         </Form.Item>

//                         <Form.Item
//                             label={
//                                 <span className="text-gray-200 font-medium">
//                                     Password
//                                 </span>
//                             }
//                             name="password"
//                             rules={[
//                                 {
//                                     required: true,
//                                     message: "Please input your password!",
//                                 },
//                             ]}
//                         >
//                             <Input.Password
//                                 prefix={
//                                     <RiLockPasswordLine className="text-gray-400" />
//                                 }
//                                 placeholder="Enter your password"
//                                 className="py-3 px-4 bg-white/5 border-white/20 text-white placeholder-gray-400 rounded-xl hover:border-blue-400/50 focus:border-blue-400 transition-all duration-200"
//                             />
//                         </Form.Item>

//                         <Form.Item className="mb-0 pt-4">
//                             <Button
//                                 type="primary"
//                                 htmlType="submit"
//                                 className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-none rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
//                             >
//                                 Create Account
//                             </Button>
//                         </Form.Item>
//                     </Form>

//                     {/* Additional elements */}
//                     <div className="mt-6 text-center">
//                         <p className="text-gray-400 text-sm">
//                             Already have an account?{" "}
//                             <button onClick={()=>navigate("/login")}  className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 cursor-pointer">
//                                 Sign in
//                             </button>
//                         </p>
//                     </div>
//                 </div>

//                 {/* Footer */}
//                 <div className="text-center mt-8">
//                     <p className="text-gray-500 text-xs">
//                         By creating an account, you agree to our Terms of
//                         Service and Privacy Policy
//                     </p>
//                 </div>
//             </div>

//             <style jsx global>{`
//                 .ant-input {
//                     background: rgba(255, 255, 255, 0.05) !important;
//                     border-color: rgba(255, 255, 255, 0.2) !important;
//                     color: white !important;
//                 }

//                 .ant-input:hover {
//                     border-color: rgba(59, 130, 246, 0.5) !important;
//                 }

//                 .ant-input:focus {
//                     border-color: rgb(59, 130, 246) !important;
//                     box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2) !important;
//                 }

//                 .ant-input-password {
//                     background: rgba(255, 255, 255, 0.05) !important;
//                     border-color: rgba(255, 255, 255, 0.2) !important;
//                 }

//                 .ant-input-password:hover {
//                     border-color: rgba(59, 130, 246, 0.5) !important;
//                 }

//                 .ant-input-password:focus-within {
//                     border-color: rgb(59, 130, 246) !important;
//                     box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2) !important;
//                 }

//                 .ant-input-affix-wrapper {
//                     background: rgba(255, 255, 255, 0.05) !important;
//                     border-color: rgba(255, 255, 255, 0.2) !important;
//                 }

//                 .ant-input-affix-wrapper:hover {
//                     border-color: rgba(59, 130, 246, 0.5) !important;
//                 }

//                 .ant-input-affix-wrapper:focus-within {
//                     border-color: rgb(59, 130, 246) !important;
//                     box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2) !important;
//                 }

//                 .ant-form-item-explain-error {
//                     color: rgb(248, 113, 113) !important;
//                 }

//                 .ant-form-item-explain-success {
//                     color: rgb(74, 222, 128) !important;
//                 }

//                 .ant-btn-primary {
//                     background: linear-gradient(
//                         to right,
//                         rgb(59, 130, 246),
//                         rgb(147, 51, 234)
//                     ) !important;
//                     border: none !important;
//                 }

//                 .ant-btn-primary:hover {
//                     background: linear-gradient(
//                         to right,
//                         rgb(37, 99, 235),
//                         rgb(126, 34, 206)
//                     ) !important;
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default SignUp;

import { useState, useRef } from "react";
import { Button, Form, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { userStore } from "../zustand/store";
import toast from "react-hot-toast";

const SignUp = () => {
    const [usernameError, setUsernameError] = useState("");
    const [usernameStatus, setUsernameStatus] = useState(""); // "available", "taken", or ""
    const [loading, setLoading] = useState(false);
    const debounceRef = useRef(null);
    const navigate = useNavigate();
    const lastCheckedUsernameRef = useRef("");
    const { setUser } = userStore();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const data = await fetch(
                import.meta.env.VITE_API_URL + "/api/auth/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                    credentials: "include",
                }
            );
            const json = await data.json();

            if (json.error) {
                toast.error("Error signing up: " + json.error);
                console.error("Error signing up:", json.error);
                // You might want to show an error message to the user here
            } else {
                // Update the user state in your store with the returned user data
                setUser(json.user || json); // Adjust based on your API response structure
                navigate("/", { replace: true });
            }
        } catch (error) {
            toast.error("Signup failed. Please try again.");
            console.error("Signup error:", error);
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        toast.error("Form submission failed. Please check your inputs.");
        console.log("Failed:", errorInfo);
    };

    const checkUsername = (username) => {
        if (username.length > 0 && username.length < 3) {
            setUsernameError("Username must be at least 3 characters.");
            setUsernameStatus("taken");
            return;
        }
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (!username) {
            setUsernameError("");
            setUsernameStatus("");
            lastCheckedUsernameRef.current = "";
            return;
        }

        debounceRef.current = setTimeout(() => {
            checkUsernameAvailability(username);
        }, 500);
    };

    const checkUsernameAvailability = async (username) => {
        if (username === lastCheckedUsernameRef.current) return;
        try {
            const response = await fetch(
                import.meta.env.VITE_API_URL + "/api/auth/check-username",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username }),
                    credentials: "include",
                }
            );
            const json = await response.json();

            if (json.available) {
                setUsernameStatus("available");
                setUsernameError("Username is available");
            } else {
                setUsernameStatus("taken");
                setUsernameError("Username is already taken");
            }
            lastCheckedUsernameRef.current = username;
        } catch (error) {
            toast.error("Error checking username. Please try again.");
            console.error("Error checking username:", error);
            setUsernameStatus("taken");
            setUsernameError("Error checking username");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Logo/Illustration area */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <svg
                            className="w-10 h-10 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Join Us Today
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Create your account and get started
                    </p>
                </div>

                {/* Form container with glassmorphism effect */}
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-3xl shadow-2xl">
                    <Form
                        name="signup"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        className="space-y-2"
                    >
                        <Form.Item
                            label={
                                <span className="text-gray-200 font-medium">
                                    Username
                                </span>
                            }
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your username!",
                                },
                            ]}
                            help={
                                usernameStatus === "available" ||
                                usernameStatus === "taken" ? (
                                    <span
                                        className={`text-sm font-medium ${
                                            usernameStatus === "available"
                                                ? "text-green-400"
                                                : "text-red-400"
                                        }`}
                                    >
                                        {usernameError}
                                    </span>
                                ) : null
                            }
                            validateStatus={
                                usernameStatus === "available"
                                    ? "success"
                                    : usernameStatus === "taken"
                                    ? "error"
                                    : ""
                            }
                        >
                            <Input
                                prefix={
                                    <UserOutlined className="text-gray-400" />
                                }
                                placeholder="Enter your username"
                                className="py-3 px-4 bg-white/5 border-white/20 text-white placeholder-gray-400 rounded-xl hover:border-blue-400/50 focus:border-blue-400 transition-all duration-200"
                                onChange={(e) => checkUsername(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item
                            label={
                                <span className="text-gray-200 font-medium">
                                    Email
                                </span>
                            }
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your email!",
                                },
                                {
                                    type: "email",
                                    message: "Please enter a valid email!",
                                },
                            ]}
                        >
                            <Input
                                prefix={
                                    <MdOutlineEmail className="text-gray-400" />
                                }
                                placeholder="Enter your email"
                                className="py-3 px-4 bg-white/5 border-white/20 text-white placeholder-gray-400 rounded-xl hover:border-blue-400/50 focus:border-blue-400 transition-all duration-200"
                            />
                        </Form.Item>

                        <Form.Item
                            label={
                                <span className="text-gray-200 font-medium">
                                    Password
                                </span>
                            }
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                                {
                                    min: 6,
                                    message:
                                        "Password must be at least 6 characters!",
                                },
                            ]}
                        >
                            <Input.Password
                                prefix={
                                    <RiLockPasswordLine className="text-gray-400" />
                                }
                                placeholder="Enter your password"
                                className="py-3 px-4 bg-white/5 border-white/20 text-white placeholder-gray-400 rounded-xl hover:border-blue-400/50 focus:border-blue-400 transition-all duration-200"
                            />
                        </Form.Item>

                        <Form.Item className="mb-0 pt-4">
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-none rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                            >
                                {loading
                                    ? "Creating Account..."
                                    : "Create Account"}
                            </Button>
                        </Form.Item>
                    </Form>

                    {/* Additional elements */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-400 text-sm">
                            Already have an account?{" "}
                            <button
                                onClick={() => navigate("/login")}
                                className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 cursor-pointer"
                            >
                                Sign in
                            </button>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-gray-500 text-xs">
                        By creating an account, you agree to our Terms of
                        Service and Privacy Policy
                    </p>
                </div>
            </div>

            <style jsx global>{`
                .ant-input {
                    background: rgba(255, 255, 255, 0.05) !important;
                    border-color: rgba(255, 255, 255, 0.2) !important;
                    color: white !important;
                }

                .ant-input:hover {
                    border-color: rgba(59, 130, 246, 0.5) !important;
                }

                .ant-input:focus {
                    border-color: rgb(59, 130, 246) !important;
                    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2) !important;
                }

                .ant-input-password {
                    background: rgba(255, 255, 255, 0.05) !important;
                    border-color: rgba(255, 255, 255, 0.2) !important;
                }

                .ant-input-password:hover {
                    border-color: rgba(59, 130, 246, 0.5) !important;
                }

                .ant-input-password:focus-within {
                    border-color: rgb(59, 130, 246) !important;
                    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2) !important;
                }

                .ant-input-affix-wrapper {
                    background: rgba(255, 255, 255, 0.05) !important;
                    border-color: rgba(255, 255, 255, 0.2) !important;
                }

                .ant-input-affix-wrapper:hover {
                    border-color: rgba(59, 130, 246, 0.5) !important;
                }

                .ant-input-affix-wrapper:focus-within {
                    border-color: rgb(59, 130, 246) !important;
                    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2) !important;
                }

                .ant-form-item-explain-error {
                    color: rgb(248, 113, 113) !important;
                }

                .ant-form-item-explain-success {
                    color: rgb(74, 222, 128) !important;
                }

                .ant-btn-primary {
                    background: linear-gradient(
                        to right,
                        rgb(59, 130, 246),
                        rgb(147, 51, 234)
                    ) !important;
                    border: none !important;
                }

                .ant-btn-primary:hover {
                    background: linear-gradient(
                        to right,
                        rgb(37, 99, 235),
                        rgb(126, 34, 206)
                    ) !important;
                }
            `}</style>
        </div>
    );
};

export default SignUp;
