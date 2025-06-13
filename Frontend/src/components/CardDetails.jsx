import {
    MailOutlined,
    UserOutlined,
    ClockCircleOutlined,
    InfoCircleOutlined,
    StarOutlined,
    ScheduleOutlined,
    BulbOutlined,
} from "@ant-design/icons";
import { Modal, Tag, Divider, Button, Spin } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { userStore } from "../zustand/store";
import toast from "react-hot-toast";

const CardDetails = ({ ticket, open, setIsModalOpen }) => {
    const { user } = userStore();
    const [loading, setLoading] = useState(false);
    const [ticketData, setTicketData] = useState(null);

    const fetchTicket = async () => {
        if (!ticket?._id) return;
        setLoading(true);
        console.log("Fetching ticket details for ID:", ticket._id);
        try {
            const res = await fetch(
                import.meta.env.VITE_API_URL + `/api/tickets/${ticket._id}`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            const json = await res.json();
            console.log("Ticket fetch response:", json);
            if (!res.ok) throw new Error(json.message || "Failed to fetch");
            setTicketData(json.ticket);

            console.log("Ticket Data:", json?.ticket);
        } catch (err) {
            toast.error("Error loading ticket details");
        } finally {
            setLoading(false);
        }
    };

    const handleCloseTicket = async () => {
        try {
            const res = await fetch(
                import.meta.env.VITE_API_URL +
                    `/api/tickets/close-ticket/${ticket._id}`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );
            const json = await res.json();
            if (!res.ok)
                throw new Error(json.message || "Failed to close ticket");
            toast.success("Ticket closed successfully!");
            setIsModalOpen(false);
        } catch (err) {
            toast.error("Error closing ticket");
        }
    };

    useEffect(() => {
        if (open) fetchTicket();
    }, [open, ticket]);

    return (
        <Modal
            title={
                <div className="flex items-center gap-2 text-lg font-semibold">
                    <InfoCircleOutlined />{" "}
                    {ticketData?.title || "Ticket Details"}
                </div>
            }
            open={open}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
            width={600}
            bodyStyle={{
                maxHeight: "65vh",
                overflowY: "auto",
                paddingRight: "1rem",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
            }}
        >
            {loading ? (
                <div className="flex justify-center py-10">
                    <Spin />
                </div>
            ) : (
                ticketData && (
                    <div className="space-y-4 text-gray-700">
                        <div>
                            <Tag
                                icon={<ClockCircleOutlined />}
                                color="processing"
                            >
                                Status: {ticketData.status.toUpperCase()}
                            </Tag>
                            <Tag icon={<StarOutlined />} color="orange">
                                Priority:{" "}
                                {ticketData.priority?.toUpperCase() || "N/A"}
                            </Tag>
                        </div>

                        <Divider plain>Assigned Info</Divider>
                        <p>
                            <UserOutlined /> <strong>Assigned To:</strong>{" "}
                            {ticketData?.assignedTo?.email || "N/A"}
                        </p>
                        <p>
                            <MailOutlined /> <strong>Created By:</strong>{" "}
                            {console.log("Ticket Data is :-> ", ticketData)}
                            {console.log(
                                ticketData?.createdBy?.username || "N/A"
                            )}
                            {ticketData?.createdBy?.username || "N/A"}
                        </p>

                        <Divider plain>Timeline</Divider>
                        <p>
                            <ScheduleOutlined /> <strong>Created At:</strong>{" "}
                            {dayjs(ticketData?.createdAt).format(
                                "DD MMM YYYY, hh:mm A"
                            )}
                        </p>
                        <p>
                            <ScheduleOutlined /> <strong>Deadline:</strong>{" "}
                            {ticketData?.deadline
                                ? dayjs(ticketData.deadline).format(
                                      "DD MMM YYYY, hh:mm A"
                                  )
                                : "Not set"}
                        </p>

                        <Divider plain>Description</Divider>
                        <p>{ticketData?.description}</p>

                        {user?.role !== "user" && (
                            <>
                                <Divider plain>Helpful Notes</Divider>
                                <div className="bg-gray-50 border p-3 rounded text-sm whitespace-pre-wrap max-h-48 overflow-y-auto">
                                    {ticketData?.helpfulNotes || "None"}
                                </div>

                                <Divider plain>Required Skills</Divider>
                                <div className="flex flex-wrap gap-2">
                                    {ticketData?.relatedSkills?.map(
                                        (skill, i) => (
                                            <Tag
                                                key={i}
                                                icon={<BulbOutlined />}
                                                color="blue"
                                            >
                                                {skill}
                                            </Tag>
                                        )
                                    ) || "None"}
                                </div>
                            </>
                        )}

                        {user?.role !== "user" &&
                            ticketData.status !== "closed" && (
                                <Button
                                    onClick={handleCloseTicket}
                                    danger
                                    type="primary"
                                    className="mt-4 w-full"
                                >
                                    Close Ticket
                                </Button>
                            )}
                    </div>
                )
            )}
        </Modal>
    );
};

export default CardDetails;
