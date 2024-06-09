import React, { useState } from "react";
import "./style.scss";
import logo from "../../assets/react.svg";
import { auth } from "../../component/authentication/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Donate = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("HOLD");
  const [errorDetail, setErrorDetail] = useState(null);
  const [donation, setDonation] = useState();
  const navigate = useNavigate();

  const paymentHandler = async (event) => {
    if (!auth.currentUser) {
      console.log("Cant find Current user, payment handler");
      return;
    }
    console.log(donation * 100);
    if (donation > 10000 || donation < 50 || isNaN(donation) === true) {
      console.log("error");
      return;
    }
    setPaymentStatus("PROCESSING");

    const token = await auth.currentUser.getIdToken(true);
    const currency = "INR";
    const receiptId = "q945-4u09ii0i";
    const amount = donation * 100;

    const response = await fetch("http://localhost:3000/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
      }),
    });

    const order = await response.json();
    var options = {
      key: "",
      amount,
      currency,
      name: "JNVR-27 Charity Fund",
      description: "Test Transaction",
      image: { logo },
      order_id: order.id,
      handler: async function (response) {
        const body = { ...response };

        const validateResponse = await fetch("http://localhost:3000/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });

        const jsonResponse = await validateResponse.json();
        console.log(jsonResponse);
        if (jsonResponse.paymentValidation) {
          setPaymentStatus("DONE");
          setTimeout(() => {
            navigate("/");
          }, 10000);
        } else setPaymentStatus("INVALID");
      },

      prefill: {
        // name: auth.currentUser.displayName,
        email: auth.currentUser.email,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#028ba3",
      },
    };

    var rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      setPaymentStatus("ERROR");
      setErrorDetail({
        "Error Code:": response.error.code,
        "Error description:": response.error.description,
        "Error source:": response.error.source,
        "Error step:": response.error.step,
        "Error reason:": response.error.reason,
        "Error Order ID:": response.error.metadata.order_id,
        "Error Payment ID": response.error.metadata.payment_id,
      });
    });

    rzp1.open();
    event.preventDefault();
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleAmountChange = (event) => {
    setDonation(event.target.value);
  };

  return (
    <div className="donate_container">
      {paymentStatus === "HOLD" && (
        <>
          <h2>Terms And Conditions</h2>
          <div className="terms_container">
            <li className="term">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
              est dolorem nesciunt eaque placeat sapiente beatae sed quae, atque
              minima veritatis animi praesentium labore, voluptatibus nulla
              obcaecati ea corrupti! Id, totam nisi.
            </li>
            <li className="term">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
              est dolorem nesciunt eaque placeat sapiente beatae sed quae, atque
              minima veritatis animi praesentium labore, voluptatibus nulla
              obcaecati ea corrupti! Id, totam nisi.
            </li>
            <li className="term">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
              est dolorem nesciunt eaque placeat sapiente beatae sed quae, atque
              minima veritatis animi praesentium labore, voluptatibus nulla
              obcaecati ea corrupti! Id, totam nisi.
            </li>
            <li className="term">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
              est dolorem nesciunt eaque placeat sapiente beatae sed quae, atque
              minima veritatis animi praesentium labore, voluptatibus nulla
              obcaecati ea corrupti! Id, totam nisi.
            </li>
            <li className="term">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
              est dolorem nesciunt eaque placeat sapiente beatae sed quae, atque
              minima veritatis animi praesentium labore, voluptatibus nulla
              obcaecati ea corrupti! Id, totam nisi.
            </li>
            <li className="term">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
              est dolorem nesciunt eaque placeat sapiente beatae sed quae, atque
              minima veritatis animi praesentium labore, voluptatibus nulla
              obcaecati ea corrupti! Id, totam nisi.
            </li>
            <li className="term">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
              est dolorem nesciunt eaque placeat sapiente beatae sed quae, atque
              minima veritatis animi praesentium labore, voluptatibus nulla
              obcaecati ea corrupti! Id, totam nisi.
            </li>
          </div>
          <div className="continue">
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="terms-checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="terms-checkbox">
                I agree to the terms and conditions.
              </label>
            </div>
            <div className="amount_container">
              <label htmlFor="input_amount">Enter your donation</label>
              <div className="amount_div">
                <span className="symbol">&#8377;</span>
                <input
                  type="number"
                  onChange={(event) => handleAmountChange(event)}
                  id="input_amount"
                  placeholder="50.00"
                  value={donation}
                />
              </div>
            </div>
            <p className="amount_range">
              Amount Must Be In The Range: 50 to 10000
            </p>
            <button
              onClick={paymentHandler}
              disabled={
                !(
                  isChecked &&
                  donation >= 50 &&
                  donation <= 10000 &&
                  isNaN(donation) === false
                )
              }
            >
              Continue
            </button>
          </div>
        </>
      )}
      {paymentStatus === "PROCESSING" && (
        <h2 className="processing">Your Payment Under Process...</h2>
      )}
      {paymentStatus === "DONE" && (
        <>
          <h2 className="success">
            Your Payment Completed. Thanks For Contribution...
          </h2>
          <p>You Will Be Redired To Home Shortly.</p>
        </>
      )}
      {paymentStatus === "INVALID" && (
        <h2 className="failed">
          Your Payment Is INVALID. Please Consult With Head...
        </h2>
      )}
      {paymentStatus === "ERROR" && (
        <>
          <h2 className="failed">
            Your Payment Failed. Details...Please Contact Head If Your Money Is
            Deducted
          </h2>
          <p>{errorDetail}</p>
        </>
      )}
    </div>
  );
};

export default Donate;
