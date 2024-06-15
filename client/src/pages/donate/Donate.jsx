import React, { useState , useEffect} from 'react'
import './style.scss'
import { auth } from '../../component/authentication/firebaseConfig';
import axios from 'axios';
const Donate = () => {

  axios.defaults.baseURL = import.meta.env.VITE_SERVER_BASE_URL;

  const [isAgree, setIsAgree] = useState(false);
  const [memberStatus, setMemberStatus] = useState(false);

  const checkMemberStatus = async()=>{

    if(!auth.currentUser)return;
    const token = await auth.currentUser.getIdToken();
        
        // console.log("making request to see member status")
        axios
          .get("/isMember", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setMemberStatus(response.data.memberStatus);
            // console.log("Member Status:",response.data.memberStatus);
          })
          .catch((error) => {
            setMemberStatus(false);
            console.log("error on checking member status",error);
          });
  }

  const embedButton = ()=>{
    if(!memberStatus)return;

    // console.log("embeding")

    const rzpPaymentForm = document.getElementById("rzp_payment_form");
    
    if (!rzpPaymentForm.hasChildNodes()) {

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/payment-button.js";
      script.async = true;
      // script.dataset.payment_button_id = "pl_OMF38Of0OuPQCG";//live mode
      script.dataset.payment_button_id = import.meta.env.VITE_RAZORPAY_PAYMENT_BUTTON_ID; // test mode
      rzpPaymentForm.appendChild(script);

    }
  }
  

  useEffect(() => {
    checkMemberStatus();
    embedButton();

  },[auth.currentUser]);

  useEffect(()=>{
    embedButton();
  },[memberStatus])


  return (
    <div className='donate_container'>
      {memberStatus && <div className='donate_window'>
        <h2>Donate Here</h2>
        <h3>Disclaimer:</h3>
        <p> As the Navodayans Uplift Association 27R is not a registered association, group, or committee, all matters related to payments, funds, website functionality, transactions, transparency, payment distribution, and disputes will be resolved through mutual discussions among the Head, Sanjay Nishad, and group members. Refunds will only be issued in cases of mistaken payments and only to members.</p>
          {/* <p>Please Read All <a href="/Navodayans-Uplift-Association-27R/terms_conditions">Terms and Conditions</a> before you proceed</p> */}
          {/* <p id='idea'>By donating or using this website, I agree to these <a href="/Navodayans-Uplift-Association-27R/terms_conditions" >Terms and Conditions</a></p> */}
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="agree-terms"
            checked={true}
            onChange={() => {
              document.getElementById("idea").style.color = "red";
              
              setTimeout(() => {
                
                document.getElementById("idea").style.color = "black";
              }, 1000);
            }}
          />
          <label id='idea' htmlFor="agree-terms">By donating or using this website, I agree to these <a href="/Navodayans-Uplift-Association-27R/terms_conditions" >Terms and Conditions</a></label>
        </div>
        
      <form className='btn' id="rzp_payment_form"></form>
      </div>}
      {!memberStatus&& auth.currentUser && <>
      <h2>You Are Not In the Member List.Please contact head.</h2></>}
      {!auth.currentUser && <>
      <h2>Please Login To Proceed Further</h2></>}
    </div>
  )
}

export default Donate
