import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector((store) => store.user);

  useEffect(() => {
    scroll.current.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <div className="" ref={scroll}>
      <div
        className={`chat ${
          message?.senderId === authUser?._id ? "chat-end" : "chat-start"
        }`}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={
                message.senderId === authUser?._id
                  ? authUser?.profilePhoto
                  : selectedUser?.profilePhoto
              }
            />
          </div>
        </div>
        <div className="chat-header">
          <time className="text-black opacity-50">12:45</time>
        </div>
        <div className="chat-bubble text-w">{message.message}!</div>
      </div>
    </div>
  );
};

export default Message;
