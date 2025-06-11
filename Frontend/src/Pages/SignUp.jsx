// import React from "react";
// import { Button, Checkbox, Form, Input } from "antd";
// import { UserOutlined } from "@ant-design/icons";
// import { MdOutlineEmail } from "react-icons/md";
// import { RiLockPasswordLine } from "react-icons/ri";

// const SignUp = () => {
//     const onFinish = async (values) => {
//         // console.log("Success:", values);
//         const data = await fetch(
//             import.meta.env.VITE_API_URL + "/api/auth/signup",
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(values),
//                 credentials: "include", // Include cookies in the request
//             }
//         );
//         // console.log("data:->  " + data.json());
//         const json = await data.json();
//         console.log("json:->  ", json);
//     };
//     const onFinishFailed = (errorInfo) => {
//         console.log("Failed:", errorInfo);
//     };
//     return (
//         <div>
//             <Form
//                 name="basic"
//                 layout="vertical"
//                 style={{ maxWidth: 600 }}
//                 initialValues={{ remember: true }}
//                 onFinish={onFinish}
//                 onFinishFailed={onFinishFailed}
//                 autoComplete="off"
//             >
//                 <Form.Item
//                     label="Username"
//                     name="username"
//                     rules={[
//                         {
//                             required: true,
//                             message: "Please input your username!",
//                         },
//                     ]}
//                 >
//                     <Input
//                         prefix={<UserOutlined />}
//                         placeholder="Enter your username"
//                     />
//                     {/* <p className="text-red-500">Username is not available</p>  */}
//                 </Form.Item>

//                 <Form.Item
//                     label="Email"
//                     name="email"
//                     rules={[
//                         {
//                             required: true,
//                             message: "Please enter your email!",
//                         },
//                     ]}
//                 >
//                     <Input
//                         prefix={<MdOutlineEmail />}
//                         placeholder="Enter your email"
//                     />
//                 </Form.Item>

//                 <Form.Item
//                     label="Password"
//                     name="password"
//                     rules={[
//                         {
//                             required: true,
//                             message: "Please input your password!",
//                         },
//                     ]}
//                 >
//                     <Input.Password
//                         prefix={<RiLockPasswordLine />}
//                         placeholder="Enter your password"
//                     />
//                 </Form.Item>

//                 <Form.Item label={null}>
//                     <Button type="primary" htmlType="submit">
//                         Submit
//                     </Button>
//                 </Form.Item>
//             </Form>
//         </div>
//     );
// };

// export default SignUp;

import React from "react";
import { Button, Form, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

const SignUp = () => {
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
        console.log("json:->  ", json);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
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
                        />
                    </Form.Item>

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
