import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "./Footer";
import { Input } from "antd";
import { Toaster, toast } from "react-hot-toast";

function ChangePasswordProfile() {
  const [oldpassword, setOldPassword] = useState("");
  const [oldPassError, setOldPassError] = useState("");
  const [oldPassFlag, setOldPassFlag] = useState(false);

  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");

  const [passError, setPassError] = useState("");
  const [passFlag, setPassFlag] = useState(false);

  const [passConError, setPassConError] = useState("");
  const [passConFlag, setPassConFlag] = useState(false);

  const handleChangePassword = (e) => {
    e.preventDefault();

    console.log(oldpassword, password, conPassword);

    /****** Old password *******/

    if (oldpassword === "") {
      setOldPassFlag(true);
      setOldPassError("Old password Should not blank!");
    }

    if (oldpassword !== "") {
      setOldPassError("");
      setOldPassFlag(false);
    }

    if (oldpassword !== password) {
      setPassFlag(false);
      setPassError("");
    }

    /****** Password *******/

    if (password === "") {
      setPassFlag(true);
      setPassError("Password Should not blank.");
    }

    if (password !== "") {
      setPassFlag(false);
      setPassError("");
    }
    if (oldpassword === password) {
      setPassFlag(true);
      setPassError("Old password and new password must be different!");
    }

    /****** Password *******/

    if (conPassword === "") {
      setPassConFlag(true);
      setPassConError("Password Should not blank.");
    }

    if (conPassword !== "") {
      setPassConFlag(false);
      setPassConError("");
    }

    if (password !== conPassword) {
      setPassConFlag(true);
      setPassConError("password and confirm password must be same.");
    }

    if (
      password !== "" &&
      password.length < 10 &&
      password.length > 7 &&
      conPassword !== "" &&
      conPassword.length < 10 &&
      conPassword.length > 7 &&
      password === conPassword &&
      oldpassword !== password
    ) {
      toast.success("password changed successfully!", {
        duration: 3000,
      });
      setOldPassword("");
      setPassword("");
      setConPassword("");
      setOldPassFlag(false);
      setPassFlag(false);
      setPassConFlag(false);
    }
  };
  return (
    <>
      <Navbar />
      <div
        className="profile-user-changePassword"
        style={{ marginTop: "100px", marginBottom: "100px" }}
      >
        <center>
          <h2 style={{ marginTop: "10px" }}>Change password:</h2>
        </center>
        <div className="change-password">
          <form>
            <div className="input-line">
              <h6>Old password:</h6>
              <div>
                <Input.Password
                  type="password"
                  id="font-style"
                  value={oldpassword}
                  style={{
                    height: "45px",
                    width: "200px",
                    fontSize: "15px",
                    marginLeft: "50px",
                    borderBottomWidth: "2px",
                    borderColor: "#000000",
                    fontFamily: "Montserrat",
                    marginBottom: "0px",
                  }}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter old password"
                />
                {oldPassFlag && <p className="error-color">{oldPassError}</p>}
              </div>
            </div>
            <br />

            <div className="input-line">
              <h6>New password:</h6>
              <div>
                <Input.Password
                  type="password"
                  id="font-style"
                  value={password}
                  style={{
                    height: "45px",
                    width: "200px",
                    fontSize: "15px",
                    marginLeft: "50px",
                    borderBottomWidth: "2px",
                    borderColor: "#000000",
                    marginBottom: "0px",
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                />
                {passFlag && <p className="error-color">{passError}</p>}
              </div>
            </div>

            <br />
            <div className="input-line">
              <h6>Confirm password:</h6>
              <div>
                <Input.Password
                  type="password"
                  value={conPassword}
                  id="font-style"
                  style={{
                    height: "45px",
                    width: "200px",
                    marginLeft: "50px",
                    fontSize: "15px",
                    borderBottomWidth: "2px",
                    borderColor: "#000000",
                    marginBottom: "0px",
                  }}
                  onChange={(e) => setConPassword(e.target.value)}
                  placeholder="Enter confirm password"
                />
                {passConFlag && <p className="error-color">{passConError}</p>}
              </div>
            </div>
            <div className="input-line">
              <button className="button-31" onClick={handleChangePassword}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
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

export default ChangePasswordProfile;
