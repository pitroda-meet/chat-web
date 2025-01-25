import React, { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMessages } from "../redux/messageSlice";
const SendInput = () => {
  const [message, setMessage] = useState("");
  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);
  const dispatch = useDispatch();
  const submithandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.apiurl}/api/v1/message/send/${selectedUser?._id}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data) {
        dispatch(setMessages([...messages, res?.data?.newMessage]));
        setMessage("");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message);
    }
  };
  return (
    <form className="px-4 my-3" onSubmit={submithandler}>
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Send a Message.."
          className="block w-full p-3 text-lg text-white border rounded-md bg-slate-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 flex items-center pr-3 end-0"
        >
          <IoSendSharp />
        </button>
      </div>
    </form>
  );
};

export default SendInput;
