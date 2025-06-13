import { useEffect, useState } from "react";
import { Card, Descriptions, Avatar, Spin, Alert, Tag } from "antd";
import {
    UserOutlined,
    MailOutlined,
    CalendarOutlined,
    IdcardOutlined,
} from "@ant-design/icons";

const ProfileDetails = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(
                    import.meta.env.VITE_API_URL + "/api/auth/me",
                    {
                        method: "GET",
                        credentials: "include", // if cookies/token is sent via browser
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Failed to fetch profile");
                }

                setUser(data.user);
                setError("");
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[40vh]">
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-xl mx-auto my-6">
                <Alert
                    message="Error"
                    description={error}
                    type="error"
                    showIcon
                />
            </div>
        );
    }

    return (
        <Card
            title={
                <div className="flex items-center gap-3">
                    <Avatar size={48} icon={<UserOutlined />} />
                    <span className="text-lg font-semibold">
                        Profile Overview
                    </span>
                </div>
            }
            className="max-w-3xl mx-auto mt-6 shadow-md"
        >
            <Descriptions bordered column={1} size="middle">
                <Descriptions.Item label="Username">
                    <span className="flex items-center gap-2">
                        <IdcardOutlined /> {user?.username}
                    </span>
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                    <span className="flex items-center gap-2">
                        <MailOutlined /> {user?.email}
                    </span>
                </Descriptions.Item>
                <Descriptions.Item label="Role">
                    <Tag color={user?.role === "admin" ? "red" : "blue"}>
                        {user?.role?.toUpperCase()}
                    </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Joined On">
                    <span className="flex items-center gap-2">
                        <CalendarOutlined />{" "}
                        {new Date(user?.createdAt).toLocaleDateString()}
                    </span>
                </Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export default ProfileDetails;
