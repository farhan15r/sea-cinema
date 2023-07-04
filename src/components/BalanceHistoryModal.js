"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import RowBalanceHistory from "./RowBalanceHistory";

function BalanceHistoryModal({ isOpen, onClose }) {
  const [currentBalance, setCurrentBalance] = useState(0);
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    if (!isOpen) {
      return null;
    }

    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const responseBalance = await axios.get("api/balance", config);
        const { balance } = responseBalance.data;

        const responseHistory = await axios.get("api/balance/history", config);

        const { histories } = responseHistory.data;

        setCurrentBalance(balance);
        setHistories(histories);
      } catch (error) {}
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  return (
    <dialog id="balance-modal" className="modal" onClick={() => onClose()} open>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-bold text-lg">Balance History</h3>
        <p className="py-4">
          Your balance is <span className="font-bold">{currentBalance}</span>
        </p>

        <div className="table-container max-h-[50vh] overflow-auto mb-3">
          <table className="table">
            <tbody>
              {
                histories.map((history, i) => (
                  <RowBalanceHistory history={history} key={i} />
                ))
              }
            </tbody>
          </table>
        </div>

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
