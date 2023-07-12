"use client";

import axiosJWT from "@/app/utils/axiosJWT";
import { useEffect, useState } from "react";
import LoadingDots from "@/components/LoadingDots";
import Toast from "@/components//Toast";
import TopUpBalance from "@/components/balance/TopUpBalance";
import WithdrawBalance from "@/components/balance/WithdrawBalance";

function BalanceModal({ isOpen, onClose, onHistoryClick }) {
  const [toast, setToast] = useState(null);
  const [balanceLoading, setBalanceLoading] = useState(true);
  const [updateBalanceLoading, setUpdateBalanceLoading] = useState(false);
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
      setBalanceLoading(false);
    } catch (error) {
      setToast({
        type: "error",
        message: error.response.data.message,
      });
    }
  };

  const updateBalance = async (data) => {
    try {
      setUpdateBalanceLoading(true);
      const response = await axiosJWT.put("/api/balance", data);
      const { balance } = response.data;

      setCurrentBalance(balance);
      setToast({
        type: "success",
        message: response.data.message,
      });
    } catch (error) {
      setToast({
        type: "error",
        message: error.response.data.message,
      });
    }
    setUpdateBalanceLoading(false);
  };

  return (
    <>
      <dialog
        id="balance-modal"
        className="modal"
        onClick={() => onClose()}
        open
      >
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>
          <h3 className="font-bold text-lg">Balance</h3>
          <p className="py-4">
            Your balance is{" "}
            <span className="font-bold">
              Rp{currentBalance.toLocaleString("id-ID")}
            </span>
          </p>

          {balanceLoading ? (
            <LoadingDots />
          ) : (
            <>
              <TopUpBalance
                updateBalance={updateBalance}
                updateBalanceLoading={updateBalanceLoading}
              />
              <WithdrawBalance
                updateBalance={updateBalance}
                currentBalance={currentBalance}
                updateBalanceLoading={updateBalanceLoading}
              />
            </>
          )}

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
      {toast && <Toast toast={toast} setToast={setToast} />}
    </>
  );
}

export default BalanceModal;
