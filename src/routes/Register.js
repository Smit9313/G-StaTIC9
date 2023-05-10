import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import "../Style/register.css";
import Footer from "./Footer.js";
import { Toaster, toast } from "react-hot-toast";
import { Input } from "antd";

function Register() {
  const [uname, setUname] = useState("");
  const [unameError, setUnameError] = useState("");
  const [nameFlag, setNameFlag] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailFlag, setEmailFlag] = useState(false);

  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState("");
  const [passFlag, setPassFlag] = useState(false);

  const [passCon, setPassCon] = useState("");
  const [passConError, setPassConError] = useState("");
  const [passConFlag, setPassConFlag] = useState(false);

  const [error, setError] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);

  const [navClose, setNavClose] = useState(false);


  const validateRegister = (event) => {
    event.preventDefault();

    /******** Username *******/

    let nameNull = uname.trim() === "";

    if (nameNull) {
      setNameFlag(false);
      setUnameError("Name Should not blank.");
    }

    if (!nameNull) {
      setNameFlag(true);
    }

    /****** Email *******/
    const email_pattern =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let emailNull = email.trim() === "";
    let emailNotNull = email.trim() !== "";

    if (emailNull) {
      setEmailFlag(false);
      setEmailError("Email Should not be blank.");
    }

    if (emailNotNull && !email_pattern.test(email)) {
      setEmailFlag(false);
      setEmailError("Enter Valid Email.");
    }

    if (!emailNull && email_pattern.test(email)) {
      setEmailFlag(true);
    }

    /****** Password *******/

    let passNull = pass.trim() === "";
    let passNotNull = pass.trim() !== "";
    let minPassLength = pass.trim().length < 7;
    let maxPassLength = pass.trim().length > 10;

    if (passNull) {
      setPassFlag(false);
      setPassError("Password Should not blank.");
    }

    if ((minPassLength || maxPassLength) && passNotNull) {
      setPassFlag(false);
      setPassError("password length must be 8 to 10");
    }

    if (!passNull && !minPassLength && !maxPassLength) {
      setPassFlag(true);
    }

    /****** Confirm Password *******/

    let passConNull = passCon.trim() === "";
    let passConNotNull = passCon.trim() !== "";
    let minPassConLength = passCon.trim().length < 7;
    let maxPassConLength = passCon.trim().length > 10;

    if (passConNull) {
      setPassConFlag(false);
      setPassConError("Confirm Password Should not blank.");
    }

    if ((minPassConLength || maxPassConLength) && passConNotNull) {
      setPassConFlag(false);
      setPassConError("Confirm password length must be 8 to 10");
    }

    if (passConNotNull && pass !== passCon) {
      setPassConFlag(false);
      setPassConError("password and confirm password must be same.");
    }
    if (!passConNull && pass === passCon) {
      setPassConFlag(true);
    }

    if (
      !nameNull &&
      !emailNull &&
      email_pattern.test(email) &&
      !passNull &&
      !minPassLength &&
      !maxPassLength &&
      !passConNull &&
      pass === passCon
    ) {
      toast.success("Valid!");
      setUname("");
      setEmail("");
      setPass("");
      setPassCon("");
    }
  };

  return (
    <>
      <Navbar closeNav={navClose} />
      {/* <div className="extra"></div> */}
      <div onClick={() => setNavClose(!navClose)}>
        <div className="container1 animate__animated animate__zoomIn">
          <div className="title">Registration</div>
          <div className="content">
            <form onSubmit={validateRegister}>
              <div className="user-details">
                <div className="input-box">
                  <span className="details">Name</span>
                  <input
                    id="inputText"
                    type="text"
                    value={uname}
                    placeholder="Enter your name"
                    onChange={(e) => setUname(e.target.value)}
                  />
                  {!nameFlag && <p className="error-color">{unameError}</p>}
                </div>
                <div className="input-box">
                  <span className="details">Email</span>
                  <input
                    id="inputText"
                    type="text"
                    value={email}
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {!emailFlag && <p className="error-color">{emailError}</p>}
                  {errorFlag && <p className="error-color">{error}</p>}
                </div>
                <div style={{ marginTop: "30px" }}>
                  <span className="details">Password</span>
                  <Input.Password
                    type="password"
                    id="font-style"
                    value={pass}
                    style={{
                      height: "45px",
                      fontSize: "16px",
                      borderBottomWidth: "2px",
                      borderColor: "#000000",
                    }}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="Enter your password"
                  />
                  {!passFlag && <p className="error-color">{passError}</p>}
                </div>
                <div style={{ marginTop: "30px" }}>
                  <span style={{ marginTop: "30px" }} className="details">
                    Confirm Password
                  </span>
                  <Input.Password
                    type="password"
                    id="font-style"
                    value={passCon}
                    style={{
                      height: "45px",
                      fontSize: "16px",
                      borderBottomWidth: "2px",
                      borderColor: "#000000",
                    }}
                    onChange={(e) => setPassCon(e.target.value)}
                    placeholder="Confirm your password"
                  />
                  {!passConFlag && (
                    <p className="error-color">{passConError}</p>
                  )}
                </div>
              </div>
              <button style={{ marginTop: "30px" }} type="submit">
                Register
              </button>
            </form>
          </div>
        </div>
        <div className="extra"></div>
        <Footer />
      </div>
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

export default Register;
