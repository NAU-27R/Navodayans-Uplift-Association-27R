import React, { useEffect } from "react";
import { auth } from "../../component/authentication/firebaseConfig";
import "./style.scss";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";
const Transaction = () => {
  const fetchTransactionList = async () => {
    const token = await auth.currentUser.getIdToken(true);
    console.log("making request to see transaction List");
    axios
      .get("/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        
        console.log("Transaction List:", response.data);
      })
      .catch((error) => {

        console.log("error on fetching transaction list:", error);
      });
  };

  useEffect(() => {
    fetchTransactionList()
  }, []);
  return <div>d</div>;
};

export default Transaction;
