import React, { useEffect, useState } from "react";
import "./style.scss";
import axios from "axios";
import { auth } from "../../component/authentication/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const TermsConditions = () => {
  axios.defaults.baseURL = import.meta.env.VITE_SERVER_BASE_URL;

  const [terms, setTerms] = useState([]);

  const getTermsConditions = async () => {
    const token = await auth.currentUser.getIdToken();

    axios
      .get("/terms", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTerms(response.data.Terms);
        console.log(terms);
      })
      .catch((error) => {
        setTerms([]);
        console.log("error on checking member List", error);
      });
  };

  useEffect(() => {
    getTermsConditions();
  }, [auth.currentUser]);

  return (
    <div className="terms_container">
      <h1>Terms and Conditions</h1>
      <p>Welcome to the Navodayans Uplift Association Website ("Website").</p>
      {terms.length != 0 &&
        Object.entries(terms).map(([key, value]) => {
          // console.log(key,value);
          return (
            <section className="section">
              <h2>{value.Heading}</h2>
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

export default TermsConditions;
