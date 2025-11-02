"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams, useRouter } from "next/navigation";
import { login as loginAction } from "@/app/admin/store/authSlice";
import { BASE_URL } from "../utils/config";
import api from "@/services/api";
import Image from "next/image";

export default function LoginPage() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const prefillEmail = searchParams.get("email");
    if (prefillEmail) setEmail(prefillEmail);
  }, [searchParams]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) return alert("Please enter all required fields.");

    try {
      const res = await api.post(`${BASE_URL}/auth/login`, { email, password });
      const { accessToken, data, role } = res.data;

      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", accessToken);
      }

      if (role !== "admin") {
        alert("You do not have permission to access the admin dashboard.");
        return;
      }

      dispatch(loginAction({ accessToken }));
      alert("Login successfully!");
      router.push("/admin/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to log in. Please check your credentials.");
    }
  };


  return <>
  <div className="flex justify-center items-center min-h-screen">
    <div className="flex w-[60%] h-[50%] bg-white rounded-2xl shadow-lg overflow-hidden mx-auto items-center justify-center">
      {/* Left image */}
      <div className="hidden md:block w-1/2">
        <img
          src="https://i.pinimg.com/736x/55/46/94/554694bd7f04790c18110fcd03345428.jpg"
          alt="Login"
          className="object-cover w-full h-full"
        />
      </div>
      {/* Right form */}
       <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center">
              <div className="flex flex-col items-center mb-6">
                <img src="https://i.pinimg.com/1200x/53/c3/6f/53c36f19e82b4366b680d309972f3bd3.jpg" alt="User" 
                className="h-20 w-20 object-cover rounded-full" />
                <h4 className="text-2xl font-semibold text-gray-800 mt-3">Login to use Travel World Admin</h4>
              </div>

              <form onSubmit={handleLogin} className="w-full space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <button
                  type="submit"
                  className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
                >
                  Login 
                </button>
              </form>
            </div>
    </div>
  </div>
  </>