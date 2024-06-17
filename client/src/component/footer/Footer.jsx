import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPath } from "../../features/pathSlice";

import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {

  const dispatch = useDispatch();

  const handleClick = (path)=>{
    setTimeout(() => {
      // console.log("dispatching")
      dispatch(setPath(path))
    }, 200);
  }
  return (
    <footer className="footer">
      
      <div className="infoText">
      At Navodayans Uplift Association 27R, we are dedicated to empowering our clients with top-notch web development services. Our team is committed to ensuring your digital presence is both impactful and effective. Reach out to us to learn more about how we can help you achieve your goals.
      </div>

      <div className="info_container">
      <div className="contact_container">
            <h4>Contact Us</h4>
          <span className="contact"><MdEmail className="icon" size={20}/>jnvr27charityfund@gmail.com </span>
          <span className="contact"><FaPhoneAlt className="icon" size={20}/>+916267493140 </span>
          <span className="contact">Raipur Chhattisgarh, India </span>
        </div>
      <div className="link_container">
        <h4>Pages</h4>
          <Link className="link" onClick={() => handleClick("home")}>
            Home
          </Link>
          <Link
            className="link"
            onClick={() => handleClick("members")}
          >
            Members
          </Link>
          <Link
            className="link"
            onClick={() => handleClick("transactions")}
          >
            My Transactions
          </Link>
          <Link className="link" onClick={() => handleClick("donate")}>
            Pay Now
          </Link>
        </div>
        <div className="link_container">
          <h4>Our Policies And Terms</h4>
          <Link className="link" onClick={() => handleClick("privacy_policy")}>
            Privacy Policy
          </Link>
          <Link
            className="link"
            onClick={() => handleClick("refund_policy")}
          >
            Refund Policy
          </Link>
          <Link
            className="link"
            onClick={() => handleClick("terms_conditions")}
          >
            Terms And Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
