import { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector } from "react-redux";

const MessageContainer = () => {
  const { selectedUser } = useSelector((store) => store.user);
  const { authUser } = useSelector((store) => store.user);
  if (!selectedUser)
    return (
      <div className="md:min-w-[550px]  flex flex-col items-center justify-center h-full bg-gray-100 text-gray-500 text-xl">
        <h1 className="text-4xl">hii {authUser?.fullName}</h1>
        <h1 className="text-2xl">Let's start Conversation</h1>
      </div>
    );

  return (
    <div className="md:min-w-[550px] h-full flex flex-col">
      <div className="flex items-center gap-4 p-3 text-white bg-slate-500">
        <div className="avatar">
          <div className="w-16 h-16 overflow-hidden border-2 border-indigo-500 rounded-full">
            <img
              src={selectedUser?.profilePhoto}
              alt="User Avatar"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-semibold capitalize">
            {selectedUser?.fullName}
          </p>
          <p className="text-sm">{selectedUser?.email}</p>
        </div>
      </div>

      <div className="flex-1 px-4 overflow-auto">
        <Messages />
      </div>

      {/* Input Section */}
      <div className="sticky bottom-0 ">
        <SendInput />
      </div>
    </div>
  );
};

export default MessageContainer;
