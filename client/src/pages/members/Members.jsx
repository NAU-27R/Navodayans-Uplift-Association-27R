import React, { useEffect, useState } from "react";
import "./style.scss";
import { auth } from "../../component/authentication/firebaseConfig";
import axios from "axios";

const Members = () => {
  axios.defaults.baseURL = import.meta.env.VITE_SERVER_BASE_URL;
  const [memberList, setMemberList] = useState(null);

  const [state, setState] = useState("loading");

  const getMemberList = async () => {
    if(!auth.currentUser)return;
    const token = await auth.currentUser.getIdToken();
    // console.log("making request to get member List");
    axios
      .get("/members", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMemberList(response.data.MemberList);
        setState("loaded");
      })
      .catch((error) => {
        setMemberList([]);
        console.log("error on checking member List", error);
        setState("loaded");
      });
  };

  useEffect(() => {
    getMemberList();
  }, [auth.currentUser]);

  return (
    <div className="container">
      {state === "loading" && <h1>Fetching Member List. Please Wait......</h1>}
      {state === "loaded" && (
        <>
          <h1>Navodayans Uplift Association 27R Members</h1>
          <table className="list">
            <thead>
              <tr className="head_row">
                <th className="head">Name</th>
                <th className="head">Email</th>
                <th className="head">Joined Since</th>
              </tr>
            </thead>
            <tbody >
              {memberList &&
                Object.entries(memberList).map(([key, value]) => {
                  let date = new Date(
                    value.date_of_joining._seconds * 1000 +
                      value.date_of_joining._nanoseconds / 1000000
                  );
                  date = date.toDateString();
                  return (
                    <tr key={value.email} className="data_row">
                      <td className="data">{value.name}</td>
                      <td className="data">{value.emails[0]}</td>
                      <td className="data">{date}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
import "./style.scss";

export default Members;
