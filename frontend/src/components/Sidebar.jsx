import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import OtherUsers from "./OtherUsers";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  logoutUser,
  setAuthUser,
  setOnlineUsers,
  setOtherUser,
  setSelectedUser,
} from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";
const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { otherUsers } = useSelector((store) => store.user);
  const { authUser } = useSelector((store) => store.user);

  if (authUser == null) navigate("/login");
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/users/logout`,
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success(res.data.message);
        localStorage.clear();

        // Dispatch Redux actions to reset user state
        dispatch(setOtherUser([]));
        dispatch(setMessages(null));
        dispatch(setSelectedUser(null));
        dispatch(setOnlineUsers(null));
        dispatch(logoutUser()); // Reset Redux user state

        // Clear all local storage including persisted Redux state

        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const [contactEmail, setContactEmail] = useState("");
  const submithandler = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/users/addcontact`,
        { contactEmail },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);

        const newContact = res.data.contacts;

        if (newContact) {
          dispatch(setOtherUser([...otherUsers, newContact]));
        }

        setContactEmail("");
        closeModal();
      }
    } catch (error) {
      console.error("Error adding contact:", error);
      toast.error(error.response?.data?.message || "Error adding contact");
    }
  };
  useEffect(() => {
    if (authUser == null) {
      navigate("/login");
    }
  }, [authUser, navigate]);

  return (
    <div className="flex flex-col p-4 border-r bg-stone-50 border-slate-900">
      <OtherUsers />

      <div className="flex flex-col gap-2 mt-4">
        <button className="btn btn-success" onClick={openModal}>
          Add contacts
        </button>

        <button onClick={logoutHandler} className="text-white bg-red-500 btn">
          Logout
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <h2 className="mb-4 text-lg font-semibold">Add New User</h2>
            <form className="flex flex-col gap-4" onSubmit={submithandler}>
              <input
                type="email"
                placeholder="Email"
                className="rounded-lg input input-bordered"
                onChange={(e) => setContactEmail(e.target.value)}
                value={contactEmail} // Ensure the email input is controlled
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
