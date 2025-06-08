import { useEffect, useState } from "react";
import "./style.css";
import io from "socket.io-client";
import { ChatState } from "./Components/Context/ChatProvider";
import ScrollableChat from "./Components/ScrollableChat";
import { Button, Input } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { axiosUserInstance } from "../../Constants/axios";
import { useNavigate } from "react-router-dom";

const ENDPOINT = process.env.REACT_APP_USER_ROUTE;
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  const GenerateError = (err) => {
    toast.error(err, {
      position: "top-center",
      theme: "colored",
      autoClose: 3000,
    });
  };

  const router = useNavigate();

  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();

  console.log(selectedChat);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token.token}`,
        },
      };

      setLoading(true);
      const { data } = await axiosUserInstance.get(
        `/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      GenerateError("Error Occured!,Failed to Load the Messages");
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axiosUserInstance.post(
          "/message",
          {
            content: newMessage,
            chatId: selectedChat,
            userId: user.user._id,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        GenerateError("Error Occured!,Failed to Send the Message");
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    const handleNewMessageReceived = (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    };

    socket.on("message received", handleNewMessageReceived);

    return () => {
      socket.off("message received", handleNewMessageReceived);
    };
  }, [selectedChatCompare, notification, fetchAgain, messages]);

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;

    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  console.log(selectedChat);

  const isMessageSender = (currentUser, selectedChat) => {
    return (
      selectedChat.sender && currentUser.user._id === selectedChat.sender._id
    );
  };

  return (
    <>
      {selectedChat ? (
        <>
          <div className="flex items-center gap-3 text-2xl  font-sans pb-3 border-b-2 w-full">
            <button
              onClick={()=>router("/allUsers")} // Replace with your function
              aria-label="Go Back"
              className="p-2 rounded hover:bg-gray-200 transition"
            >
              <img
                src="/images/ArrowLeftIcon.svg"
                alt="Back"
                className="w-5 h-5"
              />
            </button>
            <img
              src={`https://picsum.photos/200`}
              alt="User Avatar"
              className="h-9 w-9 rounded-full me-2"
            />
            {selectedChat.sender && selectedChat.sender.firstName}
          </div>

          <div className="flex flex-col justify-end bg-white w-full h-full rounded-lg pt-4 overflow-hidden">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="w-10 h-10 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="messages overflow-y-auto flex-1">
                <ScrollableChat messages={messages} user={user} />
              </div>
            )}

            {istyping && !isMessageSender(user, selectedChat) && (
              <p className="text-gray-500 text-sm mt-2">Typing...</p>
            )}

            <div className="pt-3 w-full">
              <div className="relative flex w-full items-center gap-2">
                <Input
                  type="text"
                  placeholder="Type something here..."
                  className="!bg-white"
                  value={newMessage}
                  onChange={typingHandler}
                  onKeyDown={sendMessage}
                  labelProps={{ className: "hidden" }}
                  containerProps={{ className: "flex-1" }}
                />
                <Button
                  onClick={sendMessage}
                  size="md"
                  className="bg-[#F7941D]"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <h1 className="text-3xl font-sans font-bold text-gray-600">
            Click on a user to start chatting
          </h1>
        </div>
      )}
    </>
  );
};

export default SingleChat;
