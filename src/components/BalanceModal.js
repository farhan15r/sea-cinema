"use client";

import axiosJWT from "@/app/utils/axiosJWT";
import axios from "axios";
import { useEffect, useState } from "react";

function BalanceModal({ isOpen, onClose, onHistoryClick }) {
  const [currentBalance, setCurrentBalance] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      return null;
    }

    fetchData();
  }, [isOpen]);

  const fetchData = async () => {
    try {
      const response = await axiosJWT.get("/api/balance");
      const { balance } = response.data;

      setCurrentBalance(balance);
    } catch (error) {}
  };

  const updateBalance = async (data) => {
    try {
      const response = await axiosJWT.put("/api/balance", data);
      const { balance } = response.data;

      setCurrentBalance(balance);
    } catch (error) {}
  };

  const topUpAction = async (e) => {
    e.preventDefault();
    const topUpAmount = parseInt(document.getElementById("topup-amount").value);
    const topUpMethod = document.getElementById("topup-method").value;

    updateBalance({
      amount: topUpAmount,
      type: "topup",
      method: topUpMethod,
    });
  };

  const withdrawAction = async (e) => {
    e.preventDefault();
    const withdrawAmount = parseInt(
      document.getElementById("withdraw-amount").value
    );
    const withdrawMethod = document.getElementById("withdraw-method").value;

    updateBalance({
      amount: withdrawAmount,
      type: "withdraw",
      method: withdrawMethod,
    });
  };

  return (
    <dialog id="balance-modal" className="modal" onClick={() => onClose()} open>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-bold text-lg">Balance</h3>
        <p className="py-4">
          Your balance is <span className="font-bold">{currentBalance}</span>
        </p>

        <div className="collapse collapse-arrow bg-base-200 mb-2">
          <input type="radio" name="my-accordion-2" checked="checked" />
          <div className="collapse-title text-xl font-medium min-w-0">
            Top Up
          </div>
          <div className="collapse-content min-w-0">
            <form onSubmit={topUpAction}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Amount</span>
                </label>
                <input
                  id="topup-amount"
                  type="number"
                  defaultValue="10000"
                  min={10000}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <label className="label">
                  <span className="label-text">Payment Method</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  id="topup-method"
                >
                  <option value="GoPay">GoPay</option>
                  <option value="OVO">OVO</option>
                  <option value="Dana">Dana</option>
                </select>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-accent btn-md ml-auto">
                  Top Up
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200 mb-2">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium min-w-0">
            Withdraw
          </div>
          <div className="collapse-content min-w-0">
            <form onSubmit={withdrawAction}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Amount</span>
                </label>
                <input
                  id="withdraw-amount"
                  type="number"
                  defaultValue="10000"
                  min={10000}
                  max={currentBalance < 500000 ? currentBalance : 500000}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <label className="label">
                  <span className="label-text">Payment Method</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  id="withdraw-method"
                >
                  <option value="GoPay">GoPay</option>
                  <option value="OVO">OVO</option>
                  <option value="Dana">Dana</option>
                </select>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-accent btn-md ml-auto">
                  Withdraw
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex justify-between">
          <button className="btn btn-accent" onClick={() => onHistoryClick()}>
            History
          </button>
          <button className="btn btn-secondary" onClick={() => onClose()}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default BalanceModal;
