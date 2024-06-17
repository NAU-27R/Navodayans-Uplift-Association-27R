import React, { useEffect, useState } from "react";
import "./style.scss";
import axios from "axios";
import { auth } from "../../component/authentication/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const PrivacyPolicy = () => {
  axios.defaults.baseURL = import.meta.env.VITE_SERVER_BASE_URL;

  const [policy, setPolicy] = useState([]);

  const getPrivacyPolicy = async () => {

    axios
      .get("/policy", {
      })
      .then((response) => {
        setPolicy(response.data.Policy);
        console.log(policy);
      })
      .catch((error) => {
        setPolicy([]);
        console.log("error on checking privacy policy List", error);
      });
  };

  useEffect(() => {
    getPrivacyPolicy();
  }, []);

  return (
    // <div className="policy_container">
    //   <h1>Navodayans Uplift Association Privacy Policy</h1>
    //   <p>Welcome to the Navodayans Uplift Association Website ("Website").</p>
    //   {policy.length != 0 &&
    //     Object.entries(policy).map(([key, value]) => {
    //       // console.log(key,value);
    //       const date = new Date();
    //       if(value.Heading==="Effective Date"){
    //         console.log(date);
    //       }
    //       return (
    //         <section className="section">
    //           <h2>{value.Heading}{value.Heading==="Effective Date"? " : "+date.toDateString():""}</h2>
    //           <p>{value.Paragraph}</p>
    //           {value.Points.map((point, key) => (
    //             <p>{point}</p>
    //           ))}
    //         </section>
    //       );
    //     })}
    // </div>
    <div className="policy_container">
        <h1>Privacy Policy</h1>
        <p><strong>Effective Date:</strong> [10 June 2024]</p>

        <section className="section">
            <h2>1. Information We Collect</h2>
            <p>We only collect the following information from users:</p>
            <ul>
                <li><strong>Sign-in Information:</strong> We collect your email address when you sign in to our services.</li>
            </ul>
        </section>

        <section className="section">
            <h2>2. Use of Information</h2>
            <p>The information we collect is used for the following purposes:</p>
            <ul>
                <li><strong>Contact Information:</strong> Used for payment processing and communication within the association.</li>
                <li><strong>Service Improvement:</strong> To improve our services and provide better user experience.</li>
            </ul>
        </section>

        <section className="section">
            <h2>3. Storage and Security</h2>
            <ul>
                <li><strong>Data Storage:</strong> All user information is stored in Firestore located on servers in India.</li>
                <li><strong>Data Security:</strong> We implement appropriate security measures to protect your information from unauthorized access, alteration, or destruction.</li>
            </ul>
        </section>

        <section className="section">
            <h2>4. Information Sharing</h2>
            <ul>
                <li><strong>Internal Use:</strong> Your personal information is used solely within the association and is not shared with any third parties.</li>
                <li><strong>Compliance:</strong> We may disclose your information if required by law or to comply with legal processes.</li>
            </ul>
        </section>

        <section className="section">
            <h2>5. User Rights</h2>
            <p>You have the following rights regarding your personal information:</p>
            <ul>
                <li><strong>Access:</strong> You can request access to the information we hold about you.</li>
                <li><strong>Correction:</strong> You can request corrections to any inaccurate or incomplete information.</li>
                <li><strong>Deletion:</strong> You can request the deletion of your information from our records.</li>
            </ul>
        </section>

        <section className="section">
            <h2>6. Changes to This Privacy Policy</h2>
            <p>We reserve the right to modify this Privacy Policy at any time. Any changes will be posted on our website and will become effective immediately upon posting.</p>
        </section>

        <section className="section">
            <h2>7. Contact Information</h2>
            <p>For any questions or concerns regarding this Privacy Policy, please contact us at:</p>
            <ul>
                <li><strong>Email:</strong> jnvr27charityfund@gmail.com</li>
                <li><strong>Address:</strong> Raipur Chhattisgarh, India</li>
            </ul>
        </section>

        <p><strong>Navodayans Uplift Association 27R</strong> is committed to protecting your privacy and ensuring the security of your personal information.</p>
    </div>
  );
};

export default PrivacyPolicy;
