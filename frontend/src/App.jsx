import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUsers } from "./redux/userSlice";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/login",
    element: <Login />,
  },
]);
function App() {
  const { authUser } = useSelector((store) => store.user);
  const { socket } = useSelector((store) => store.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      const socket = io(`${process.meta.env.VITE_API_URL}`, {
        query: { userId: authUser._id },
        withCredentials: true,
      });

      dispatch(setSocket(socket));
      socket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
      return () => {
        socket.close();
        dispatch(setSocket(null));
      };
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
        dispatch(setOnlineUsers([]));
      }
    }
  }, [authUser, dispatch]);
  return (
    <>
      <div className="flex items-center justify-center h-screen p-4">
        <RouterProvider router={router} />
      </div>
    </>
  );
}
export default App;
