"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiMoney } from "react-icons/bi";
import { BsBoxArrowRight, BsTicketPerforated } from "react-icons/bs";
import BalanceModal from "./BalanceModal";
import BalanceHistoryModal from "./BalanceHistoryModal";
import tokenUtils from "@/app/utils/tokenUtils";
import MyTicketModal from "./MyTicketModal";

export default function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  useEffect(() => {
    if (tokenUtils.isLogin()) {
      setIsLogin(true);
      setUsername(tokenUtils.getUsername());
    }
  }, []);

  function logoutAction() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLogin(false);
    setUsername("");
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
                {username}
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
                    <a
                      className="justify-between"
                      onClick={() => setIsTicketModalOpen(true)}
                    >
                      My Ticket
                      <span className="badge">
                        <BsTicketPerforated />
                      </span>
                    </a>
                  </li>
                  <li>
                    <a onClick={logoutAction}>Logout
                    <span className="badge">
                        <BsBoxArrowRight />
                      </span>
                    </a>
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
              {
                isTicketModalOpen && (
                  <MyTicketModal
                    isOpen={isTicketModalOpen}
                    onClose={() => setIsTicketModalOpen(false)}
                  />
                )
              }
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
