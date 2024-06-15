import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { provider, auth } from "./firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { FcGoogle } from "react-icons/fc";

import "./style.scss";

const SignIn = ({ setState }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const singInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        console.log("Successfully Sign In:", data);
      })
      .catch((error) => {
        console.log(
          "Error on Signing with google:",
          "message:",
          error.message,
          "code:",
          error.code
        );
      });
  };

  const signin = (event) => {
    event.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified === false) {
          console.log("Please Verify Your Email ID");
          setState("authenticated")
          // auth.signOut();
        } else console.log("Successfull Signin", user);
      })
      .catch((error) => {
        alert("User Not Fount Please Sign Up First", error);
        setState("Sign Up");
      });
  };

  const handleChange = (event) => {
    if (event.target.name === "email") setEmail(event.target.value);
    else if (event.target.name === "password") setPassword(event.target.value);
  };

  return (
    <div className="wrapper">
      <h3>Sign In</h3>
      <form onSubmit={signin} className="form">
        <input
          className="input"
          type="Email"
          placeholder="Email"
          value={email}
          name="email"
          onChange={handleChange}
        />
        <input
          className="input"
          type="Password"
          placeholder="Password"
          value={password}
          name="password"
          onChange={handleChange}
        />
        <p className="privacy">By creating or accessing an account on this website you agree with our <a href="/Navodayans-Uplift-Association-27R/privacy_policy" >Privacy Policy</a></p>
        <button className="btn" type="submit">
          Sign In
        </button>
      </form>
      <hr className="line" />
      <span className="google" onClick={singInWithGoogle}>
        <FcGoogle size={25} className="icon" />
        Sign In With Google
      </span>
      <span className="sign">
        Don't have an account?{" "}
        <span
          className="setState"
          onClick={() => {
            setState("Sign Up");
          }}
        >
          Sign Up
        </span>{" "}
      </span>
    </div>
  );
};

export default SignIn;
