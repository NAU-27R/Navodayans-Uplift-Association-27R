import React, { useEffect, useState } from "react";
import "./style.scss";

import { Link, useNavigate } from "react-router-dom";
import { auth } from "../authentication/firebaseConfig";
import { TfiMenu } from "react-icons/tfi";

const Header = () => {
  const [showMobileView, setShowMobileView] = useState(false);
  const [showMobileNavigation, setShowMobileNavigation] = useState(false);

  const navigate = useNavigate();

  const checkScreeSize = () => {
    if (window.innerWidth <= 700) {
      setShowMobileView(true);
    } else setShowMobileView(false);
  };

  useEffect(() => {
    checkScreeSize();
    window.addEventListener("resize", checkScreeSize);
    return () => {
      window.removeEventListener("resize", checkScreeSize);
    };
  }, []);

  

  return (
    <div className="header_container">
      {!showMobileView && (
        <div className="link_container">
          <Link className="link" to="/Navodayans-Uplift-Association-27R">
            Home
          </Link>
          <Link className="link" to="/Navodayans-Uplift-Association-27R/members">
            Members
          </Link>
          <Link className="link" to="/Navodayans-Uplift-Association-27R/transactions">
            My Transactions
          </Link>
          <Link className="link" to="/Navodayans-Uplift-Association-27R/donate">
            Pay Now
          </Link>
        </div>
      )}
      <div className="user_container">
        <img
          className="profile_photo"
          src={auth.currentUser ? auth.currentUser.photoURL : "/vite.svg"}
          alt=""
        />
        {!showMobileView && (
          <>
            <p className="user_name">
              {auth.currentUser
                ? auth.currentUser.email
                : "your@gmail.com"}
            </p>
            <button onClick={()=>{auth.signOut(); navigate('/Navodayans-Uplift-Association-27R')}} className="log_out">Log Out</button>
          </>
        )}
      </div>
      {showMobileView && (
        <TfiMenu onClick={() => setShowMobileNavigation(!showMobileNavigation)} cursor="pointer" size={25} />
      )}
      {showMobileView && showMobileNavigation && (
        <div className="mobile_link_container" id="mobile_link_container" onClick={()=>setShowMobileNavigation(false)}>
          <Link className="mobile_link" to="/Navodayans-Uplift-Association-27R" >
            Home
          </Link>
          <Link className="mobile_link" to="/Navodayans-Uplift-Association-27R/members">
            Members
          </Link>
          <Link className="mobile_link" to="/Navodayans-Uplift-Association-27R/transactions">
            My Transactions
          </Link>
          <Link className="mobile_link" to="/Navodayans-Uplift-Association-27R/donate">
            Pay Now
          </Link>
          <Link className="mobile_link" onClick={()=>{auth.signOut();console.log(auth.currentUser)}}>
            Log Out
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
