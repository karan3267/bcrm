import { useEffect, useState } from "react";
import TransferModal from "../modals/TransferModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccounts } from "../redux/AccountsSlice";
import { initiateTransfer } from "../redux/TransferSlice";

function TransfersPage() {
    const dispatch=useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const { data: accounts } = useSelector((state) => state.accounts);
  useEffect(()=>{
    dispatch(fetchAccounts());
  },[dispatch])

  const handleTransfer = async (transferData) => {
    try {
        const result = await dispatch(initiateTransfer(transferData));
        if (result.meta.requestStatus === 'fulfilled') {
            console.log("Transfer successful:", result.payload);
        } else {
            console.error("Transfer failed:", result.payload || "Unknown error");
        }
    } catch (error) {
        console.error("Unexpected error:", error);
    }
};

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Initiate Transfer
      </button>
      <TransferModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        accounts={accounts}
        onTransfer={handleTransfer}
      />
    </div>
  );
}

export default TransfersPage;
