import React, { useEffect, useState } from "react";
import "./style.scss";
import axios from "axios";
import { auth } from "../../component/authentication/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const TermsConditions = () => {
  axios.defaults.baseURL = import.meta.env.VITE_SERVER_BASE_URL;

  const [terms, setTerms] = useState([]);

  const getTermsConditions = async () => {
    if(!auth.currentUser)return;
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
    // <div className="terms_container">
    //   <h1>Terms and Conditions</h1>
    //   <p>Welcome to the Navodayans Uplift Association Website ("Website").</p>
    //   {!auth.currentUser && <h2>Please Sign In To See Terms And Conditions </h2>}
    //   {terms.length != 0 &&
    //     Object.entries(terms).map(([key, value]) => {
    //       // console.log(key,value);
    //       return (
    //         <section className="section">
    //           <h2>{value.Heading}</h2>
    //           <p>{value.Paragraph}</p>
    //           {value.Points.map((point, key) => (
    //             <p>{point}</p>
    //           ))}
    //         </section>
    //       );
    //     })}
    // </div>
    <div className="terms_container">
    <h1>Terms and Conditions</h1>
    <p><strong>Effective Date:</strong> [10 June 2024]</p>

    <section className="section">
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the service.</p>
    </section>

    <section className="section">
        <h2>2. Services</h2>
        <p>Navodayans Uplift Association 27R provides web development services. The scope of services will be defined in the project agreement with each client.</p>
    </section>

    <section className="section">
        <h2>3. Payment Terms</h2>
        <ul>
            <li><strong>Invoices:</strong> All invoices are payable within [insert payment terms, e.g., 30 days] of receipt.</li>
            <li><strong>Late Payments:</strong> Late payments may incur additional charges as per our late payment policy.</li>
        </ul>
    </section>

    <section className="section">
        <h2>4. Client Responsibilities</h2>
        <ul>
            <li><strong>Project Information:</strong> Clients must provide all necessary information and materials for the successful completion of the project.</li>
            <li><strong>Approval:</strong> Clients are responsible for reviewing and approving the work delivered by us in a timely manner.</li>
        </ul>
    </section>

    <section className="section">
        <h2>5. Intellectual Property</h2>
        <ul>
            <li><strong>Ownership:</strong> All intellectual property rights in the work product delivered to the client will be transferred to the client upon full payment.</li>
            <li><strong>License:</strong> Clients grant us a non-exclusive, non-transferable license to use the provided materials solely for the purpose of completing the project.</li>
        </ul>
    </section>

    <section className="section">
        <h2>6. Confidentiality</h2>
        <ul>
            <li><strong>Client Information:</strong> We agree to keep all client information confidential and not to disclose it to any third party except as required to provide the services or comply with the law.</li>
        </ul>
    </section>

    <section className="section">
        <h2>7. Limitation of Liability</h2>
        <ul>
            <li><strong>No Warranty:</strong> Our services are provided "as is" without any warranty of any kind.</li>
            <li><strong>Limitation:</strong> In no event shall Navodayans Uplift Association 27R be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to the use of our services.</li>
        </ul>
    </section>

    <section className="section">
        <h2>8. Termination</h2>
        <ul>
            <li><strong>Termination by Client:</strong> Clients may terminate the project at any time, provided that any work completed up to the termination date will be invoiced and must be paid.</li>
            <li><strong>Termination by Us:</strong> We reserve the right to terminate the project for any reason, including but not limited to non-payment or breach of these Terms by the client.</li>
        </ul>
    </section>

    <section className="section">
        <h2>9. Governing Law</h2>
        <p>These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>
    </section>

    <section className="section">
        <h2>10. Changes to Terms</h2>
        <p>We reserve the right to modify these Terms at any time. Any changes will be posted on our website and will become effective immediately upon posting.</p>
    </section>

    <section className="section">
        <h2>11. Contact Information</h2>
        <p>For any questions or concerns regarding these Terms, please contact us at:</p>
        <ul>
            <li><strong>Email:</strong> jnvr27charityfund@gmail.com</li>
            <li><strong>Address:</strong> Raipur, Chhattisgarh, India</li>
        </ul>
    </section>

    <p><strong>Navodayans Uplift Association 27R</strong> is committed to providing high-quality web development services and ensuring client satisfaction.</p>
</div>
  );
};

export default TermsConditions;
