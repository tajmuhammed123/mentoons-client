import { useEffect, useRef } from "react";
import { ChatState } from "./Context/ChatProvider";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../Config/ChatLogistics";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div
      ref={chatContainerRef}
      style={{ maxHeight: "500px", overflowY: "auto" }}
    >
      {messages?.map((m, i) => {
        console.log(m, "sebde");

        const isOwnMessage = m.sender._id === user.user._id;

        console.log(isOwnMessage);
        console.log(user);

        return (
          <div style={{ display: "flex" }} key={i}>
            {/* {(isSameSender(messages, m, i, user.user._id) ||
              isLastMessage(messages, i, user.user._id)) && (
              <Tooltip content={m.sender.firstName + " " + m.sender.lastName}>
                <Avatar
                  variant="circular"
                  size="sm"
                  className="mr-2 mt-1 cursor-pointer"
                  alt={m.sender.firstName}
                  // src={m.sender.pic || ""}
                />
              </Tooltip>
            )} */}
            <span
              style={{
                backgroundColor: isOwnMessage ? "#F7941D" : "#F2F2F2",
                marginLeft: isSameSenderMargin(messages, m, i, user.user._id),
                marginTop: isSameUser(messages, m, i, user.user._id) ? 3 : 10,
                borderRadius: "6px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ScrollableChat;
