// import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";


function Login() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/students');
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  return (
    <div className="p-10 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Login</h1>
      <form className="flex flex-col gap-4" onSubmit={SubmitHandler}>
        <input
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleChange}
          className="p-3 rounded-lg border-l-[15px] border-blue-500 border-soli bg-white"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="p-3 rounded-lg border-l-[15px] border-blue-500 border-soli bg-white"
        />
        <button
          disabled={loading}
          className="bg-slate-700
          w-[243.24px] h-[80.64px]  text-white  rounded-lg 
          uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <p className="text-red-700 mt-5">{error ?  'something went wrong' : ""}</p>
    </div>
  );
}

export default Login;
