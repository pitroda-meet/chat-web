import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUser } from "../redux/userSlice";

const useGetContactUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const FetchContactUsers = async () => {
      try {
        // axios.defaults.withCredentials = true;
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/users/contacts`,
          {
            headers: {
              "Content-Type": "application/json",
            },

            withCredentials: true,
          }
        );
        if (response.status === 200) {
          dispatch(setOtherUser(response.data.contacts));
        }
      } catch (error) {
        // Display error message to user
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "An error occurred while fetching contact users"
        );
      }
    };

    FetchContactUsers();
  }, []);
};

export default useGetContactUser;
