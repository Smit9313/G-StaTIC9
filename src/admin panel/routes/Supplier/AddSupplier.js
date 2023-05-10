import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import "../../Style/addsuplier.css";
import TextField from "@mui/material/TextField";
import Footer from "../../components/Footer";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import qs from "qs";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function AddSuplier() {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState(false);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [nameFlag, setNameFlag] = useState(false);

  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [mobileFlag, setMobileFlag] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailFlag, setEmailFlag] = useState(false);

  const [shop, setShop] = useState("");
  const [shopError, setShopError] = useState("");
  const [flag4, setFlag4] = useState(false);

  const [area, setArea] = useState("");
  const [areaError, setAreaError] = useState("");
  const [flag5, setFlag5] = useState(false);

  const [landmark, setLandmark] = useState("");
  const [landmarkError, setLankmarkError] = useState("");
  const [flag6, setFlag6] = useState(false);

  // flags
  const [flag1, setFlag1] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const [flag3, setFlag3] = useState(false);

  const [message, setMessage] = useState("");
  const [valid, setValid] = useState(false);

  const width = true;

  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat",
    },

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
    components: {
      MuiCssBaseline: {
        styleOverrides: `
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Raleway'), local('Raleway-Regular'), url('public\fonts\futura\futura light bt.ttf') format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );

      if (pincode.length === 6) {
        if (
          result.data[0].Message !== "No records found" &&
          result.data[0].Message !== "The requested resource is not found"
        ) {
          setCity(result.data[0].PostOffice[0].District);
          setState(result.data[0].PostOffice[0].State);
          setPincodeError(false);
        }
      } else {
        setPincodeError(true);
        setState("");
        setCity("");
      }

      if (pincode.length === 0) {
        setPincodeError(false);
      }
    };

    fetchData();
  }, [pincode]);

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

    /************** Mobile no *************/
    if (mobile.trim() === "") {
      setMobileFlag(false);
      setMobileError("Mobile no. Should not blank!");
      setFlag2(true);
    }

    if (mobile.trim().length > 10 || mobile.trim().length < 10) {
      setMobileFlag(false);
      setMobileError("Enter valid mobile no!");
      setFlag2(true);
    }

    if (mobile.trim().length === 10) {
      setMobileFlag(true);
      setFlag2(false);
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

    // Shop no

    if (shop === "") {
      setFlag4(true);
      setShopError("Shop no should not be blank.");
    } else {
      setFlag4(false);
    }

    // Area

    if (area === "") {
      setFlag5(true);
      setAreaError("Area should not be blank");
    } else {
      setFlag5(false);
    }

    // landmark

    if (landmark === "") {
      setFlag6(true);
      setLankmarkError("Landmark should not be blank");
    } else {
      setFlag6(false);
    }

    // pincode
    if (pincode === "" || pincode.toString().length !== 6) {
      setPincodeError(true);
    } else {
      setPincodeError(false);
    }

    if (
      nameNull ||
      // minNameLength ||
      // maxNameLength ||
      mobile.trim().length !== 10 ||
      emailNull ||
      !email_pattern.test(email) ||
      shop === "" ||
      area === "" ||
      landmark === ""
    ) {
      toast.error("Something wrong!", {
        duration: 3000,
      });
    }

    if (
      !nameNull &&
      !minNameLength &&
      !maxNameLength &&
      mobile.trim().length === 10 &&
      emailNotNull &&
      email_pattern.test(email) &&
      shop !== "" &&
      area !== "" &&
      landmark !== "" &&
      pincode.toString().length === 6 &&
      state !== "" &&
      city !== ""
    ) {
      console.log("valid");

      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      try {
        axios
          .post(
            `${process.env.REACT_APP_API_HOST}/admin-supplier/`,
            qs.stringify({
              name: name,
              mobile_no: mobile,
              email: email,
              shop_no: shop,
              area_street: area,
              landmark: landmark,
              city: city,
              state: state,
              pincode: pincode,
            }),
            { headers }
          )
          .then((response) => {
            console.log(response);
            if (response.data["message"] === "Success!") {
              setValid(true);
              toast.success("Supplier Added!", {
                duration: 3000,
              });
              setEmailFlag(false);
              setMobileFlag(false);
              setNameFlag(false);

              setName("");
              setMobile("");
              setEmail("");
              setShop("");
              setArea("");
              setLandmark("");
              setCity("");
              setState("");
              setPincode("");

              setFlag1(false);
              setFlag2(false);
              setFlag3(false);
              setFlag4(false);
              setFlag5(false);
              setFlag6(false);
            } else if (response.data["message"] === "Supplier not inserted.") {
              setValid(false);
              toast.error("Supplier not inserted!", {
                duration: 3000,
              });
            } else if (response.data["message"] === "User not admin.") {
              setValid(false);
              toast.error(" User not admin.!", {
                duration: 3000,
              });
            }else if (response.data["message"] === "Supplier already exists."){
              setValid(false);
              toast.error(response.data["message"], {
                duration: 3000,
              });
            }
             else {
              toast.error("Something wrong!", {
                duration: 3000,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
        //  setMessage("Supplier Added.");
      } catch (err) {
        // setError(err);
        console.log("Error");
        setMessage("");
      }
      // setMessage("Supplier Added.");
      console.log();
    }
  };

  return (
    <>
      <Header name="Add Suplier" path="admin / addSuplier" />
      <ThemeProvider theme={theme}>
        <form onSubmit={handleSubmit}>
          <div className="add-suplier">
            <div className="add-suplier-sub1">
              <div className="box">
                <p>Enter Suplier Name:</p>
                <TextField
                  label="name"
                  size="small"
                  value={name}
                  fullWidth={width}
                  onChange={(e) => setName(e.target.value)}
                />
                {flag1 && <p className="error-color">{nameError}</p>}
              </div>

              <div className="box">
                <p>Enter Mobile No:</p>
                <TextField
                  label="mobile no"
                  type="number"
                  size="small"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  fullWidth={width}
                />
                {flag2 && <p className="error-color">{mobileError}</p>}
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
                {flag3 && <p className="error-color">{emailError}</p>}
              </div>
            </div>

            <div className="add-suplier-sub1">
              <div className="box">
                <p>Enter Shop no:</p>
                <TextField
                  label="shop no"
                  size="small"
                  value={shop}
                  fullWidth={width}
                  onChange={(e) => setShop(e.target.value)}
                />
                {flag4 && <p className="error-color">{shopError}</p>}
              </div>

              <div className="box">
                <p>Enter Area Street:</p>
                <TextField
                  label="area street"
                  size="small"
                  value={area}
                  fullWidth={width}
                  onChange={(e) => setArea(e.target.value)}
                />
                {flag5 && <p className="error-color">{areaError}</p>}
              </div>

              <div className="box">
                <p>Enter Landmark:</p>
                <TextField
                  label="landmark"
                  size="small"
                  value={landmark}
                  fullWidth={width}
                  onChange={(e) => setLandmark(e.target.value)}
                />
                {flag6 && <p className="error-color">{landmarkError}</p>}
              </div>

              <div className="box">
                <p>Enter Pincode:</p>
                <TextField
                  label="pincode"
                  type="number"
                  value={pincode}
                  size="small"
                  fullWidth={width}
                  onChange={(e) => setPincode(e.target.value)}
                />
                {pincodeError && (
                  <p className="error-color">Enter valid pincode.</p>
                )}
              </div>

              <div className="box">
                <p>State:</p>
                <TextField
                  label="state"
                  size="small"
                  value={state}
                  disabled={true}
                  fullWidth={width}
                  inputProps={{ readOnly: true }}
                />
              </div>

              <div className="box">
                <p>City:</p>
                <TextField
                  label="city"
                  size="small"
                  value={city}
                  disabled={true}
                  fullWidth={width}
                  inputProps={{ readOnly: true }}
                />
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

export default AddSuplier;
