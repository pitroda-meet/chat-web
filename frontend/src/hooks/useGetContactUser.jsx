import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUser } from "../redux/userSlice";

const useGetContactUser = () => {
  const dispatch = useDispatch();
  const { otherUsers } = useSelector((state) => state.user);
  useEffect(() => {
    const FetchContactUsers = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/users/contacts`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // Required to send cookies
          }
        );

        if (response.status === 200) {
          dispatch(setOtherUser(response.data.contacts));
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch contacts"
        );
      }
    };

    FetchContactUsers();
    return FetchContactUsers;
  }, [otherUsers]);
};

export default useGetContactUser;
