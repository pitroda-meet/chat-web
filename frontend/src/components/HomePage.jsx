import { useEffect } from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const { authUser } = useSelector((store) => store.user);
  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser, navigate]);

  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-red-50 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default HomePage;
