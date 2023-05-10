import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import { ConfigProvider } from "antd";
import { Rate, Modal } from "antd";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Toaster, toast } from "react-hot-toast";
import { Button, Result } from "antd";
import { useHistory } from "react-router-dom";
import orderData from "../data/MyOrder";
import RatingData from "../data/RatingData";

function MyOrder() {
  const test = Array(orderData.length).fill(false);
  const rateData = RatingData;
  const history = useHistory();

  const [modalsVisible, setModalsVisible] = useState(
    Array(orderData.length).fill(false)
  );

  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat",
    },

    palette: {
      primary: {
        main: "#09142d",
      },
      secondary: {
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

  const showModal = (index, oid) => {
    console.log(index, oid);
    const newModalsVisible = [...modalsVisible];
    newModalsVisible[index] = true;
    setModalsVisible(newModalsVisible);
  };

  const handleCancel = () => {
    setModalsVisible(test);
  };
  const updateRate = (value, rate) => {
    toast.success("Rated!");
  };

  const handleOk = (index, oid) => {
    const newModalsVisible = [...modalsVisible];
    newModalsVisible[index] = false;
    setModalsVisible(newModalsVisible);
    toast.success("Rating added!", {
      duration: 3000,
    });
  };

  return (
    <>
      <Navbar />
      {!isEmpty(orderData) ? (
        <ThemeProvider theme={theme}>
          <div className="profile-user-order" style={{ marginTop: "100px" }}>
            <center>
              <h2>My Order</h2>
            </center>
            {orderData.map((value, index) => {
              return (
                <>
                  <div key={value._id} className="order-data">
                    <p>Order - {index + 1}</p>
                    <div className="order-address-data">
                      <div>
                        <div className="sub-address-data">
                          <p>House no</p>
                          <h5>: {value.house_no}</h5>
                        </div>

                        <div className="sub-address-data">
                          <p>Area-street:</p>
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
                      </div>

                      <div className="order-location">
                        <div className="sub-address-data">
                          <p>Order date</p>
                          <h5>: {value.order_date.substring(0, 10)}</h5>
                        </div>

                        <div className="sub-address-data">
                          <p>Total amount</p>
                          <h5>: {value.total_amount}</h5>
                        </div>

                        {value.order_status === "Failed" && (
                          <div className="sub-address-data">
                            <p>Order status</p>
                            <h5 className="failed">: Failed</h5>
                          </div>
                        )}
                        {value.order_status === "Pending" && (
                          <div className="sub-address-data">
                            <p>Order status</p>
                            <h5 className="pending">: Pending</h5>
                          </div>
                        )}
                        {value.order_status === "Delivered" && (
                          <div className="sub-address-data">
                            <p>Order status</p>
                            <h5 className="pending">: Delivered</h5>
                          </div>
                        )}
                      </div>
                    </div>

                    {value.Order_details.map((prod, index1) => {
                      return (
                        <>
                          <div key={index1} className="product-data">
                            <div className="order-product-image">
                              <Link to={`single-product/${prod.prod_id}`}>
                                <img
                                  src={prod.prod_image}
                                  height="100px"
                                  alt=""
                                />
                              </Link>
                            </div>
                            <div className="order-product-data">
                              <Link to={`single-product/${prod.prod_id}`}>
                                {prod.prod_name}
                              </Link>
                              <p>Price: {prod.prod_price}</p>
                              <p>Size: {prod.size}</p>
                              <p>Qty: {prod.qty}</p>
                            </div>
                          </div>
                        </>
                      );
                    })}

                    {value.order_status !== "Failed" && (
                      <Link to={`/invoice/${value._id}`}>
                        <button className="button-4445">Get invoice</button>
                      </Link>
                    )}
                    {value.order_status === "Delivered" && (
                      <>
                        {" "}
                        <button
                          className="button-4445"
                          onClick={() => showModal(index, value._id)}
                        >
                          Give rating
                        </button>
                        <ConfigProvider
                          theme={{
                            components: {
                              Button: {
                                colorPrimary: "#000",
                                colorPrimaryHover: "#000",
                                colorPrimaryClick: "#000",
                                colorPrimaryActive: "#000",
                              },
                            },
                          }}
                        >
                          {!isEmpty(rateData) && (
                            <>
                              <Modal
                                // mask={false}
                                maskStyle={{
                                  backgroundColor: "#ffffff34",
                                  opacity: 0.45,
                                }}
                                title="Give rating"
                                open={modalsVisible[index]}
                                onOk={() => handleOk(index, value._id)}
                                onCancel={handleCancel}
                              >
                                {rateData.map((rate) => {
                                  return (
                                    <div className="rate-div">
                                      <div className="rate-div-sub1">
                                        <img
                                          src={rate.prod_image}
                                          height="100px"
                                          width="80px"
                                          alt="i"
                                        />
                                        <p>{rate.prod_name}</p>
                                      </div>

                                      {isEmpty(rate.date) && (
                                        <div className="rate-div-sub2">
                                          <Rate
                                            value={rate.rating}
                                            onChange={(value) => {
                                              updateRate(value, rate);
                                            }}
                                            defaultValue={rate.rating}
                                          />
                                        </div>
                                      )}

                                      {!isEmpty(rate.date) && (
                                        <div className="rate-div-sub2">
                                          <Rate
                                            disabled
                                            value={rate.rating}
                                            defaultValue={rate.rating}
                                          />
                                          <p>{rate.date.substring(0, 10)}</p>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </Modal>
                            </>
                          )}
                        </ConfigProvider>
                      </>
                    )}
                  </div>
                </>
              );
            })}
            <div className="space-order-product"></div>
          </div>
        </ThemeProvider>
      ) : (
        <div style={{ marginTop: "80px" }}>
          <Result
            status="404"
            // title="404"
            subTitle="No order found!"
            extra={
              <Button
                type="primary"
                style={{ color: "white", background: "black" }}
                onClick={() => history.push("/home")}
              >
                Back Home
              </Button>
            }
          />
        </div>
      )}
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

export default MyOrder;
