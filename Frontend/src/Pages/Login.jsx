import { Button, Form, Input } from "antd";

import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Login = () => {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            const data = await fetch(
                import.meta.env.VITE_API_URL + "/api/auth/login",
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
                toast.error(json.error || "Login failed. Please try again.");
                console.error("Error logging in", json.error);
                return;
            }
            toast.success("Login successful!");
            navigate("/");
        } catch (error) {
            console.error("Error during login:", error);
            toast.error(
                "An error occurred while logging in. Please try again."
            );
            return;
        }
    };

    const onFinishFailed = (errorInfo) => {
        toast.error("Please fill all required fields correctly.");
        console.log("Failed:", errorInfo);
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
                        Login your account and get started
                    </p>
                </div>

                {/* Form container with glassmorphism effect */}
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-3xl shadow-2xl">
                    <Form
                        name="login"
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
                                    Email
                                </span>
                            }
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your email!",
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
                                className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-none rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                            >
                                Login
                            </Button>
                        </Form.Item>
                    </Form>

                    {/* Additional elements */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-400 text-sm">
                            Don't have an account?{" "}
                            <button
                                onClick={() => navigate("/signup")}
                                className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 cursor-pointer"
                            >
                                Sign up
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

export default Login;

// import { useState } from "react";
// import { Button, Form, Input } from "antd";
// import { MdOutlineEmail } from "react-icons/md";
// import { RiLockPasswordLine } from "react-icons/ri";
// import { useNavigate } from "react-router-dom";
// import { userStore } from "../zustand/store"; // Import your store

// const Login = () => {
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();
//     const { setUser } = userStore(); // Get the setUser function from your store

//     const onFinish = async (values) => {
//         setLoading(true);
//         try {
//             const data = await fetch(
//                 import.meta.env.VITE_API_URL + "/api/auth/login",
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify(values),
//                     credentials: "include",
//                 }
//             );
//             const json = await data.json();

//             if (json.error) {
//                 console.error("Error logging in:", json.error);
//                 // You might want to show an error message to the user here
//             } else {
//                 // Update the user state in your store with the returned user data
//                 setUser(json.user || json); // Adjust based on your API response structure
//                 navigate("/", { replace: true });
//             }
//         } catch (error) {
//             console.error("Login error:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const onFinishFailed = (errorInfo) => {
//         console.log("Failed:", errorInfo);
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
//                                 d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
//                                 clipRule="evenodd"
//                             />
//                         </svg>
//                     </div>
//                     <h1 className="text-3xl font-bold text-white mb-2">
//                         Welcome Back
//                     </h1>
//                     <p className="text-gray-400 text-sm">
//                         Sign in to your account to continue
//                     </p>
//                 </div>

//                 {/* Form container with glassmorphism effect */}
//                 <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-3xl shadow-2xl">
//                     <Form
//                         name="login"
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
//                                     Email
//                                 </span>
//                             }
//                             name="email"
//                             rules={[
//                                 {
//                                     required: true,
//                                     message: "Please input your email!",
//                                 },
//                                 {
//                                     type: "email",
//                                     message: "Please enter a valid email!",
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

//                         <Form.Item className="mb-0 pt-2">
//                             <Button
//                                 type="primary"
//                                 htmlType="submit"
//                                 loading={loading}
//                                 className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-none rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
//                             >
//                                 {loading ? "Signing In..." : "Sign In"}
//                             </Button>
//                         </Form.Item>
//                     </Form>

//                     {/* Additional elements */}
//                     <div className="mt-6 text-center">
//                         <p className="text-gray-400 text-sm">
//                             Don't have an account?{" "}
//                             <button
//                                 onClick={() => navigate("/signup")}
//                                 className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 cursor-pointer"
//                             >
//                                 Sign up
//                             </button>
//                         </p>
//                     </div>
//                 </div>

//                 {/* Footer */}
//                 <div className="text-center mt-8">
//                     <p className="text-gray-500 text-xs">
//                         By signing in, you agree to our Terms of Service and
//                         Privacy Policy
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

// export default Login;

// import { useState, useEffect } from "react";
// import { Button, Form, Input, Alert, Typography, Space, Divider } from "antd";
// import {
//     MailOutlined,
//     LockOutlined,
//     LoginOutlined,
//     UserOutlined,
// } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import { userStore } from "../zustand/store";

// import { motion } from "framer-motion";

// const { Title, Text, Paragraph } = Typography;

// const Login = () => {
//     const [loading, setLoading] = useState(false);
//     const [formError, setFormError] = useState("");
//     const navigate = useNavigate();
//     const { setUser } = userStore();
//     const toast = useToast();
//     const [form] = Form.useForm();

//     // Clear form error when form values change
//     useEffect(() => {
//         const subscription = form.getFieldsValue(true);
//         return () => {
//             setFormError("");
//         };
//     }, [form]);

//     const onFinish = async (values) => {
//         setLoading(true);
//         setFormError("");

//         try {
//             const response = await fetch(
//                 import.meta.env.VITE_API_URL + "/api/auth/login",
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify(values),
//                     credentials: "include",
//                 }
//             );

//             const data = await response.json();

//             if (!response.ok) {
//                 setFormError(
//                     data.error || "Invalid email or password. Please try again."
//                 );
//                 toast.error(
//                     "Login Failed",
//                     data.error ||
//                         "Invalid credentials. Please check your email and password."
//                 );
//                 return;
//             }

//             // Success case
//             setUser(data.user || data);
//             toast.success("Login Successful", "Welcome back!");
//             navigate("/", { replace: true });
//         } catch (error) {
//             console.error("Login error:", error);
//             setFormError(
//                 "Network error. Please check your connection and try again."
//             );
//             toast.error(
//                 "Connection Error",
//                 "Failed to connect to the server. Please try again later."
//             );
//         } finally {
//             setLoading(false);
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

//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="relative z-10 w-full max-w-md"
//             >
//                 {/* Logo/Illustration area */}
//                 <div className="text-center mb-8">
//                     <motion.div
//                         initial={{ scale: 0.8 }}
//                         animate={{ scale: 1 }}
//                         transition={{
//                             type: "spring",
//                             stiffness: 260,
//                             damping: 20,
//                             delay: 0.2,
//                         }}
//                         className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
//                     >
//                         <UserOutlined className="text-white text-3xl" />
//                     </motion.div>
//                     <Title
//                         level={2}
//                         style={{ color: "white", marginBottom: "4px" }}
//                     >
//                         Welcome Back
//                     </Title>
//                     <Text type="secondary">
//                         Sign in to your account to continue
//                     </Text>
//                 </div>

//                 {/* Form container with glassmorphism effect */}
//                 <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-3xl shadow-2xl">
//                     {formError && (
//                         <Alert
//                             message="Login Error"
//                             description={formError}
//                             type="error"
//                             showIcon
//                             closable
//                             className="mb-6"
//                             style={{
//                                 background: "rgba(255, 59, 48, 0.1)",
//                                 border: "1px solid rgba(255, 59, 48, 0.2)",
//                             }}
//                         />
//                     )}

//                     <Form
//                         form={form}
//                         name="login"
//                         layout="vertical"
//                         initialValues={{ remember: true }}
//                         onFinish={onFinish}
//                         autoComplete="off"
//                         className="space-y-2"
//                     >
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
//                                 {
//                                     type: "email",
//                                     message: "Please enter a valid email!",
//                                 },
//                             ]}
//                         >
//                             <Input
//                                 prefix={
//                                     <MailOutlined className="text-gray-400" />
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
//                             extra={
//                                 <div className="flex justify-end">
//                                     <Button
//                                         type="link"
//                                         className="p-0 h-auto text-xs text-gray-400 hover:text-blue-400"
//                                         onClick={() =>
//                                             navigate("/forgot-password")
//                                         }
//                                     >
//                                         Forgot password?
//                                     </Button>
//                                 </div>
//                             }
//                         >
//                             <Input.Password
//                                 prefix={
//                                     <LockOutlined className="text-gray-400" />
//                                 }
//                                 placeholder="Enter your password"
//                                 className="py-3 px-4 bg-white/5 border-white/20 text-white placeholder-gray-400 rounded-xl hover:border-blue-400/50 focus:border-blue-400 transition-all duration-200"
//                             />
//                         </Form.Item>

//                         <Form.Item className="mb-0 pt-4">
//                             <Button
//                                 type="primary"
//                                 htmlType="submit"
//                                 loading={loading}
//                                 icon={loading ? null : <LoginOutlined />}
//                                 className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-none rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
//                             >
//                                 {loading ? "Signing In..." : "Sign In"}
//                             </Button>
//                         </Form.Item>
//                     </Form>

//                     <Divider className="my-6 border-white/10">
//                         <Text type="secondary" className="text-xs px-2">
//                             OR
//                         </Text>
//                     </Divider>

//                     {/* Additional elements */}
//                     <div className="text-center">
//                         <Space direction="vertical" size={4}>
//                             <Text type="secondary">Don't have an account?</Text>
//                             <Button
//                                 type="link"
//                                 onClick={() => navigate("/signup")}
//                                 className="text-blue-400 hover:text-blue-300 font-medium p-0"
//                             >
//                                 Create an account
//                             </Button>
//                         </Space>
//                     </div>
//                 </div>

//                 {/* Footer */}
//                 <div className="text-center mt-8">
//                     <Text type="secondary" className="text-xs opacity-60">
//                         By signing in, you agree to our Terms of Service and
//                         Privacy Policy
//                     </Text>
//                 </div>
//             </motion.div>

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

//                 .ant-notification-notice {
//                     background: rgba(30, 30, 30, 0.85) !important;
//                     border: 1px solid rgba(255, 255, 255, 0.1) !important;
//                     backdrop-filter: blur(10px) !important;
//                     border-radius: 12px !important;
//                     box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2) !important;
//                 }

//                 .ant-notification-notice-message {
//                     color: white !important;
//                     font-weight: 600 !important;
//                 }

//                 .ant-notification-notice-description {
//                     color: rgba(255, 255, 255, 0.8) !important;
//                 }

//                 .ant-divider-horizontal.ant-divider-with-text {
//                     border-top-color: rgba(255, 255, 255, 0.1) !important;
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default Login;

// import { useState, useEffect } from "react";
// import { Button, Form, Input, Alert, Typography, Space, Divider } from "antd";
// import {
//     MailOutlined,
//     LockOutlined,
//     LoginOutlined,
//     UserOutlined,
// } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import { userStore } from "../zustand/store";
// import { motion } from "framer-motion";
// import { toast } from "react-hot-toast";

// const { Title, Text } = Typography;

// const Login = () => {
//     const [loading, setLoading] = useState(false);
//     const [formError, setFormError] = useState("");
//     const navigate = useNavigate();
//     const { setUser } = userStore();
//     const [form] = Form.useForm();

//     useEffect(() => {
//         return () => {
//             setFormError("");
//         };
//     }, [form]);

//     const onFinish = async (values) => {
//         setLoading(true);
//         setFormError("");

//         try {
//             const response = await fetch(
//                 import.meta.env.VITE_API_URL + "/api/auth/login",
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify(values),
//                     credentials: "include",
//                 }
//             );

//             const data = await response.json();

//             if (!response.ok) {
//                 setFormError(
//                     data.error || "Invalid email or password. Please try again."
//                 );
//                 toast.error(
//                     data.error ||
//                         "Invalid credentials. Please check your email and password."
//                 );
//                 return;
//             }

//             setUser(data.user || data);
//             toast.success("Login Successful! Welcome back.");
//             navigate("/", { replace: true });
//         } catch (error) {
//             console.error("Login error:", error);
//             setFormError(
//                 "Network error. Please check your connection and try again."
//             );
//             toast.error("Failed to connect to the server.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4 relative overflow-hidden">
//             {/* Background decorations */}
//             <div className="absolute inset-0 overflow-hidden">
//                 <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
//                 <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
//                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
//             </div>

//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="relative z-10 w-full max-w-md"
//             >
//                 <div className="text-center mb-8">
//                     <motion.div
//                         initial={{ scale: 0.8 }}
//                         animate={{ scale: 1 }}
//                         transition={{
//                             type: "spring",
//                             stiffness: 260,
//                             damping: 20,
//                             delay: 0.2,
//                         }}
//                         className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
//                     >
//                         <UserOutlined className="text-white text-3xl" />
//                     </motion.div>
//                     <Title
//                         level={2}
//                         style={{ color: "white", marginBottom: "4px" }}
//                     >
//                         Welcome Back
//                     </Title>
//                     <Text type="secondary">
//                         Sign in to your account to continue
//                     </Text>
//                 </div>

//                 <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-3xl shadow-2xl">
//                     {formError && (
//                         <Alert
//                             message="Login Error"
//                             description={formError}
//                             type="error"
//                             showIcon
//                             closable
//                             className="mb-6"
//                             style={{
//                                 background: "rgba(255, 59, 48, 0.1)",
//                                 border: "1px solid rgba(255, 59, 48, 0.2)",
//                             }}
//                         />
//                     )}

//                     <Form
//                         form={form}
//                         name="login"
//                         layout="vertical"
//                         onFinish={onFinish}
//                         autoComplete="off"
//                         className="space-y-2"
//                     >
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
//                                 {
//                                     type: "email",
//                                     message: "Please enter a valid email!",
//                                 },
//                             ]}
//                         >
//                             <Input
//                                 prefix={
//                                     <MailOutlined className="text-gray-400" />
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
//                             extra={
//                                 <div className="flex justify-end">
//                                     <Button
//                                         type="link"
//                                         className="p-0 h-auto text-xs text-gray-400 hover:text-blue-400"
//                                         onClick={() =>
//                                             navigate("/forgot-password")
//                                         }
//                                     >
//                                         Forgot password?
//                                     </Button>
//                                 </div>
//                             }
//                         >
//                             <Input.Password
//                                 prefix={
//                                     <LockOutlined className="text-gray-400" />
//                                 }
//                                 placeholder="Enter your password"
//                                 className="py-3 px-4 bg-white/5 border-white/20 text-white placeholder-gray-400 rounded-xl hover:border-blue-400/50 focus:border-blue-400 transition-all duration-200"
//                             />
//                         </Form.Item>

//                         <Form.Item className="mb-0 pt-4">
//                             <Button
//                                 type="primary"
//                                 htmlType="submit"
//                                 loading={loading}
//                                 icon={loading ? null : <LoginOutlined />}
//                                 className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-none rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
//                             >
//                                 {loading ? "Signing In..." : "Sign In"}
//                             </Button>
//                         </Form.Item>
//                     </Form>

//                     <Divider className="my-6 border-white/10">
//                         <Text type="secondary" className="text-xs px-2">
//                             OR
//                         </Text>
//                     </Divider>

//                     <div className="text-center">
//                         <Space direction="vertical" size={4}>
//                             <Text type="secondary">Don't have an account?</Text>
//                             <Button
//                                 type="link"
//                                 onClick={() => navigate("/signup")}
//                                 className="text-blue-400 hover:text-blue-300 font-medium p-0"
//                             >
//                                 Create an account
//                             </Button>
//                         </Space>
//                     </div>
//                 </div>

//                 <div className="text-center mt-8">
//                     <Text type="secondary" className="text-xs opacity-60">
//                         By signing in, you agree to our Terms of Service and
//                         Privacy Policy
//                     </Text>
//                 </div>
//             </motion.div>
//         </div>
//     );
// };

// export default Login;
