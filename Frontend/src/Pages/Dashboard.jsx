import React, { useState } from "react";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Layout, Menu } from "antd";
import { NavLink, Outlet, useNavigate } from "react-router";

import { userStore } from "../zustand/store";
import toast from "react-hot-toast";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const { clearUser, user } = userStore();
    const { role } = user || {};
    console.log("ROLE:", role);


    const items = [
        getItem(<NavLink to={"/"}>Ticket</NavLink>, "1", <PieChartOutlined />),
        getItem(
            <NavLink to={"/me"}>Profile</NavLink>,
            "2",
            <DesktopOutlined />
        ),
        role === "admin" &&
            getItem(
                <NavLink to={"/users"}>Users</NavLink>,
                "3",
                <DesktopOutlined />
            ),
    ];
    const handleLogout = async () => {
        try {
            const data = await fetch(
                import.meta.env.VITE_API_URL + "/api/auth/logout",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include", // Include cookies in the request
                }
            );
            if (!data.ok) {
                throw new Error("Logout failed");
            }
            const response = await data.json();
            if (response.success) {
                clearUser();
                navigate("/login");
                toast.success("Logout successful");
            } else {
                toast.error("Logout failed. Please try again.");
            }
        } catch (error) {
            console.error("Logout failed:", error);
            toast.error("Logout failed. Please try again.");
            return;
        }
    };
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                theme="dark"
                style={{ backgroundColor: "" }} // ✅ Teal sidebar
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div className="text-xl font-bold text-white flex items-center justify-center h-16">
                    Query-Quotient
                </div>
                <Menu
                    theme="dark"
                    defaultSelectedKeys={["1"]}
                    mode="inline"
                    items={items}
                    style={{ backgroundColor: "", color: "white" }} // ✅ White text on teal
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        backgroundColor: "",
                        color: "white",
                        padding: "0 20px",
                    }}
                >
                    <div className="flex justify-end items-center w-full h-full">
                        <Button
                            onClick={handleLogout}
                            color="blue"
                            variant="solid"
                        >
                            Logout
                        </Button>
                    </div>
                </Header>
                <Content style={{ margin: "0 16px" }}>
                    <Breadcrumb
                        style={{ margin: "16px 0" }}
                        items={[{ title: "User" }, { title: "Ticket" }]}
                    />
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
                <Footer
                    style={{ textAlign: "center", backgroundColor: "#f0f2f5" }}
                >
                    <span style={{ color: "#00CC8E" }}>
                        Query-Quotient ©{new Date().getFullYear()} Created by
                        Pragyan
                    </span>
                </Footer>
            </Layout>
        </Layout>
    );
};
export default Dashboard;
