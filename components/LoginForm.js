import React, { useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/auth";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import isTokennotPresent from '../middlewares/auth_required';
import isTokenPresent from '../middlewares/no_auth_required';
import { useEffect } from "react";

export default function RegisterForm() {
  const { setToken } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => { isTokennotPresent() }, []);
  useEffect(() => { isTokenPresent() }, []);
  const login = () => {
    toast("Logging in...")
    axios
      .post("auth/login/", {
        username: username,
        password: password,
      })
      .then(function ({ data, status }) {
        console.log(data.token);
        localStorage.setItem("token", data.token);
        setToken(data.token);
        router.push("/");
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Invalid username or password");
      });
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded-tl-3xl rounded-br-3xl shadow-xl text-black w-full">
          <h1 className="mb-8 text-3xl text-center" style={{ color: '#001858' }}>Login</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="inputUsername"
            id="inputUsername"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="inputPassword"
            id="inputPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button
            type="submit"
            className="w-full text-center py-3 rounded-full bg-transparent text-green-500 hover:text-white hover:bg-green-500 border border-green-500 hover:border-transparent focus:outline-none my-1"
            onClick={login}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
