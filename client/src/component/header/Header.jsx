import React, { useEffect, useState } from "react";
import "./style.scss";

import { Link } from "react-router-dom";
import { auth } from "../authentication/firebaseConfig";
import { TfiMenu } from "react-icons/tfi";

const Header = () => {
  const [showMobileView, setShowMobileView] = useState(false);
  const [showMobileNavigation, setShowMobileNavigation] = useState(false);

  const checkScreeSize = () => {
    if (window.innerWidth <= 700) {
      setShowMobileView(true);
    } else setShowMobileView(false);
  };

  //   document.body.onmouseup = ()=>setShowMobileNavigation(false);
  //   window.addEventListener('click', function(e){
  //     if(!(showMobileView && showMobileNavigation) )return;
  //     if (document.getElementById('mobile_link_container').contains(e.target)){
  //       // Clicked in box
  //     } else{
  //         setShowMobileNavigation(false);
  //     }
  //   });

//   const checkClick = (e) => {
//     if (!(showMobileView && showMobileNavigation)) return;
//     console.log(showMobileNavigation);
//     if (!document.getElementById("mobile_link_container").contains(e.target)) {
//       setShowMobileNavigation(false);
//     }
//   };

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
          <Link className="link" to="/">
            Home
          </Link>
          <Link className="link" to="/members">
            Members
          </Link>
          <Link className="link" to="/transactions">
            My Transactions
          </Link>
          <Link className="link" to="/transactions">
            Donate
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
                : "mayankratre100@gmail.com"}
            </p>
            <button className="log_out">Log Out</button>
          </>
        )}
      </div>
      {showMobileView && (
        <TfiMenu onClick={() => setShowMobileNavigation(!showMobileNavigation)} cursor="pointer" size={25} />
      )}
      {showMobileView && showMobileNavigation && (
        <div className="mobile_link_container" id="mobile_link_container" onClick={()=>setShowMobileNavigation(false)}>
          <Link className="mobile_link" to="/" >
            Home
          </Link>
          <Link className="mobile_link" to="/members">
            Members
          </Link>
          <Link className="mobile_link" to="/transactions">
            My Transactions
          </Link>
          <Link className="mobile_link" to="/transactions">
            Donate
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
