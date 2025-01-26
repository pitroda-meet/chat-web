import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAuthUser } from "../redux/userSlice";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/users/login`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      }
      dispatch(setAuthUser(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    }
    setUser({
      email: "",
      password: "",
    });
  };

  return (
    <div className="mx-auto min-w-96">
      <div className="w-full p-6 border border-gray-100 rounded-md bg-slate-400 bg-clip-padding backdrop-filter backdrop-blur-sm ">
        <h1 className="text-3xl font-bold text-center ">Sign in</h1>
        <form onSubmit={handleSubmit} action="">
          <label className="p-2 label">
            <span className="text-base label-text">email</span>
          </label>
          <input
            type="email"
            className="w-full h-10 input input-bordered"
            placeholder="enter email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />

          <label className="p-2 label">
            <span className="text-base label-text">password</span>
          </label>
          <input
            type="text"
            className="w-full h-10 input input-bordered"
            placeholder="enter password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <p className="mt-2 text-center">
            {" "}
            don't have account?{" "}
            <Link to="/signup" className="text-blue-600">
              signup
            </Link>
          </p>
          <div className="p-1">
            <button
              type="submit"
              className="mt-2 btn btn-block btn-md border-slate-700 "
            >
              login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
