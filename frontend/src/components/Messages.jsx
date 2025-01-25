import Message from "./Message";
import { useSelector } from "react-redux";
import useGetMessages from "../hooks/useGetMessages";

import useGetRealTimeMessages from "../hooks/useGetRealTimeMessages";
const Messages = () => {
  useGetMessages();
  useGetRealTimeMessages();
  const { messages } = useSelector((store) => store.message);
  if (!messages) return;
  return (
    <>
      {messages.map((message) => {
        return <Message key={message._id} message={message} />;
      })}
    </>
  );
};

export default Messages;
