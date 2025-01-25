import React from "react";
import OtherUser from "./OtherUser";
import useGetContactUser from "../hooks/useGetContactUser";
import { useSelector } from "react-redux";

const OtherUsers = () => {
  useGetContactUser();
  const { otherUsers } = useSelector((store) => store.user);

  if (!Array.isArray(otherUsers)) {
    console.error("otherUsers is not an array:", otherUsers);
    return <div>Error loading users.</div>;
  }

  if (otherUsers.length === 0) {
    return <div>No users available.</div>;
  }

  return (
    <div className="overflow-auto flex-1">
      {otherUsers
        .filter((user) => user && user._id)
        .map((user) => (
          <OtherUser key={user._id} user={user} />
        ))}
    </div>
  );
};

export default OtherUsers;
