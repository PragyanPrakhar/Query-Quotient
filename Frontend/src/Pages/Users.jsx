import { useEffect, useState } from "react";
import { Button, Card, Drawer, Form, Input, Select, Space, Table } from "antd";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [selectedUserId, setSelectedUserId] = useState(null);

    const fetchUsers = async () => {
        try {
            const res = await fetch(
                import.meta.env.VITE_API_URL + "/api/auth/users",
                {
                    credentials: "include",
                }
            );
            const data = await res.json();
            if (res.ok) {
                setUsers(data.users);
            } else {
                toast.error(data.error || "Failed to fetch users");
            }
        } catch (err) {
            toast.error("Error fetching users");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const updateUser = async (userData) => {
        try {
            const res = await fetch(
                import.meta.env.VITE_API_URL + "/api/auth/update-user",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(userData),
                }
            );
            const data = await res.json();
            if (res.ok) {
                // toast.success("User updated successfully!");
                toast.success(data.message || "User updated successfully!");
                fetchUsers();
                setOpen(false);
                form.resetFields();
            } else {
                toast.error(data.message || "Failed to update user");
            }
        } catch (err) {
            toast.error("Error updating user");
        }
    };

    const columns = [
        {
            title: "S.No.",
            render: (_, __, index) => index + 1,
        },
        {
            title: "Email",
            dataIndex: "email",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Id",
            dataIndex: "_id",
            render: (text) => <span className="text-gray-500">{text}</span>,
        },
        {
            title: "Member Since",
            dataIndex: "createdAt",
            render: (text) => dayjs(text).format("DD/MM/YYYY"),
        },
        {
            title: "Role",
            dataIndex: "role",
        },
        {
            title: "Action",
            render: (_, record) => (
                <Space
                    onClick={() => {
                        form.setFieldsValue({
                            email: record.email,
                            role: record.role,
                            skills: record.skills || [],
                        });
                        setSelectedUserId(record._id);
                        setOpen(true);
                    }}
                >
                    <a>Update</a>
                </Space>
            ),
        },
    ];

    /* const onFinish = (values) => {
        updateUser(values);
    };
    */

    const onFinish = (values) => {
        const payload = {
            ...values,
            userId: selectedUserId,
        };
        updateUser(payload);
    };
    return (
        <div>
            <div className="h-[60vh] w-full rounded-2xl bg-cover bg-center bg-no-repeat">
                <Table
                    className="bg-white/10 backdrop-blur-md rounded-xl shadow"
                    columns={columns}
                    dataSource={users}
                    rowKey="_id"
                    pagination={{ pageSize: 7 }}
                />
            </div>
            <Drawer
                title="Update User"
                placement="right"
                width={500}
                onClose={() => setOpen(false)}
                open={open}
                extra={
                    <Space>
                        <Button onClick={() => form.resetFields()}>
                            Clear
                        </Button>
                    </Space>
                }
            >
                <Card title="User Info">
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input email!",
                                },
                            ]}
                        >
                            <Input
                                prefix={<ExclamationCircleOutlined />}
                                placeholder="Enter updated email"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Role"
                            name="role"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select a role!",
                                },
                            ]}
                        >
                            <Select placeholder="Select a role">
                                <Select.Option value="user">User</Select.Option>
                                <Select.Option value="admin">
                                    Admin
                                </Select.Option>
                                <Select.Option value="moderator">
                                    Moderator
                                </Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Skills" name="skills">
                            <Select
                                mode="tags"
                                style={{ width: "100%" }}
                                placeholder="Enter skills and press Enter"
                                tokenSeparators={[","]}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Update User
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Drawer>
        </div>
    );
};

export default Users;
