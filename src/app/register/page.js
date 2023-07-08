"use client";

import ButtonAccent from "@/components/ButtonAccent";
import Toast from "@/components/Toast";
import axios from "axios";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [render, setRender] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      redirect("/");
    }
    setRender(true);
  }, []);

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

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

  const resetAllFields = () => {
    setFullName("");
    setUsername("");
    setAge(0);
    setPassword("");
    setRetypePassword("");
  };

  async function handleSubmit(e) {
    e.preventDefault();

    setRegisterLoading(true);

    const data = {
      fullName,
      username,
      age: Number(age),
      password,
      retypePassword,
    };

    if (validateData(data)) {
      try {
        const res = await axios.post("/api/users", data);

        setToast({ type: "success", message: res.data.message });
        resetAllFields();
      } catch (error) {
        setToast({ type: "error", message: error.response.data.message });
      }
    }
    setRegisterLoading(false);
  }

  const validateData = ({
    fullName,
    username,
    age,
    password,
    retypePassword,
  }) => {
    if (
      fullName === "" ||
      username === "" ||
      age === 0 ||
      password === "" ||
      retypePassword === ""
    ) {
      setToast({ type: "error", message: "Please fill all the fields" });
      return false;
    }

    if (username.length < 3) {
      setToast({ type: "error", message: "Username must be at least 3 chars" });
      return false;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setToast({ type: "error", message: "Username must be alphanumeric" });
      return false;
    }

    if (password !== retypePassword) {
      setToast({ type: "error", message: "Passwords do not match" });
      return false;
    }
    return true;
  };

  return (
    <>
      {render && (
        <main className="flex justify-center items-center min-h-[90vh]">
          <div className="container py-10">
            <h1 className="text-4xl font-bold text-center mb-4">Register</h1>
            <form
              className="mx-auto form-control max-w-md gap-4"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered input-accent w-full"
                  value={fullName}
                  onChange={handleFullNameChange}
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  name="username"
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

              <ButtonAccent loading={registerLoading}>Register</ButtonAccent>

              <div className="flex flex-col gap-2 pt-4">
                <span className="label-text-alt">already have an account?</span>
                <Link href="/login" className="btn btn-outline btn-accent">
                  Login
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
