import React, { useState } from "react";
import Header from "../../components/Header";
import "../../Style/addsuplier.css";
import TextField from "@mui/material/TextField";
import Footer from "../../components/Footer";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import qs from "qs";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Input } from "antd";


function AddAdmin() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
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

  // flags
  const [flag1, setFlag1] = useState(false);
  const [flag3, setFlag3] = useState(false);

  const width = true;

  const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: "#09142d",
      },
      secondary: {
        // This is green.A700 as hex.
        main: "#11cb5f",
      },
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    /************** Name *************/

    let nameNull = name.trim() === "";
    let nameNotNull = name.trim() !== "";
    let minNameLength = name.trim().length < 6;
    let maxNameLength = name.trim().length > 15;

    if (nameNull) {
      setNameFlag(false);
      setNameError("Name Should not blank.");
      setFlag1(true);
    }

    if ((minNameLength || maxNameLength) && nameNotNull) {
      setNameFlag(false);
      setNameError("Username length must be 6 to 15");
      setFlag1(true);
    }

    if (!nameNull && !minNameLength && !maxNameLength) {
      setNameFlag(true);
      setFlag1(false);
    }

    /************** Email *************/
    const email_pattern =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let emailNull = email.trim() === "";
    let emailNotNull = email.trim() !== "";

    if (emailNull) {
      setEmailFlag(false);
      setEmailError("Email Should not be blank.");
      setFlag3(true);
    }

    if (emailNotNull && !email_pattern.test(email)) {
      setEmailFlag(false);
      setEmailError("Enter Valid Email.");
      setFlag3(true);
    }

    if (emailNotNull && email_pattern.test(email)) {
      setEmailFlag(true);
      setFlag3(false);
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

    if (nameNull || emailNull || !email_pattern.test(email)) {
      toast.error("Something wrong!", {
        duration: 3000,
      });
    }

    if (
      !nameNull &&
      !minNameLength &&
      !maxNameLength &&
      !emailNull &&
      email_pattern.test(email) &&
      !passConNull &&
      pass === passCon &&
      !passNull &&
      !minPassLength &&
      !maxPassLength
    ) {
      console.log("Valid");
      axios
        .post(`${process.env.REACT_APP_API_HOST}/signup/`, {
          name: name,
          email: email.toLocaleLowerCase(),
          password: passCon,
          role: "admin",
        })
        .then((response) => {
          if (response.data.message === "Success!") {
            setName("");
            setEmail("");
            setPass("");
            setPassCon("");
            setFlag1(false);
            setFlag3(false);
            toast.success("Admin added", {
              duration: 3000,
            });
          
          } else {
            toast.error(response.data.message, {
              duration: 3000,
            });
          }
        })
        .catch((error) => {});
    }
  };

  return (
    <>
      <Header name="Add Admin" path="admin / addAdmin" />
      <ThemeProvider theme={theme}>
        <form onSubmit={handleSubmit}>
          <div className="add-suplier">
            <div className="add-suplier-sub1">
              <div className="box">
                <p>Enter Admin Name:</p>
                <TextField
                  label="name"
                  size="small"
                  value={name}
                  fullWidth={width}
                  onChange={(e) => setName(e.target.value)}
                />
                {flag1 && (
                  <p className="error-color set-margin-left">{nameError}</p>
                )}
              </div>

              <div className="box">
                <p>Enter Email:</p>
                <TextField
                  label="email"
                  size="small"
                  value={email}
                  fullWidth={width}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {flag3 && (
                  <p className="error-color set-margin-left">{emailError}</p>
                )}
              </div>

              <div className="box">
                <p>Enter Password:</p>
                <Input.Password
                  type="password"
                  style={{
                    height: "45px",
                    borderColor: "#000000",
                  }}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="Enter your password"
                />

                {!passFlag && (
                  <p className="error-color set-margin-left">{passError}</p>
                )}
              </div>

              <div className="box">
                <p>Enter Confirm Password:</p>
                <Input.Password
                  type="password"
                  style={{
                    height: "45px",
                    borderColor: "#000000",
                  }}
                  onChange={(e) => setPassCon(e.target.value)}
                  placeholder="Confirm your password"
                />
                {!passConFlag && (
                  <p className="error-color set-margin-left">{passConError}</p>
                )}
              </div>

              <div className="suplier-button">
                <button onClick={handleSubmit} className="button-311">
                  Add
                </button>
              </div>
            </div>
          </div>
        </form>
      </ThemeProvider>
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

export default AddAdmin;
