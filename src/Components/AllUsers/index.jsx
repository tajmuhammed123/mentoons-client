import { useEffect, useState } from "react";
import { axiosUserInstance } from "../../Constants/axios";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { ChatState } from "../Chat/Components/Context/ChatProvider";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ConfirmBlock from "./confirmBlock";
import ConfirmReport from "./confirmReport";
import ConfirmUnblock from "./confirmUnblock";

function AllUsers() {
  const { setSelectedChat, chats, setChats } = ChatState();
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [blockModal, setBlockModal] = useState(false);
  const [unblockModal, setUnblockModal] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [report, setReport] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token.token}`,
        },
      };
      const { data } = await axiosUserInstance.get(`/allusers`, config);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleConnect = async (receiverId) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const senderId = userInfo.user._id;

      await axiosUserInstance.post(
        `/send-request`,
        { senderId, receiverId },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token.token}`,
          },
        }
      );

      toast.success("Connection request sent");
      fetchUsers();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error sending request");
    }
  };

  const handleBlock = async (blockId) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const userId = userInfo.user._id;

      await axiosUserInstance.post(
        `/block`,
        { userId, blockId },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token.token}`,
          },
        }
      );

      toast.success("User blocked");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to block user");
    }
  };

  const handleUnblock = async (unblockId) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const userId = userInfo.user._id;

      await axiosUserInstance.post(
        `/unblock`,
        { userId, unblockId },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token.token}`,
          },
        }
      );

      toast.success("User unblocked");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to unblock user");
    }
  };

  const handleChat = async (id) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const userId = userInfo.user._id;

      const { data } = await axiosUserInstance.post(
        `/accesschat`,
        {
          userId,
          mangId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token.token}`,
          },
        }
      );

      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }

      setSelectedChat(data);
      navigate("/allChats");
    } catch (error) {
      toast.error("Error starting chat");
    }
  };

  const handleAccept = async (senderId) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const receiverId = userInfo.user._id;

      await axiosUserInstance.post(
        `/accept-request`,
        { receiverId, senderId },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token.token}`,
          },
        }
      );

      toast.success("Connection accepted");
      fetchUsers();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to accept connection"
      );
    }
  };

  async function submitReport(id) {
    if (!report) {
      alert("Please enter a reason for reporting.");
      return;
    }

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token.token}`,
        },
      };
      const { data } = await axiosUserInstance.post(
        `/report`,
        {
          reporterId: id,
          description: report,
        },
        config
      );

      if (data?.status) {
        toast.success("Report submitted successfully.");
        setReportModal("");
        setReport("");
      } else {
        toast.error("Failed to submit report: " + data.error);
      }
    } catch (err) {
      toast.error("An error occurred while submitting the report.");
    }
  }

  return (
    <div className="flex align-center justify-center h-screen">
      <Card className="overflow-y-auto max-h-screen w-full max-w-4xl">
        <CardBody>
          <div className="mb-4 flex items-center">
            <button
              aria-label="Go Back"
              className="p-2 rounded hover:bg-gray-200 transition"
            >
              <img
                src="/images/ArrowLeftIcon.svg"
                alt="Back"
                className="w-5 h-5"
              />
            </button>
            <Typography variant="h5" color="blue-gray">
              Connect with like-minded parents
            </Typography>
          </div>
          <div className="divide-y divide-gray-200">
            {users.map((user, index) => (
              <div
                key={index}
                className="flex items-center justify-between pb-3 pt-3 last:pb-0"
              >
                <div className="flex items-center gap-x-3">
                  <Avatar
                    size="sm"
                    alt={user.firstName}
                    src={`https://picsum.photos/200?random=${index}`}
                  />
                  <div>
                    <Typography color="blue-gray" variant="h6">
                      {user.firstName} {user.lastName}
                    </Typography>
                    <Typography variant="small" color="gray">
                      {user.email}
                    </Typography>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  {!user.isConnected &&
                    !user.isPending &&
                    !user.isBlocked &&
                    !user.isUserBlocked &&
                    !user.isPendingAccept && (
                      <Button
                        variant="outlined"
                        className="border-[#F7941D] text-[#F7941D] mx-2"
                        onClick={() => handleConnect(user._id)}
                        disabled={user.isBlocked}
                      >
                        Connect
                      </Button>
                    )}

                  {user.isPending &&
                    !user.isUserBlocked &&
                    !user.isConnected && (
                      <Button
                        variant="outlined"
                        className="border-gray-400 text-gray-500 cursor-not-allowed mx-2"
                        disabled
                      >
                        Pending
                      </Button>
                    )}
                  {user.isPendingAccept && !user.isConnected && (
                    <Button
                      variant="filled"
                      className="text-white bg-green-600"
                      onClick={() => handleAccept(user._id)}
                    >
                      Accept
                    </Button>
                  )}

                  {/* {user.isConnected && (
                    <Button
                      variant="outlined"
                      className="border-green-500 text-green-500 cursor-not-allowed"
                      disabled
                    >
                      Connected
                    </Button>
                  )} */}

                  {!user.isBlocked &&
                    !user.isUserBlocked &&
                    user.isConnected && (
                      <Tooltip content="Chat">
                        <button
                          className="cursor-pointer mx-2"
                          onClick={() => handleChat(user._id)}
                        >
                          <img
                            src="/images/chat.svg"
                            className="w-7 h-7"
                            alt="Block"
                          />
                        </button>
                      </Tooltip>
                    )}
                  {!user.isBlocked && (
                    <Tooltip content="Block">
                      <button
                        onClick={() => (
                          setBlockModal(true), setSelectedId(user._id)
                        )}
                        className="mx-2"
                      >
                        <img
                          src="/images/block.svg"
                          className="w-7 h-7"
                          alt="Block"
                        />
                      </button>
                    </Tooltip>
                  )}
                  {user.isBlocked && (
                    <Tooltip content="Unblock">
                      <button
                        onClick={() => (
                          setUnblockModal(true), setSelectedId(user._id)
                        )}
                        className="mx-2"
                      >
                        <img
                          src="/images/unblock.svg"
                          className="w-7 h-7"
                          alt="Unblock"
                        />
                      </button>
                    </Tooltip>
                  )}
                  <Tooltip content="Report">
                    <button
                      onClick={() => (
                        setReportModal(true), setSelectedId(user._id)
                      )}
                      className="mx-2"
                    >
                      <img
                        src="/images/report.svg"
                        className="w-4 h-4"
                        alt="Report"
                      />
                    </button>
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
      <ToastContainer />
      <ConfirmBlock
        isOpen={blockModal}
        setIsOpen={setBlockModal}
        handleBlock={handleBlock}
        blockId={selectedId}
      />
      <ConfirmUnblock
        isOpen={unblockModal}
        setIsOpen={setUnblockModal}
        handleUnblock={handleUnblock}
        blockId={selectedId}
      />
      <ConfirmReport
        isOpen={reportModal}
        setIsOpen={setReportModal}
        submitReport={submitReport}
        Id={selectedId}
        report={report}
        setReport={setReport}
      />
    </div>
  );
}

export default AllUsers;
