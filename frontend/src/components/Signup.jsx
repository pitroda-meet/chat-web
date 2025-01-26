import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/users/register`,
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
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handleChackbox = (gender) => {
    // e.preventDefault();
    setUser({ ...user, gender: gender });
  };
  return (
    <div className="mx-auto min-w-96">
      <div className="w-full p-6 border border-gray-100 rounded-md bg-slate-400 bg-clip-padding backdrop-filter backdrop-blur-sm ">
        <h1 className="text-3xl font-bold text-center ">Signup</h1>
        <form onSubmit={handleSubmit}>
          <label className="p-2 label">
            <span className="text-base label-text">full Name</span>
          </label>
          <input
            type="text"
            className="w-full h-10 input input-bordered"
            placeholder="full Name"
            value={user.fullName}
            onChange={(e) => setUser({ ...user, fullName: e.target.value })}
          />

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
          <label className="p-2 label">
            <span className="text-base label-text">cornfirm password</span>
          </label>
          <input
            type="text"
            className="w-full h-10 input input-bordered"
            placeholder="enter cornfirm password"
            value={user.confirmPassword}
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
          />

          <div className="flex items-center my-4 ">
            <div className="flex items-center ">
              <p>Male</p>
              <input
                type="checkbox"
                className="mx-2 checkbox"
                checked={user.gender === "male"}
                onChange={() => handleChackbox("male")}
              />
            </div>
            <div className="flex items-center ">
              <p>Female</p>
              <input
                type="checkbox"
                className="mx-2 checkbox"
                checked={user.gender === "female"}
                onChange={() => handleChackbox("female")}
              />
            </div>
          </div>

          <p className="text-center ">
            {" "}
            Already have account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </p>
          <div className="p-1">
            <button
              type="submit "
              className="mt-2 btn btn-block btn-md border-slate-700 "
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
