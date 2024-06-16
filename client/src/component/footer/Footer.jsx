import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { SiGithub, SiCodechef, SiCodeforces, SiLinkedin } from "react-icons/si";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="infoText">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima sapiente
        eos quasi aliquam! Similique enim ducimus cumque, quae debitis, quas
        aliquid ea eaque quia unde distinctio eos non, vitae maxime?Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Beatae animi aspernatur,
        velit qui labore consectetur soluta quibusdam perferendis ullam
        voluptates, odit recusandae optio. Consequuntur libero, accusamus non
        velit suscipit voluptate. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Dolores cum, in totam quas, exercitationem
        consequuntur eos ipsam, at fugit iusto consequatur ratione perspiciatis.
        Non, distinctio eos? Nostrum commodi quia voluptatem!
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
          <Link className="link" to="/Navodayans-Uplift-Association-27R">
            Home
          </Link>
          <Link
            className="link"
            to="/Navodayans-Uplift-Association-27R/members"
          >
            Members
          </Link>
          <Link
            className="link"
            to="/Navodayans-Uplift-Association-27R/transactions"
          >
            My Transactions
          </Link>
          <Link className="link" to="/Navodayans-Uplift-Association-27R/donate">
            Pay Now
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
