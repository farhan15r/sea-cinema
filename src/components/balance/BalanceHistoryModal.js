"use client";

import { useEffect, useState } from "react";
import RowBalanceHistory from "@/components/balance/RowBalanceHistory";
import axiosJWT from "@/app/utils/axiosJWT";
import LoadingDots from "@/components/LoadingDots";

function BalanceHistoryModal({ isOpen, onClose }) {
  const [historiesLoading, setHistoriesLoading] = useState(true);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    if (!isOpen) {
      return null;
    }

    fetchData();
  }, [isOpen]);

  const fetchData = async () => {
    try {
      const responseBalance = await axiosJWT.get("/api/balance");
      const responseHistory = await axiosJWT.get("/api/balance/history");

      const { balance } = responseBalance.data;
      const { histories } = responseHistory.data;

      setCurrentBalance(balance);
      setHistories(histories);
      setHistoriesLoading(false);
    } catch (error) {}
  };

  return (
    <dialog id="balance-modal" className="modal" onClick={() => onClose()} open>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-bold text-lg">Balance History</h3>
        <p className="py-4">
          Your balance is{" "}
          <span className="font-bold">
            Rp{currentBalance.toLocaleString("id-ID")}
          </span>
        </p>

        {historiesLoading ? (
          <LoadingDots />
        ) : !histories ? (
          <p className="text-center">No history found</p>
        ) : (
          <div className="table-container max-h-[50vh] overflow-auto mb-3">
            <table className="table">
              <tbody>
                {histories.map((history, i) => (
                  <RowBalanceHistory history={history} key={i} />
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-end">
          <button className="btn btn-secondary" onClick={() => onClose()}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default BalanceHistoryModal;
