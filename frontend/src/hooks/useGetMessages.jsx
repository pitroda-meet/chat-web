import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";
const useGetMessages = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/message/${selectedUser?._id}`
        );
        dispatch(setMessages(response.data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchMessages();
  }, [selectedUser]);
};

export default useGetMessages;
