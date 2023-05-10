import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "./Footer";
import { useHistory } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailFlag, setEmailFlag] = useState(false);
  const [flag, setFlag] = useState(true);

  let history = useHistory();

  const handleClick = (event) => {
    event.preventDefault();

    /****** Email *******/
    const email_pattern =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let emailNull = email.trim() === "";
    let emailNotNull = email.trim() !== "";

    if (emailNull) {
      setEmailFlag(false);
      setEmailError("Email Should not be blank.");
      toast.error("Email Should not be blank.", {
        duration: 3000,
      });
    }

    if (emailNotNull && !email_pattern.test(email)) {
      setEmailFlag(false);
      setEmailError("Enter Valid Email.");
      setFlag(true);
      toast.error("Enter Valid Email.", {
        duration: 3000,
      });
    }

    if (!emailNull && email_pattern.test(email)) {
      setEmailError("");
      toast.success("Valid!");
      setFlag(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="extra-space-login"></div>
      <div style={{ marginLeft: "45vw" }}></div>
      <div className="container1">
        <div className="title">Reset Password</div>
        <div className="content">
          {flag && (
            <form>
              <div className="user-details">
                <div className="input-box">
                  <span className="details">Email:</span>
                  <input
                    type="text"
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {!emailFlag && <p>{emailError}</p>}
                </div>
              </div>

              <button type="submit" onClick={handleClick}>
                Send mail
              </button>
            </form>
          )}

          {!flag && (
            <form>
              <div className="user-details">
                <div className="input-box">
                  You should receive a link in a few moments. Please open that
                  link to reset your password.
                  <br />
                  <span className="details">Email:</span>
                  <h5>{email}</h5>
                </div>
              </div>

              <button type="submit" onClick={() => history.push("/login")}>
                back to login
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="extra-space-login"></div>

      <Footer />
      <Toaster
        position="top-center"
        containerStyle={{
          top: 65,
        }}
        reverseOrder={true}
      />
    </>
  );
}

export default ForgotPassword;
