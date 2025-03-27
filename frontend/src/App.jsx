import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useDispatch, useSelector } from "react-redux";
import { setOnlineUsers } from "./redux/userSlice";
import { useEffect } from "react";
import { SocketProvider, useSocket } from "./SocketContext";
import io from "socket.io-client";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
]);

function AppContent() {
  const { authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const { socket, setSocket } = useSocket();

  useEffect(() => {
    if (authUser) {
      const socket = io(`${import.meta.env.VITE_API_URL}`, {
        query: { userId: authUser._id },
        withCredentials: true,
      });

      setSocket(socket);
      socket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
      return () => {
        socket.close();
        setSocket(null);
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
        dispatch(setOnlineUsers([]));
      }
    }
  }, [authUser, dispatch]);

  return <RouterProvider router={router} />;
}

function App() {
  return (
    <SocketProvider>
      <div className="flex items-center justify-center h-screen p-4">
        <AppContent />
      </div>
    </SocketProvider>
  );
}

export default App;
