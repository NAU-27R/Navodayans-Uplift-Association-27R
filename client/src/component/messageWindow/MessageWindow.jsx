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
          <h3>User Not In The Member List</h3>
          <p>
            To be able to donate, access to members and transactions list. You
            should be a member. Please Contact Head. Sanjay Nishad. If you are
            from class you probably have the contact
          </p>
        </>
      )}
      {verified && memberStatus && (
        <>
          <h3>Welcome To The JNVR-27 Charity Fund</h3>
          <p>
            Make your contribution today. If you find any problem contact Sanjay Nishad
          </p>
        </>
      )}
      <span className="message">{message}</span>
      <div className="btns">
        {!memberStatus && <button className="logout_btn" onClick={() => auth.signOut()}>
          {" "}
          Log Out
        </button>}
        {verified && memberStatus && <Link className="donate_btn" to='/JNVR-27/donate'>
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
