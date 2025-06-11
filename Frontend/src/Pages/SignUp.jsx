import React, { useState, useRef } from "react";
import { Button, Form, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router";

const SignUp = () => {
    const [usernameError, setUsernameError] = useState("");
    const [usernameStatus, setUsernameStatus] = useState(""); // "available", "taken", or ""
    const debounceRef = useRef(null);
    const navigate = useNavigate();
    const lastCheckedUsernameRef = useRef("");

    const onFinish = async (values) => {
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
            console.error("Error signing up:", json.error);
        }
        navigate("/", { replace: true });
    };

    const onFinishFailed = (errorInfo) => {
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
            setUsernameStatus("taken");
            setUsernameError("Error checking username");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="bg-white p-8 shadow-2xl rounded-2xl w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                    Create an Account
                </h2>

                <Form
                    name="signup"
                    layout="vertical"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please input your username!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="text-gray-400" />}
                            placeholder="Enter your username"
                            className="py-2"
                            onChange={(e) => checkUsername(e.target.value)}
                        />
                    </Form.Item>

                    {usernameError && (
                        <p
                            className={`text-sm transition-all duration-300  ${
                                usernameStatus === "available"
                                    ? "text-green-500"
                                    : "text-red-500"
                            }`}
                        >
                            {usernameError}
                        </p>
                    )}

                    <Form.Item
                        label="Email"
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
                            className="py-2"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
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
                            className="py-2"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default SignUp;
