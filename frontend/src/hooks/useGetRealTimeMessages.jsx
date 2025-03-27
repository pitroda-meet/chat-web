import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";
import { useSocket } from "../SocketContext";

const useGetRealTimeMessages = () => {
  const { socket } = useSocket(); // ✅ Extract socket correctly
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      dispatch(setMessages((prevMessages) => [...prevMessages, newMessage]));
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, dispatch]); // Removed `messages` to prevent unnecessary re-renders
};

export default useGetRealTimeMessages;
