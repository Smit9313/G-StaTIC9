import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import "../Style/profile.css";
import Footer from "./Footer";
import axios from "axios";
import { isEmpty } from "lodash";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Drawer, Radio, Space, ConfigProvider } from "antd";
import TextField from "@mui/material/TextField";
import { Toaster, toast } from "react-hot-toast";
import { message, Popconfirm } from "antd";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import userData from "../data/UserData";
import userAddress from "../data/UserAddress";

function Profile() {
  const [addressData, setAddressData] = useState(userAddress);
  const [expanded, setExpanded] = useState(false);

  const [houseno, setHouseNo] = useState("");
  const [area, setArea] = useState("");
  const [addtype, setAddtype] = useState("Home");

  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState(false);

  const [open, setOpen] = useState(false);
  const [dwidth, setDwidth] = useState("30%");

  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const [updateDrop, setUpdateDrop] = useState(false);
  const [updateButton, setUpdateButton] = useState(false);

  const [addressId, setAddressId] = useState();
  const [updateAddress, setUpdateAddress] = useState(false);

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

  const handleChange = (index) => (event, isExpanded) => {
    setExpanded(isExpanded ? index : false);
  };

  const confirm = (addid) => {
    setUpdateDrop(!updateDrop);
    message.success("deleted successfully!");
  };
  const cancel = (e) => {};

  const showDrawer = (e) => {
    e.preventDefault();
    setDwidth("30%");
    setOpen(true);
    setUpdateButton(false);
  };
  const showDrawer1 = (e) => {
    e.preventDefault();
    setDwidth("100%");
    setOpen(true);
    setUpdateButton(false);
  };

  const onClose = () => {
    setOpen(false);
    setHouseNo("");
    setArea("");
    setPincode("");
    setState("");
    setCity("");
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );

      if (!isEmpty(pincode)) {
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
      }

      if (pincode.length === 0) {
        setPincodeError(false);
      }
    };

    fetchData();
  }, [pincode]);

  const handleNewAddress = (e) => {
    e.preventDefault();

    if (
      houseno !== "" &&
      area !== "" &&
      addtype !== "" &&
      pincode !== "" &&
      state !== "" &&
      city !== ""
    ) {
      setUpdateDrop(!updateDrop);

      setHouseNo("");
      setArea("");
      setAddtype("");
      setPincode("");
      setState("");
      setCity("");
      setUpdateDrop(true);

      toast.success("Address added!");

      setOpen(false);
    } else {
      toast.error("Fill all details!", {
        duration: 3000,
      });
    }
  };

  const handleEditAddress = (
    addid,
    house_no2,
    area_street2,
    add_type2,
    pincode2,
    state2,
    city2
  ) => {
    setDwidth("30%");
    setOpen(true);
    setUpdateButton(true);
    setAddressId(addid);
    setHouseNo(house_no2);
    setArea(area_street2);
    setAddtype(add_type2);
    setPincode(pincode2);
    setState(state2);
    setCity(city2);
  };

  const handleEditAddress1 = (
    addid,
    house_no1,
    area_street1,
    add_type1,
    pincode1,
    state1,
    city1
  ) => {
    setDwidth("100%");
    setOpen(true);
    setAddressId(addid);
    setUpdateButton(true);
    setHouseNo(house_no1);
    setArea(area_street1);
    setAddtype(add_type1);
    setPincode(pincode1);
    setState(state1);
    setCity(city1);
  };

  const handleAddressUpdate = () => {
    if (
      houseno !== "" &&
      area !== "" &&
      addtype !== "" &&
      pincode !== "" &&
      state !== "" &&
      city !== ""
    ) {
      setOpen(false);
      setHouseNo("");
      setArea("");
      setPincode("");
      setState("");
      setCity("");

      toast.success("Address updated!");
      setUpdateAddress(!updateAddress);
    } else {
      toast.error("Fill all details!", {
        duration: 3000,
      });
    }
  };

  return (
    <>
      <Navbar />

      <div className="exp"></div>

      {!isEmpty(userData) && (
        <>
          <ThemeProvider theme={theme}>
            <div className="profile-container">
              <div className="profile-user-details">
                <center>
                  <h3>User Details:</h3>
                </center>
                <div className="profile-user-details-sub">
                  <div className="sub-address-data">
                    <p>Name</p>
                    <h5>: {userData.name}</h5>
                  </div>

                  <div className="sub-address-data">
                    <p>Email</p>
                    <h5>: {userData.email}</h5>
                  </div>

                  <div className="sub-address-data">
                    <p>Mobile no</p>
                    <h5>: {userData.mobile_no}</h5>
                  </div>
                </div>
              </div>

              <div className="profile-user-address">
                <center>
                  <h3>Address details:</h3>
                </center>
                <button className="button-4" onClick={showDrawer}>
                  + Add new address
                </button>
                <button className="button-44" onClick={showDrawer1}>
                  + Add new address
                </button>
                {!isEmpty(addressData) &&
                  addressData.map((value, index) => {
                    return (
                      <div key={index} className="profile-user-details-sub">
                        <Accordion
                          expanded={expanded === index}
                          onChange={handleChange(index)}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                          >
                            <Typography sx={{ width: "33%", flexShrink: 0 }}>
                              <h4> Address {index + 1}</h4>
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              <div className="address-div">
                                <div className="sub-address-data">
                                  <p>House no</p>
                                  <h5>: {value.house_no}</h5>
                                </div>

                                <div className="sub-address-data">
                                  <p>Area street</p>
                                  <h5>: {value.area_street}</h5>
                                </div>

                                <div className="sub-address-data">
                                  <p>Add type</p>
                                  <h5>: {value.add_type}</h5>
                                </div>

                                <div className="sub-address-data">
                                  <p>Pincode</p>
                                  <h5>: {value.pincode}</h5>
                                </div>

                                <div className="sub-address-data">
                                  <p>State</p>
                                  <h5>: {value.state}</h5>
                                </div>

                                <div className="sub-address-data">
                                  <p>City</p>
                                  <h5>: {value.city}</h5>
                                </div>

                                <button
                                  className="button-444"
                                  onClick={() =>
                                    handleEditAddress(
                                      value._id,
                                      value.house_no,
                                      value.area_street,
                                      value.add_type,
                                      value.pincode,
                                      value.state,
                                      value.city
                                    )
                                  }
                                >
                                  Edit
                                </button>

                                <button
                                  className="button-4444"
                                  onClick={() =>
                                    handleEditAddress1(
                                      value._id,
                                      value.house_no,
                                      value.area_street,
                                      value.add_type,
                                      value.pincode,
                                      value.state,
                                      value.city
                                    )
                                  }
                                >
                                  Edit
                                </button>

                                <ConfigProvider
                                  theme={{
                                    components: {
                                      Button: {
                                        colorPrimary: "#000",
                                        colorPrimaryHover: "#000",
                                        colorPrimaryClick: "#000",
                                      },
                                    },
                                  }}
                                >
                                  <Popconfirm
                                    title="Delete the task"
                                    description="Are you sure to delete this address?"
                                    onConfirm={() => confirm(value._id)}
                                    onCancel={cancel}
                                    okText="Yes"
                                    cancelText="No"
                                  >
                                    {/* <a href="#">Delete</a> */}
                                    <button
                                      className="button-4445"
                                      // onClick={() => handleDelete(value._id)}
                                    >
                                      Delete
                                    </button>
                                  </Popconfirm>
                                </ConfigProvider>
                              </div>
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    );
                  })}
              </div>
            </div>
          </ThemeProvider>
        </>
      )}
      <div className="exp"></div>
      <Footer />
      <ThemeProvider theme={theme}>
        <Drawer
          title="Add new address"
          className="drawer"
          width={dwidth}
          onClose={onClose}
          open={open}
          extra={
            <Space>
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      colorPrimary: "#000",
                      colorPrimaryHover: "#fff",
                      width: "200px",
                    },
                  },
                }}
              >
                <button className="button-1311" onClick={onClose}>
                  Cancel
                </button>

                {!updateButton && (
                  <button className="button-1311" onClick={handleNewAddress}>
                    Add
                  </button>
                )}

                {updateButton && (
                  <button className="button-1311" onClick={handleAddressUpdate}>
                    Update
                  </button>
                )}
              </ConfigProvider>
            </Space>
          }
        >
          <div className="add-suplier-sub11">
            <div className="box">
              <p>House no:</p>
              <TextField
                label="house no"
                size="small"
                value={houseno}
                fullWidth={true}
                onChange={(e) => setHouseNo(e.target.value)}
              />
            </div>

            <div className="box">
              <p>Area Street:</p>
              <TextField
                label="area street"
                size="small"
                value={area}
                fullWidth={true}
                onChange={(e) => setArea(e.target.value)}
              />
            </div>

            <div className="box">
              <p>Select address type</p>
              <ConfigProvider
                theme={{
                  components: {
                    Radio: {
                      colorPrimary: "#000",
                      colorPrimaryHover: "#000",
                    },
                  },
                }}
              >
                <Radio.Group
                  defaultValue="Home"
                  buttonStyle="solid"
                  value={addtype}
                  onChange={(value) => {
                    setAddtype(value.target.value);
                  }}
                >
                  <Radio.Button value="Home">Home</Radio.Button>
                  <Radio.Button value="Office">Office</Radio.Button>
                </Radio.Group>
              </ConfigProvider>
            </div>

            <div className="box">
              <p>Pincode:</p>
              <TextField
                label="pincode"
                type="number"
                value={pincode}
                size="small"
                fullWidth={true}
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
                fullWidth={true}
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
                fullWidth={true}
                inputProps={{ readOnly: true }}
              />
            </div>
          </div>
        </Drawer>
      </ThemeProvider>
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

export default Profile;
