"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiMoney } from "react-icons/bi";
import BalanceModal from "./BalanceModal";
import BalanceHistoryModal from "./BalanceHistoryModal";

function decodeToken(token) {
  // decode jwt token
  const base64 = token.split(".")[1];
  const decodedValue = JSON.parse(window.atob(base64));

  return decodedValue;
}

export default function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLogin(true);
      setUser(decodeToken(accessToken));
    }
  }, []);

  function logoutAction() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLogin(false);
    setUser({});
  }

  return (
    <div className="flex bg-base-300 justify-center sticky top-0 z-10">
      <div className="navbar container">
        <div className="flex-1">
          <Link href={"/"} className="btn btn-ghost normal-case text-xl">
            daisyUI
          </Link>
        </div>
        <div className="flex-none">
          {isLogin ? (
            <>
              <span className="text-sm font-bold text-base-content mr-3">
                {user.username}
              </span>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <Image
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                      alt="profile"
                      width={40}
                      height={40}
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="justify-between"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Balance
                      <span className="badge">
                        <BiMoney />
                      </span>
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a onClick={logoutAction}>Logout</a>
                  </li>
                </ul>
              </div>
              {isModalOpen && (
                <BalanceModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  onHistoryClick={() => {
                    setIsHistoryModalOpen(true);
                    setIsModalOpen(false);
                  }}
                />
              )}
              {isHistoryModalOpen && (
                <BalanceHistoryModal
                  isOpen={isHistoryModalOpen}
                  onClose={() => setIsHistoryModalOpen(false)}
                />
              )}
            </>
          ) : (
            <Link href={"/login"} className="btn btn-ghost">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
