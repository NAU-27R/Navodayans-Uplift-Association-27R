import React, { useEffect, useState } from "react";
import { auth } from "../../component/authentication/firebaseConfig";
import "./style.scss";
import axios from "axios";

const Transaction = () => {
  axios.defaults.baseURL = import.meta.env.VITE_SERVER_BASE_URL;
  const [transactionList, SetTransactionList] = useState([]);
  const [transactionListHead, setTransactionListHead] = useState([]);
  const [state, setState] = useState("loading");

  const fetchTransactionList = async () => {
    if(!auth.currentUser)return;
    const token = await auth.currentUser.getIdToken();
    // console.log("making request to see transaction List");
    axios
      .get("/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.userTransactionList.length != 0) {
          let jsonObject = JSON.parse(response.data.userTransactionList[0]);
          let temp = [];
          Object.entries(jsonObject).map(([key, value]) => {
            // console.log(key);
            temp.push(key);
          });
          setTransactionListHead(temp);
          SetTransactionList(response.data.userTransactionList);
          setState("loaded")
          // console.log(transactionListHead);
        } else {
          setTransactionListHead([]);
          setState("not_found")
        }
        // console.log("Transaction List:", response.data);
      })
      .catch((error) => {
        console.log("error on fetching transaction list:", error);
      });
  };

  useEffect(() => {
    fetchTransactionList();
  }, [auth.currentUser]);
  return (
    <div className="container">
      {state==="not_found" && <h1>No Transactions Found</h1>}
      {state==="loading" && <h1>Fetching All Your Transactions. Please Wait......</h1>}
      {state==="loaded" && (
        <>
          <h1>All Your Transaction List Is Here</h1>
          <table className="list">
            <thead>
            <tr className="head_row">
              {transactionListHead.map((head, key) => {
                // console.log(jsonObject, typeof jsonObject);
                return (
                  <th className="head" key={key}>
                    {head}
                  </th>
                );
              })}
            </tr>
            </thead>
            <tbody>
            {transactionList.map((data, key) => {
              // console.log(data);
              const jsonObject = JSON.parse(data);
              // console.log(jsonObject, typeof jsonObject);
              
              return <tr className="data_row" key={key}>
                {Object.entries(jsonObject).map(([key, value]) => {
                  // console.log(value,typeof(value));
                  if(typeof(value)==='number')return <td className="data">&#8377;{value.toFixed(2)}</td>
                  return <td className="data">{value?value:"N/A"}</td>;
                })}
              </tr>
            })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Transaction;
