import React, { useEffect, useState } from "react";
import "./style.scss";
import { auth } from "../authentication/firebaseConfig";
import {Link} from 'react-router-dom';
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { sendEmailVerification } from "firebase/auth";
const MessageWindow = ({ verified, setVerified, memberStatus}) => {
  const [message, setMessage] = useState("");


  const sendLink = () => {
    const user = auth.currentUser;
    if (!user) return;
    sendEmailVerification(user)
      .then(() => {
        setMessage("Verification Link has been sent");
        console.log("email verification link sent:");
      })
      .catch((error) => {
        console.log(
          "error on sending verification link:",
          "message:",
          error.message,
          "code:",
          error.code
        );
        setMessage("error:" + error.message);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (auth.currentUser.emailVerified === true) {
        setVerified(true);
      }
    }, 5000);

    return () => clearInterval(interval);
  });

  return (
    <div className="messageWrapper">
      {!verified && (
        <>
          <h3>Email Verification Pending</h3>
          <p>
            Your email verification is pending, please check your email for
            verification link. If you find any problem please sign in again. Or
            if the problem persists, we recommend using Google Sign In method
          </p>
        </>
      )}
      {verified && !memberStatus && (
        <>
          <h3>User not in the Member List</h3>
          <p>
          You must be a registered member to access member benefits, make donations, or view the transactions list. For membership inquiries, please contact the head - Sanjay Nishad. You may already have his contact information if you are from the same class.
          </p>
        </>
      )}
      {verified && memberStatus && (
        <>
          <h3>Welcome to the Navodayans Uplift Association 27R!
          </h3>
          <p>
          Make your contribution today. If you encounter any issues, please contact Sanjay Nishad.
          </p>
        </>
      )}
      <span className="message">{message}</span>
      <div className="btns">
        {!memberStatus && <button className="logout_btn" onClick={() => auth.signOut()}>
          {" "}
          Log Out
        </button>}
        {verified && memberStatus && <Link className="donate_btn" to='/Navodayans-Uplift-Association-27R/donate'>
          {" "}
          <RiMoneyRupeeCircleLine size={25}/> Donate Here 
        </Link>}
        { !verified && <button className="link_btn" onClick={() => sendLink()}>
          {" "}
          Send Link
        </button>}
      </div>
    </div>
  );
};

export default MessageWindow;
