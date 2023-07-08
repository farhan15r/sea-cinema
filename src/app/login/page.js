"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import tokenUtils from "../utils/tokenUtils";
import ButtonAccent from "@/components/ButtonAccent";
import Toast from "@/components/Toast";

export default function Home() {
  const [loginLoading, setLoginLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [render, setRender] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    if (tokenUtils.isLogin()) redirect("/");
    setRender(true);
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);

    const data = {
      username,
      password,
    };

    try {
      const res = await axios.post("/api/auth", data);

      if (res.status === 200) {
        const { accessToken, refreshToken } = res.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        window.location.href = "/";
      }
    } catch (error) {
      setToast({
        type: "error",
        message: error.response.data.message,
      });
      setLoginLoading(false);
    }
  };

  return (
    <>
      {render && (
        <main className="flex justify-center items-center h-[90vh]">
          <div className="container">
            <h1 className="text-4xl font-bold text-center mb-4">Login</h1>
            <form
              className="mx-auto form-control max-w-md gap-4"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered input-accent w-full"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Type here"
                  className="input input-bordered input-accent w-full"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>

              <ButtonAccent loading={loginLoading}>Login</ButtonAccent>

              <div className="flex flex-col gap-2 pt-4">
                <span className="label-text-alt">
                  Don&apos;t have an account?
                </span>
                <Link href="/register" className="btn btn-outline btn-accent">
                  Register
                </Link>
              </div>
            </form>
          </div>
        </main>
      )}
      {toast && <Toast toast={toast} setToast={setToast} />}
    </>
  );
}
