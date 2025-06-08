import { useEffect, useState } from "react";
import { ChatState } from "./Context/ChatProvider";
import { toast, ToastContainer } from "react-toastify";
import { Typography } from "@material-tailwind/react";
import { axiosUserInstance } from "../../../Constants/axios";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  console.log(chats);

  const GenerateError = (err) => {
    toast.error(err, {
      position: "top-center",
      theme: "colored",
      autoClose: 3000,
    });
  };

  const fetchChats = async () => {
    try {
      setIsLoading(true);
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token.token}`,
        },
      };
      const userId = user.user._id;
      const { data } = await axiosUserInstance.get(
        `/fetchchat/${userId}`,
        config
      );
      setChats(data);
      setIsLoading(false);
    } catch (error) {
      GenerateError("Failed to load chats");
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain, fetchChats]);

  // if (isLoading) return <Spinner />;

  return (
    <>
      <div
        className={`${
          selectedChat ? "hidden md:flex" : "flex"
        } flex-col items-center p-3 bg-white w-full md:w-[31%] rounded-lg border`}
      >
        {/* Header */}
        <div className="flex justify-between items-center w-full pb-3 px-3">
          <Typography variant="h5" className="font-sans">
            My Chats
          </Typography>
          {/* {user && <SideDrawer />} */}
        </div>

        {/* Chat list */}
        <div className="flex flex-col p-3 bg-gray-100 w-full h-full rounded-lg overflow-y-auto">
          {chats && chats.length > 0 ? (
            <div className="flex flex-col gap-2">
              {chats.map((chat, index) => {
                return (
                  <div
                    key={chat._id}
                    onClick={() => setSelectedChat(chat)}
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition ${
                      selectedChat?._id === chat._id
                        ? "bg-[#F7941D] text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-black"
                    }`}
                  >
                    <img
                      src={`https://picsum.photos/200?random=${index}`}
                      alt="avatar"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <Typography variant="paragraph" className="font-medium">
                        {chat.sender.firstName}
                      </Typography>
                      {chat.sender.latestMessage && (
                        <Typography
                          variant="small"
                          className="text-xs text-gray-700"
                        >
                          <strong>
                            {(chat.latestMessage.sender.receiver?.name ||
                              chat.latestMessage.sender.user?.name) + ":"}
                          </strong>{" "}
                          {chat.latestMessage.content.length > 50
                            ? chat.latestMessage.content.substring(0, 51) +
                              "..."
                            : chat.latestMessage.content}
                        </Typography>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <Typography variant="small" className="text-gray-500">
              No chats found
            </Typography>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default MyChats;
