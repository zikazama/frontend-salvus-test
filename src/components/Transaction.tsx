import { useEffect, useState } from "react";
import instance from "../utils/axios";
import { useAuthStore } from "../store/useAuthStore";
import moment from "moment";

function Transaction() {
  interface Transaction {
    transaction_uid: string;
    created_at: string;
    // Add other properties if needed
  }

  const authStore = useAuthStore();
  instance.defaults.headers.common["Authorization"] = authStore.token ?? "";

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(
          "https://backend-salvus-test-production.up.railway.app/api/transactions?page=1&size=1000000"
        );
        setTransactions(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Transaction Data</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Date</th>
            <th className="p-2">Action</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction?.transaction_uid} className="border-t">
              <td className="p-2 text-center">{transaction.transaction_uid}</td>
              <td className="p-2 text-center">
                {moment(transaction?.created_at).format("HH:mm | DD-MM-YYYY")}
              </td>
              <td className="p-2 text-center">
                <button className="warning m-5">View</button>
                <button className="danger m-5">Delete</button>
              </td>
              {/* Add more table cells for other properties */}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Add pagination component here */}
    </div>
  );
}

export default Transaction;
