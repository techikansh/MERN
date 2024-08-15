import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(name);
    console.log(email);
    console.log(password);

    if (email === "" || password === "" || name === "") {
      setError("Name, Email & Password can't be empty!!");
    }

    // rest of the signUp logic
  };

  const eyeIcon = () => {
    if (showPassword === false) {
      return (
        <FaRegEyeSlash
          onClick={() => {
            setShowPassword((prev) => !prev);
          }}
          style={{ cursor: "pointer" }}
        />
      );
    } else {
      return (
        <FaRegEye
          onClick={() => {
            setShowPassword((prev) => !prev);
          }}
          style={{ cursor: "pointer" }}
        />
      );
    }
  };
  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center">
        <div className="w-96 bg-white border mt-28 px-7 py-10 rounded-lg">
          <form action="" onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">SignUp</h4>

            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <div className="flex items-center justify-center w-full  bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full bg-transparent rounded outline-none"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {eyeIcon()}
            </div>

            <p className="text-red-500 text-center mb-1 text-xs">{error}</p>

            <button action="submit" className="btn-primary">
              Create Account
            </button>

            <p className="text-center text-sm mt-4"> Already a Customer?{" "}
              <Link
                to={"/login"}
                className="underline font-medium text-primary"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
