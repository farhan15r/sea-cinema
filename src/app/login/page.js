"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan logika atau tindakan yang diperlukan dengan nilai input
  };

  return (
    <main className="flex justify-center items-center h-[90vh]">
      <div className="container">
        <h1 className="text-4xl font-bold text-center mb-4">Login</h1>
        <form className="mx-auto form-control max-w-md gap-4" onSubmit={handleSubmit}>
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
            <span className="label-text-alt">Don&apos;t have an account?</span>
            <Link href="/register" className="btn btn-outline btn-accent">
              Register
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
