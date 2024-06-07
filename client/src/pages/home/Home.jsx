import { useState } from "react";

import "./style.scss";
import SignIn from "../../component/authentication/SignIn";
import SignUp from "../../component/authentication/SignUp";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../component/authentication/firebaseConfig";
import MessageWindow from "../../component/messageWindow/MessageWindow";

const Home = () => {
  const [value, setValue] = useState("Sign In");
  const [verified, setVerified] = useState(false);
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setValue("authenticated");
      if (user.emailVerified) {
        setVerified(true);
      }
    } else {
      if (value === "authenticated") setValue("Sign In");
    }
  });

  const signout = () => {
    setValue("Sign In");
    auth.signOut();
  };
  return (
    <div className="homeContainer">
      <div className="motive">
        <h2>Who We Are</h2>
        <p>
          We are Jawahar Navaodya Vidyalaya Raipur, Students of 27th Batch. This
          community motives to collect funds and help the members in their
          struggling phase. Donate today to contribute towards better future
        </p>
      </div>
      {value === "Sign In" && <SignIn setValue={setValue} />}
      {value === "Sign Up" && <SignUp setValue={setValue} />}
      {value === "authenticated" && verified && <MessageWindow setVerified={setVerified} verified={verified}/>}
      {value === "authenticated" && !verified && <MessageWindow setVerified={setVerified} verified={verified}/>}
    </div>
  );
};

export default Home;
