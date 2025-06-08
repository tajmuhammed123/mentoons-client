import { ChatState } from "./Context/ChatProvider";
import SingleChat from "../SingleChat";
import "../style.css";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <div
      className={`${
        selectedChat ? "flex" : "hidden"
      } md:flex flex-col items-center p-3 !bg-white w-full md:w-[68%] rounded-lg border`}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  );
};

export default Chatbox;