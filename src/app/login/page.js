"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { redirect } from 'next/navigation'

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [render, setRender] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      redirect("/");
    }
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
      setError(error.response.data.message);
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
              {error && (
                <div className="alert alert-error">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              )}
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
              <button className="btn btn-accent">Login</button>

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
    </>
  );
}
