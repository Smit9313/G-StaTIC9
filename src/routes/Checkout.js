import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import "../Style/checkout.css";
import Navbar from "../components/navbar/Navbar";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Error from "./Error";
import { isEmpty } from "lodash";
import { Drawer, Radio, Space, ConfigProvider } from "antd";
import { Select } from "antd";
import qs from "qs";
import { Toaster, toast } from "react-hot-toast";
import useRazorpay from "react-razorpay";
import { useHistory } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Checkout() {
  const history = useHistory();
  const Razorpay = useRazorpay();
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState(false);
  const [products, setProducts] = useState(undefined);
  const [mobile, setMobile] = useState("");
  const [mobileFlag, setMobileFlag] = useState(false);
  const token = localStorage.getItem("token");

  const [userData, setUserData] = useState();
  const [addData, setAddData] = useState();

  const [open, setOpen] = useState(false);
  const [dwidth, setDwidth] = useState("30%");
  const [defaultAddress, setDefaultAddress] = useState();

  const [houseno, setHouseNo] = useState("");
  const [area, setArea] = useState("");
  const [addtype, setAddtype] = useState("Home");

  const [houseno1, setHouseNo1] = useState("");
  const [area1, setArea1] = useState("");
  const [addtype1, setAddtype1] = useState("Home");
  const [pincode1, setPincode1] = useState("");
  const [state1, setState1] = useState("");
  const [city1, setCity1] = useState("");
  const [navchange, setNavChange] = useState(false);

  const [updateDrop, setUpdateDrop] = useState(false);
  const [discountData, setDiscountData] = useState("");

  const [coupenCode, setCoupenCode] = useState("");
  const [eData, setEData] = useState();

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/checkout-user-info/`, {
          headers,
        })
        .then((response) => {
          console.log(response);
          if (response.data.message === "Success!") {
            setUserData(response.data.data);

            if (response.data.data["Ship-add"].length === 0) {
              // setMobile("");
              setDefaultAddress("");
              setHouseNo1("");
              setArea1("");
              setAddtype1("");
              setPincode1("");
              setState1("");
              setCity1("");
            } else {
              // setMobile(response.data.data.mobile_no);
              if (response.data.data.hasOwnProperty("mobile_no")) {
                setMobile(response.data.data["mobile_no"]);
              } else {
                setMobile(mobile);
              }
              setDefaultAddress(response.data.data["Ship-add"][0]._id);
              setAddData(response.data.data["Ship-add"][0]);
              setHouseNo1(response.data.data["Ship-add"][0].house_no);
              setArea1(response.data.data["Ship-add"][0].area_street);
              setAddtype1(response.data.data["Ship-add"][0].add_type);
              setPincode1(response.data.data["Ship-add"][0].pincode);
              setState1(response.data.data["Ship-add"][0].state);
              setCity1(response.data.data["Ship-add"][0].city);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}
  }, [updateDrop]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/cart/`, { headers })
        .then((response) => {
          if (response.data.message === "Success!") {
            setProducts(response.data.data);
            // console.log(response.data);
          } else if (
            response.data.message === "Token corrupted." ||
            response.data.message === "Cart is empty." ||
            response.data.message === "Cart is empty."
          ) {
            setProducts(undefined);
          } else {
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}
  }, [navchange]);

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

    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      axios
        .post(
          `${process.env.REACT_APP_API_HOST}/check-discount-code/`,
          qs.stringify({
            coupon_code: coupenCode,
            total_amount: total,
          }),
          {
            headers,
          }
        )
        .then((response) => {
          console.log(response);
          if (response.data.message === "Success!") {
            setDiscountData(response.data.data);
            toast.success("Coupen code applied!", {
              duration: 3000,
            });
          } else {
            toast.error(response.data.message, {
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log("Error");
    }
  };

  const handlePayment = (e) => {
    e.preventDefault();

    console.log(mobile);
    console.log(
      mobile,
      isEmpty(mobile),
      mobile.toString().length === 10
      // addData._id !== ""
    );

    if (mobile.toString().length !== "" && mobile.toString().length === 10) {
      setMobileFlag(false);
    } else {
      toast.error("Invalid mobile no.!", {
        duration: 3000,
      });
      setMobileFlag(true);
    }

    if (!isEmpty(addData) && addData._id !== "") {
    } else {
      toast.error("Add address details.!", {
        duration: 3000,
      });
    }

    if (
      !isEmpty(addData) &&
      mobile.toString().length !== "" &&
      mobile.toString().length === 10 &&
      addData._id !== ""
    ) {
      setMobileFlag(false);
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      let discountAmount = 0;
      if (!isNaN(discountData.applied_disc)) {
        discountAmount = parseInt(discountData.applied_disc);
      } else {
        discountAmount = 0;
      }

      try {
        axios
          .post(
            `${process.env.REACT_APP_API_HOST}/customer-order/`,
            {
              add_id: addData._id,
              mobile_no: parseInt(mobile),
              "Order-details": products.map((val, index) => ({
                prod_id: val.prod_id,
                prod_qty: {
                  [val.size.toUpperCase()]: val.qty,
                },
              })),
              disc_id: discountData._id,
              total_amount: total,
              discount: discountAmount,
            },
            {
              headers,
            }
          )
          .then((response) => {
            console.log(response);
            if (response.data.message === "Success!") {
              var options = {
                key: "rzp_test_Cl1G7wgRpRqdBD",
                currency: "INR",
                name: "Gurukrupa Fashion",
                description: "Test Transaction",
                image:
                  "https://firebasestorage.googleapis.com/v0/b/clothing-store-2.appspot.com/o/site_images%2Fgurukrupa.png?alt=media&token=f6246337-bbac-46a9-b2bf-1abaac2de541",
                order_id: response.data.data.razorpay_order_id,
                amount: parseInt(response.data.data.order_amount),
                prefill: {
                  name: response.data.data.name,
                  email: userData.email,
                  contact: response.data.data.mobile_no,
                },
                handler: async function (response1) {
                  console.log(response1);
                  // response1.push({"order_id":response.data.data.order_id})
                  response1.order_id = response.data.data.order_id;

                  try {
                    await axios
                      .post(
                        `${process.env.REACT_APP_API_HOST}/verify-order/`,
                        { response1 },
                        {
                          headers,
                        }
                      )
                      .then((dt) => {
                        if (dt.data.message === "Success!") {
                          toast.success("Payment successfully!", {
                            duration: 4000,
                          });
                          setNavChange(!navchange);

                          history.push("/my-order");
                        }
                        console.log(dt);
                      });
                  } catch (error) {
                    console.log(error);
                  }
                },
                theme: {
                  color: "#000",
                },
              };
              const rzpay = new Razorpay(options);
              rzpay.on("payment.failed", function (response2) {
                console.log(response2);
                response2.error.metadata.ord_id = response.data.data.order_id;
                let dataError = response2.error.metadata;
                try {
                  axios
                    .post(
                      `${process.env.REACT_APP_API_HOST}/verify-order/`,
                      { dataError },
                      {
                        headers,
                      }
                    )
                    .then((dt1) => {
                      if (dt1.data.message === "Order failed.") {
                        toast.error("Payment failed!");
                        // rzpay.close();
                        rzpay.onClose();
                      }
                    });
                } catch (error) {
                  console.log(error);
                }
              });
              rzpay.open();
            } else if (
              response.data.message === "Something wrong with order."
            ) {
              console.log(response.data.data);
              setEData(response.data.data);
            } else {
              toast.error(response.data.message);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {
        console.log("Error");
      }
    }
  };

  return (
    <>
      <Navbar navrender={navchange} />

      {!isEmpty(token) && !isEmpty(userData) && !isEmpty(products) ? (
        <>
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
                          value={userData.name}
                          disabled={true}
                          fullWidth={true}
                          inputProps={{ readOnly: true }}
                          InputProps={{
                            style: { color: "black" },
                          }}
                        />
                        {/* {flag1 && <p className="error-color">{nameError}</p>} */}
                      </div>

                      <div className="box">
                        <p>Enter Mobile No:</p>
                        <TextField
                          label="mobile no"
                          type="number"
                          size="small"
                          value={mobile}
                          InputProps={{
                            inputProps: { min: 1 },
                          }}
                          onChange={(e) => setMobile(e.target.value)}
                          fullWidth={true}
                          // inputProps={{ readOnly: true }}
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
                          value={userData.email}
                          disabled={true}
                          fullWidth={true}
                          inputProps={{ readOnly: true }}
                        />
                        {/* {flag3 && <p className="error-color">{emailError}</p>} */}
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
                              }}>
                              <button
                                className="button-131"
                                onClick={showDrawer}>
                                + Add new address
                              </button>
                              <button
                                className="button-111"
                                onClick={showDrawer1}>
                                + Add new address
                              </button>
                            </ConfigProvider>
                          </div>
                          {/* {addData.add_id !== "" && (
                          <p className="error-color">Enter valid number</p>
                        )} */}
                        </div>

                        <div className="box">
                          <Select
                            showSearch
                            style={{ width: 310 }}
                            defaultValue={defaultAddress}
                            onChange={(value) =>
                              userData["Ship-add"].map((val, index) => {
                                if (val._id === value) {
                                  setAddData(val);

                                  setHouseNo1(val.house_no);
                                  setArea1(val.area_street);
                                  setAddtype1(val.add_type);
                                  setPincode1(val.pincode);
                                  setState1(val.state);
                                  setCity1(val.city);
                                }
                              })
                            }
                            placeholder="Select address"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              (option?.label ?? "").includes(input)
                            }
                            filterSort={(optionA, optionB) =>
                              (optionA?.label ?? "")
                                .toLowerCase()
                                .localeCompare(
                                  (optionB?.label ?? "").toLowerCase()
                                )
                            }
                            options={userData["Ship-add"].map((val, index) => ({
                              label: val.Shipadd_label,
                              value: val._id,
                            }))}
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
                          disabled={true}
                          value={houseno1}
                          fullWidth={true}
                          inputProps={{ readOnly: true }}
                        />
                      </div>

                      <div className="box">
                        <p>Area Street:</p>
                        <TextField
                          label="area street"
                          size="small"
                          disabled={true}
                          value={area1}
                          fullWidth={true}
                          inputProps={{ readOnly: true }}
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
                          }}>
                          <Radio.Group
                            defaultValue={addtype1}
                            buttonStyle="solid"
                            value={addtype1}
                            disabled={true}>
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
                          disabled={true}
                          value={pincode1}
                          size="small"
                          fullWidth={true}
                          inputProps={{ readOnly: true }}
                          // onChange={(e) => setPincode(e.target.value)}
                        />
                        {/* {pincodeError && (
                        <p className="error-color">Enter valid pincode.</p>
                      )} */}
                      </div>

                      <div className="box">
                        <p>State:</p>
                        <TextField
                          label="state"
                          size="small"
                          disabled={true}
                          value={state1}
                          fullWidth={true}
                          inputProps={{ readOnly: true }}
                        />
                      </div>

                      <div className="box">
                        <p>City:</p>
                        <TextField
                          label="city"
                          size="small"
                          value={city1}
                          disabled={true}
                          fullWidth={true}
                          inputProps={{ readOnly: true }}
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
                      {!isEmpty(discountData) && (
                        <>
                          <tr>
                            <th>- Discount</th>
                            <th></th>
                            <th></th>
                            <th>{discountData.disc_percent}%</th>
                            <th>{discountData.applied_disc}</th>
                          </tr>

                          <tr>
                            <th>Total</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>
                              {total - parseInt(discountData.applied_disc)}
                            </th>
                          </tr>
                        </>
                      )}
                    </tfoot>
                  </table>

                  {!isEmpty(eData) &&
                    eData.map((evalue, index) => {
                      return (
                        <div key={index} className="echeckout">
                          <p>
                            Item: {evalue.prod_name}, Size: {evalue.size}{" "}
                          </p>
                          <p style={{ color: "red" }}>*{evalue.message}</p>
                        </div>
                      );
                    })}

                  <div className="promotion">
                    <label htmlFor="promo-code">Have A Promo Code?</label>
                    <input
                      type="text"
                      style={{ textTransform: "uppercase" }}
                      onChange={(e) => setCoupenCode(e.target.value)}
                    />

                    <button type="button" onClick={handleDiscount} />
                  </div>
                  {!isEmpty(discountData) && (
                    <div className="discount-details">
                      <p>Applied discount : {discountData.applied_disc}</p>
                      <p>
                        Maximum discount amount : {discountData.max_disc_amt}
                      </p>
                      <p>Minimum order value : {discountData.min_ord_val}</p>
                    </div>
                  )}

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
        </>
      ) : (
        <>
          <div className="loader-spin">
            <ClipLoader color="#000" />
          </div>
        </>
      )}

      <Footer />

      <ThemeProvider theme={theme}>
        <Drawer
          title="Add new address"
          // placement={placement}
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
                }}>
                <button className="button-1311" onClick={onClose}>
                  Cancel
                </button>

                <button className="button-1311" onClick={handleNewAddress}>
                  Add
                </button>
              </ConfigProvider>
            </Space>
          }>
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
                }}>
                <Radio.Group
                  defaultValue="Home"
                  buttonStyle="solid"
                  value={addtype}
                  onChange={(value) => {
                    setAddtype(value.target.value);
                  }}>
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
