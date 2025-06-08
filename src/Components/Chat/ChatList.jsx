import { useEffect, useState } from "react";
import { ChatState } from "./Components/Context/ChatProvider";
import MyChats from "./Components/MyChats";
import Chatbox from "./Components/Chatbox";

const ChatList = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full">
      <div className="w-full h-[91.5vh] p-5 flex justify-between">
        {user && !isMobileView && (
          <MyChats fetchAgain={fetchAgain} className="flex h-9" />
        )}

        {user && (
          <Chatbox
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
            className="flex h-9"
          />
        )}
      </div>
    </div>
  );
};

export default ChatList;