import { useEffect, useState } from "react";
import {
    Card,
    Descriptions,
    Avatar,
    Spin,
    Alert,
    Tag,
    Typography,
    Row,
    Col,
    Statistic,
    Divider,
    Space,
} from "antd";
import {
    UserOutlined,
    MailOutlined,
    CalendarOutlined,
    IdcardOutlined,
    SafetyCertificateOutlined,
    TeamOutlined,
    TrophyOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

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
                        credentials: "include",
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
            <div className="flex justify-center items-center min-h-[60vh]">
                <Spin size="large" tip="Loading profile information..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-xl mx-auto my-6">
                <Alert
                    message="Profile Error"
                    description={error}
                    type="error"
                    showIcon
                    action={
                        <a onClick={() => window.location.reload()}>
                            Try Again
                        </a>
                    }
                />
            </div>
        );
    }

    // Get account age in days
    const accountAge = user
        ? Math.floor(
              (new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24)
          )
        : 0;

    // Role color mapping
    const getRoleColor = (role) => {
        const roleColors = {
            admin: "red",
            moderator: "purple",
            user: "blue",
        };
        return roleColors[role] || "blue";
    };

    return (
        <div
            className="profile-container"
            style={{
                padding: "20px",
                background: "linear-gradient(to right, #f0f2f5, #e6f7ff)",
            }}
        >
            <Row gutter={[24, 24]} justify="center">
                <Col xs={24} md={20} lg={18} xl={16}>
                    {/* Profile Header Card */}
                    <Card
                        className="profile-header-card"
                        style={{
                            borderRadius: "12px",
                            overflow: "hidden",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                        }}
                    >
                        <div
                            className="profile-header"
                            style={{
                                background:
                                    "linear-gradient(135deg, #1890ff11 0%, #52c41a11 100%)",
                                padding: "24px",
                                borderRadius: "8px",
                                position: "relative",
                            }}
                        >
                            <Row align="middle" gutter={[24, 24]}>
                                <Col xs={24} sm={8} className="text-center">
                                    <Avatar
                                        size={120}
                                        icon={<UserOutlined />}
                                        style={{
                                            backgroundColor: getRoleColor(
                                                user?.role
                                            ),
                                            boxShadow:
                                                "0 4px 8px rgba(0, 0, 0, 0.1)",
                                        }}
                                    />
                                    <div style={{ marginTop: "16px" }}>
                                        <Tag
                                            color={getRoleColor(user?.role)}
                                            style={{
                                                padding: "4px 12px",
                                                fontSize: "14px",
                                            }}
                                        >
                                            {user?.role?.toUpperCase()}
                                        </Tag>
                                    </div>
                                </Col>
                                <Col xs={24} sm={16}>
                                    <Title
                                        level={2}
                                        style={{ marginBottom: "8px" }}
                                    >
                                        {user?.username}
                                    </Title>
                                    <Space direction="vertical" size="small">
                                        <Text
                                            type="secondary"
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "8px",
                                            }}
                                        >
                                            <MailOutlined /> {user?.email}
                                        </Text>
                                        <Text
                                            type="secondary"
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "8px",
                                            }}
                                        >
                                            <CalendarOutlined /> Joined on{" "}
                                            {new Date(
                                                user?.createdAt
                                            ).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </Text>
                                    </Space>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>

                {/* Stats Row */}
                <Col xs={24} md={20} lg={18} xl={16}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={8}>
                            <Card
                                hoverable
                                style={{
                                    borderRadius: "8px",
                                    textAlign: "center",
                                }}
                            >
                                <Statistic
                                    title="Account Age"
                                    value={accountAge}
                                    suffix="days"
                                    prefix={<CalendarOutlined />}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Card
                                hoverable
                                style={{
                                    borderRadius: "8px",
                                    textAlign: "center",
                                }}
                            >
                                <Statistic
                                    title="Access Level"
                                    value={
                                        user?.role === "admin"
                                            ? "Full"
                                            : "Standard"
                                    }
                                    prefix={<SafetyCertificateOutlined />}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Card
                                hoverable
                                style={{
                                    borderRadius: "8px",
                                    textAlign: "center",
                                }}
                            >
                                <Statistic
                                    title="Status"
                                    value="Active"
                                    valueStyle={{ color: "#52c41a" }}
                                    prefix={<TrophyOutlined />}
                                />
                            </Card>
                        </Col>
                    </Row>
                </Col>

                {/* Detailed Information */}
                <Col xs={24} md={20} lg={18} xl={16}>
                    <Card
                        title={
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                }}
                            >
                                <TeamOutlined style={{ fontSize: "20px" }} />
                                <span>Profile Details</span>
                            </div>
                        }
                        style={{
                            borderRadius: "12px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                        }}
                    >
                        <Descriptions
                            bordered
                            column={{ xs: 1, sm: 1, md: 1 }}
                            size="middle"
                            labelStyle={{ fontWeight: "bold" }}
                            contentStyle={{ padding: "16px" }}
                        >
                            <Descriptions.Item
                                label={
                                    <Space>
                                        <IdcardOutlined /> Username
                                    </Space>
                                }
                                labelStyle={{ background: "#fafafa" }}
                            >
                                <div style={{ whiteSpace: "nowrap" }}>
                                    {user?.username}
                                </div>
                            </Descriptions.Item>

                            <Descriptions.Item
                                label={
                                    <Space>
                                        <MailOutlined /> Email Address
                                    </Space>
                                }
                                labelStyle={{ background: "#fafafa" }}
                            >
                                <div style={{ whiteSpace: "nowrap" }}>
                                    {user?.email}
                                </div>
                            </Descriptions.Item>

                            <Descriptions.Item
                                label={
                                    <Space>
                                        <SafetyCertificateOutlined /> Role &
                                        Permissions
                                    </Space>
                                }
                                labelStyle={{ background: "#fafafa" }}
                            >
                                <Tag
                                    color={getRoleColor(user?.role)}
                                    style={{ padding: "4px 12px" }}
                                >
                                    {user?.role?.toUpperCase()}
                                </Tag>
                                <div style={{ marginTop: "8px" }}>
                                    <Text type="secondary">
                                        {user?.role === "admin"
                                            ? "Full system access with administrative privileges"
                                            : "Standard user access with basic permissions"}
                                    </Text>
                                </div>
                            </Descriptions.Item>

                            <Descriptions.Item
                                label={
                                    <Space>
                                        <CalendarOutlined /> Account Information
                                    </Space>
                                }
                                labelStyle={{ background: "#fafafa" }}
                            >
                                <div>
                                    <div>
                                        <Text strong>Created on:</Text>{" "}
                                        {new Date(
                                            user?.createdAt
                                        ).toLocaleDateString("en-US", {
                                            weekday: "long",
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </div>
                                    <div style={{ marginTop: "8px" }}>
                                        <Text strong>Account age:</Text>{" "}
                                        {accountAge} days
                                    </div>
                                </div>
                            </Descriptions.Item>
                        </Descriptions>

                        <Divider />

                        <div style={{ textAlign: "center" }}>
                            <Text type="secondary">
                                Last profile update:{" "}
                                {new Date().toLocaleDateString()}
                            </Text>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ProfileDetails;
