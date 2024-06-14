import React, { useEffect, useState } from "react";
import "./style.scss";
import axios from "axios";
import { auth } from "../../component/authentication/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const PrivacyPolicy = () => {
  axios.defaults.baseURL = import.meta.env.VITE_SERVER_BASE_URL;

  const [policy, setPolicy] = useState([]);

  const getTermsConditions = async () => {
    const token = await auth.currentUser.getIdToken();

    axios
      .get("/policy", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPolicy(response.data.Policy);
        console.log(policy);
      })
      .catch((error) => {
        setPolicy([]);
        console.log("error on checking member List", error);
      });
  };

  useEffect(() => {
    getTermsConditions();
  }, [auth.currentUser]);

  return (
    <div className="policy_container">
      <h1>Navodayans Uplift Association Privacy Policy</h1>
      <p>Welcome to the Navodayans Uplift Association Website ("Website").</p>
      {policy.length != 0 &&
        Object.entries(policy).map(([key, value]) => {
          // console.log(key,value);
          const date = new Date();
          if(value.Heading==="Effective Date"){
            console.log(date);
          }
          return (
            <section className="section">
              <h2>{value.Heading}{value.Heading==="Effective Date"? " : "+date.toDateString():""}</h2>
              <p>{value.Paragraph}</p>
              {value.Points.map((point, key) => (
                <p>{point}</p>
              ))}
            </section>
          );
        })}
    </div>
  );
};

export default PrivacyPolicy;
