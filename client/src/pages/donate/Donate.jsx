import React, { useState } from "react";
import "./style.scss";
import logo from "../../assets/react.svg";
import { auth } from "../../component/authentication/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Donate = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("HOLD");
  const [errorDetail, setErrorDetail] = useState(null);

  const navigate = useNavigate();

  const paymentHandler = async (event) => {
    setPaymentStatus("PROCESSING");
    if (!auth.currentUser) {
      console.log("Cant find Current user, payment handler");
      return;
    }
    const token = await auth.currentUser.getIdToken(true);
    const amount = 500;
    const currency = "INR";
    const receiptId = "q945-4u09ii0i";

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

    console.log(order);

    var options = {
      key: "",
      amount,
      currency,
      name: "Mayank Corporation",
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
        if(jsonResponse.paymentValidation) {
          setPaymentStatus("DONE");
          setTimeout(()=>{
            navigate('/')
          },10000)
        }
        else setPaymentStatus("INVALID");
      },

      prefill: {
        name: "Gaurav Kumar",
        email: auth.currentUser.email,
        // contact: "9000090000",
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
      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
      setErrorDetail({
        "Error Code:": response.error.code,
        "Error description:": response.error.description,
        "Error source:": response.error.source,
        "Error step:": response.error.step,
        "Error reason:": response.error.reason,
        "Error Order ID:": response.error.metadata.order_id,
        "Error Payment ID": response.error.metadata.payment_id
      })
    });

    rzp1.open();
    event.preventDefault();
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
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
            <button onClick={paymentHandler} disabled={!isChecked}>
              Continue
            </button>
          </div>
        </>
      )}
      {paymentStatus === "PROCESSING" && <h2 className="processing">Your Payment Under Process...</h2>}
      {paymentStatus === "DONE" && <>
        <h2 className="success">Your Payment Completed. Thanks For Contribution...</h2>
        <p>You Will Be Redired To Home Shortly.</p>
        </>}
      {paymentStatus === "INVALID" && (
        <h2 className="failed">Your Payment Is INVALID. Please Consult With Head...</h2>
      )}
      {paymentStatus === "ERROR" && (
        <>
          <h2 className="failed">Your Payment Failed. Details...Please Contact Head If Your Money Is Deducted</h2>
          <p>{errorDetail}</p>
        </>
      )}
    </div>
  );
};

export default Donate;
