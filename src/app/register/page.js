"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  const [error, setError] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRetypePasswordChange = (e) => {
    setRetypePassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const data = {
      username,
      age: Number(age),
      password,
      retypePassword,
    };

    validateData(data);

    console.log(data);
  };

  const validateData = ({username, age, password, retypePassword}) => {
    if (!username || !age || !password || !retypePassword) {
      setError("Please fill all the fields");
      return;
    } 

    if(username.length < 3) {
      setError("Username must be at least 3 characters long");
      return;
    }

    if(!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError("Username can only contain letters, numbers, and underscores");
      return;
    }

    if (password !== retypePassword) {
      setError("Passwords do not match");
      return;
    }
  };

  return (
    <main className="flex justify-center items-center min-h-[90vh]">
      <div className="container py-10">
        <h1 className="text-4xl font-bold text-center mb-4">Register</h1>
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
              <span className="label-text">Age</span>
            </label>
            <input
              type="number"
              placeholder="Type here"
              min={1}
              className="input input-bordered input-accent w-full"
              value={age}
              onChange={handleAgeChange}
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">New Password</span>
            </label>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered input-accent w-full"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Retype New Password</span>
            </label>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered input-accent w-full"
              value={retypePassword}
              onChange={handleRetypePasswordChange}
            />
          </div>
          <button className="btn btn-accent" type="submit">
            Register
          </button>

          <div className="flex flex-col gap-2 pt-4">
            <span className="label-text-alt">already have an account?</span>
            <Link href="/login" className="btn btn-outline btn-accent">
              Login
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}