import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import "../Style/checkout.css";
import Navbar from "../components/navbar/Navbar";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { isEmpty } from "lodash";
import { Drawer, Radio, Space, ConfigProvider } from "antd";
import { Select } from "antd";
import qs from "qs";
import { Toaster, toast } from "react-hot-toast";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import products from "../data/CartProduct";


function Checkout() {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState(false);
  const [mobile, setMobile] = useState("");
  const [mobileFlag, setMobileFlag] = useState(false);

  const [open, setOpen] = useState(false);
  const [dwidth, setDwidth] = useState("30%");

  const [houseno, setHouseNo] = useState("");
  const [area, setArea] = useState("");
  const [addtype, setAddtype] = useState("Home");

  const [navchange, setNavChange] = useState(false);

  const [updateDrop, setUpdateDrop] = useState(false);


  const showDrawer = (e) => {
    e.preventDefault();
    setDwidth("30%");
    setOpen(true);
  };

  const showDrawer1 = (e) => {
    e.preventDefault();
    setDwidth("100%");
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

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

  let total = 0;

  const handleNewAddress = (e) => {
    e.preventDefault();

    // console.log(houseno,area,addtype,pincode,state,city)
    if (
      houseno !== "" &&
      area !== "" &&
      addtype !== "" &&
      pincode !== "" &&
      state !== "" &&
      city !== ""
    ) {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      try {
        axios
          .post(
            `${process.env.REACT_APP_API_HOST}/customer-address/`,
            qs.stringify({
              house_no: houseno,
              area_street: area,
              add_type: addtype,
              pincode: pincode,
              state: state,
              city: city,
            }),
            { headers }
          )
          .then((response) => {
            console.log(response.data.message);

            if (response.data.message === "Success!") {
              setHouseNo("");
              setArea("");
              setAddtype("");
              setPincode("");
              setState("");
              setCity("");
              setUpdateDrop(!updateDrop);
              // setMobile(mobile);

              toast.success("Address added!");

              setOpen(false);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {
        console.log("Error");
      }
    } else {
      toast.error("Fill all details!", {
        duration: 3000,
      });
    }
  };

  const handleDiscount = (e) => {
    e.preventDefault();
  };

  const handlePayment = (e) => {
    e.preventDefault();

    console.log(mobile);
    console.log(
      mobile,
      isEmpty(mobile),
      mobile.toString().length === 10
    );

    if (mobile.toString().length !== "" && mobile.toString().length === 10) {
      setMobileFlag(false);
    } else {
      toast.error("Invalid mobile no.!", {
        duration: 3000,
      });
      setMobileFlag(true);
    }

    if (
      mobile.toString().length !== "" &&
      mobile.toString().length === 10 
    ) {
      setMobileFlag(false);
      toast.success("Valid!");
    }
  };

  return (
    <>
      <Navbar navrender={navchange} />
      <ThemeProvider theme={theme}>
        <div style={{ margin: "65px" }}></div>
        <div className="row-checkout">
          <div className="col-75">
            <form>
              <div className="checkout-form">
                <div className="add-suplier-sub1">
                  <h2>Checkout</h2>
                  <div className="box">
                    <p>Enter Name:</p>
                    <TextField
                      label="name"
                      size="small"
                      style={{ color: "black" }}
                      fullWidth={true}
                      InputProps={{
                        style: { color: "black" },
                      }}
                    />
                  </div>

                  <div className="box">
                    <p>Enter Mobile No:</p>
                    <TextField
                      label="mobile no"
                      type="number"
                      size="small"
                      InputProps={{
                        inputProps: { min: 1 },
                      }}
                      onChange={(e) => setMobile(e.target.value)}
                      fullWidth={true}
                    />
                    {mobileFlag && (
                      <p className="error-color">Enter valid number</p>
                    )}
                  </div>

                  <div className="box">
                    <p>Enter Email:</p>
                    <TextField
                      label="email"
                      size="small"
                      fullWidth={true}
                    />
                  </div>

                  <div className="box">
                    <div className="box-sub-btn">
                      <p>Select address</p>
                      <div>
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
                          <button className="button-131" onClick={showDrawer}>
                            + Add new address
                          </button>
                          <button className="button-111" onClick={showDrawer1}>
                            + Add new address
                          </button>
                        </ConfigProvider>
                      </div>
                    </div>

                    <div className="box">
                      <Select
                        showSearch
                        style={{ width: 310 }}
                        placeholder="Select address"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? "").includes(input)
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="add-suplier-sub1">
                  <h4>Address:</h4>
                  <div className="box">
                    <p>House no:</p>
                    <TextField
                      label="house no"
                      size="small"
                      fullWidth={true}
                    />
                  </div>

                  <div className="box">
                    <p>Area Street:</p>
                    <TextField
                      label="area street"
                      size="small"
                      fullWidth={true}
                    />
                  </div>

                  <div className="box">
                    <p>Address type</p>
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
                      <Radio.Group defaultValue={"Home"} buttonStyle="solid">
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
                      size="small"
                      fullWidth={true}
                    />
                  </div>

                  <div className="box">
                    <p>State:</p>
                    <TextField
                      label="state"
                      size="small"
                      fullWidth={true}
                    />
                  </div>

                  <div className="box">
                    <p>City:</p>
                    <TextField
                      label="city"
                      size="small"
                      fullWidth={true}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="col-75">
            <div className="add-suplier-sub1 cart-products-details">
              <table className="table-checkout">
                <thead>
                  <tr>
                    <th>Items</th>
                    <th>Size</th>
                    <th>price</th>
                    <th>Qty</th>
                    <th>Sub-total</th>
                  </tr>
                </thead>
                <tbody>
                  {!isEmpty(products) &&
                        products.map((val, key) => {
                          total = total + val.prod_price * val.qty;
                          return (
                            <tr key={key}>
                              <td>{val.prod_name}</td>
                              <td>{val.size}</td>
                              <td>{val.prod_price} *</td>
                              <td>{val.qty}</td>
                              <td>{val.qty * val.prod_price}</td>
                            </tr>
                          );
                        })}
                </tbody>
                <tfoot>
                  <tr>
                    <th>Total</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>{total}</th>
                  </tr>
                </tfoot>
              </table>

              <div className="promotion">
                <label htmlFor="promo-code">Have A Promo Code?</label>
                <input
                  type="text"
                  style={{ textTransform: "uppercase" }}
                />

                <button type="button" onClick={handleDiscount} />
              </div>

              <form>
                <div className="continue-btn">
                  <button className="checkout-btn" onClick={handlePayment}>
                    Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div style={{ margin: "100px" }}></div>
      </ThemeProvider>

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

                <button className="button-1311" onClick={handleNewAddress}>
                  Add
                </button>
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

export default Checkout;
