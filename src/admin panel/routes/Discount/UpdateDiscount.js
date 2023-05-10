import React, { useState, useEffect } from "react";
import { Slider } from "antd";
import { useParams, useHistory } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TextField from "@mui/material/TextField";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import dayjs from "dayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ConfigProvider, InputNumber, DatePicker } from "antd";
import { isEmpty } from "lodash";
import qs from "qs";
import Error from "../../../routes/Error";
import ClipLoader from "react-spinners/ClipLoader";

function UpdateDiscount() {
  let { id } = useParams();
  const history = useHistory();
  // console.log(id)
  // valid from
  const [validFrom, setvalidFrom] = useState(dayjs());
  const [error2, setError2] = useState("");
  const [flag2, setFlag2] = useState(false);

  // valid until
  const [validUntil, setValidUntil] = useState(dayjs());
  const [error3, setError3] = useState("");
  const [flag3, setFlag3] = useState(false);

  // coupen code
  const [coupen, setCoupen] = useState("");
  const [error4, setError4] = useState("");
  const [flag4, setFlag4] = useState(false);

  // minimum order value
  const [minValue, setminValue] = useState("");
  const [error5, setError5] = useState("");
  const [flag5, setFlag5] = useState(false);

  // maximum order value
  const [maxValue, setmaxValue] = useState("");
  const [error6, setError6] = useState("");
  const [flag6, setFlag6] = useState(false);

  const [inputValue, setInputValue] = useState(1);

  const [showForm, setshowForm] = useState(false); 

  const width = true;

  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat",
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

  useEffect(() => {
    
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/product-discount/${id}/`, {
          headers,
        })
        .then((response) => {
          console.log(response);
          if (response.data.message === "Success!") {
            setshowForm(true);
            setInputValue(response.data.data.disc_percent);
            setvalidFrom(dayjs(response.data.data.valid_from));
            setValidUntil(dayjs(response.data.data.valid_until));
            setCoupen(response.data.data.coupon_code);
            setminValue(response.data.data.min_ord_val);
            setmaxValue(response.data.data.max_disc_amt);

            // setValidFrom1(dayjs(response.data.data.valid_from).$d);
            // setValidUntil1(dayjs(response.data.data.valid_until).$d);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log("Error");
    }
  }, [id]);

  const onChange = (newValue) => {
    setInputValue(newValue);
  };

  const onChangeFrom = (date, dateStrinig) => {
    setvalidFrom(date);
  };

  const onChangeUntil = (date, dateString) => {
    setValidUntil(date);
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day");
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (isEmpty(validFrom)) {
      setError2("Select date!");
      setFlag2(true);
    } else {
      setError2("");
      setFlag2(false);
    }

    if (isEmpty(validUntil)) {
      setError3("select date!");
      setFlag3(true);
    } else {
      setError3("");
      setFlag3(false);
    }

    if (validFrom > validUntil) {
      setError3("select valid date!");
      setFlag3(true);
    }

    if (coupen === "") {
      setFlag4(true);
      setError4("Enter valid coupen code!");
    } else {
      setFlag4(false);
      setError4("");
    }

    if (minValue === "") {
      setFlag5(true);
      setError5("Enter valid min amount!");
    } else {
      setFlag5(false);
      setError5("");
    }

    if (maxValue === "") {
      setFlag6(true);
      setError6("Enter valid max amount!");
    } else {
      setFlag6(false);
      setError6("");
    }

    console.log(
      inputValue !== "",
      !isEmpty(validFrom),
      !isEmpty(validUntil),
      validFrom < validUntil,
      coupen !== "",
      minValue !== "",
      maxValue !== ""
    );
    console.log(
      inputValue,
      validFrom.$d,
      validUntil.$d,
      coupen,
      minValue,
      maxValue
    );

    if (
      inputValue !== "" &&
      !isEmpty(validFrom) &&
      !isEmpty(validUntil) &&
      validFrom < validUntil &&
      coupen !== "" &&
      minValue !== "" &&
      maxValue !== ""
    ) {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      };
      try {
        axios
          .patch(
            `${process.env.REACT_APP_API_HOST}/product-discount/${id}/`,
            qs.stringify({
              disc_percent: inputValue,
              valid_from: validFrom.$d,
              valid_until: validUntil.$d,
              coupon_code: coupen,
              min_ord_val: minValue,
              max_disc_amt: maxValue,
            }),
            { headers }
          )
          .then((response) => {
            console.log(response);
            if (response.data["message"] === "Success!") {
              toast.success("Discount updated!", {
                duration: 3000,
              });
              setInputValue(1);
              setCoupen("");
              setminValue("");
              setmaxValue("");
              setvalidFrom(dayjs());
              setValidUntil(dayjs());
              history.push("/admin/manageDiscount");
            } else {
              toast.error(response.data.message, {
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
      }
    } else {
      toast.error("Something wrong!", {
        duration: 3000,
      });
    }
  };

  return (
    <>
      {showForm ? (
        <section className="home">
          <Header name="Update Discount" path="admin / updateDiscount" />
          <ThemeProvider theme={theme}>
            <div className="add-suplier">
              <div className="add-suplier-sub1">
                <div className="box">
                  <p>Discount percentage:</p>
                  <ConfigProvider
                    theme={{
                      components: {
                        Slider: {
                          colorPrimary: "#000",
                          colorPrimaryHover: "#000",
                          colorPrimaryBorder: "#000",
                          colorPrimaryBorderHover: "#000",
                        },
                        InputNumber: {
                          colorPrimary: "#000",
                          colorPrimaryHover: "#000",
                          colorPrimaryBorder: "#000",
                          colorPrimaryBorderHover: "#000",
                        },
                      },
                    }}>
                    <Slider
                      min={1}
                      max={100}
                      onChange={onChange}
                      value={typeof inputValue === "number" ? inputValue : 0}
                    />{" "}
                    <InputNumber
                      min={1}
                      max={100}
                      style={{
                        width: "60px",
                      }}
                      value={inputValue}
                      onChange={onChange}
                    />
                  </ConfigProvider>
                </div>

                <div className="box">
                  <p>Valid from:</p>
                  <ConfigProvider
                    theme={{
                      components: {
                        DatePicker: {
                          colorPrimary: "#000",
                          colorPrimaryHover: "#000",
                          colorPrimaryBorder: "#000",
                          colorPrimaryBorderHover: "#000",
                          colorPrimaryText: "#000",
                        },
                      },
                    }}>
                    <DatePicker
                      allowClear={false}
                      value={validFrom}
                      onChange={onChangeFrom}
                      disabledDate={disabledDate}
                    />
                  </ConfigProvider>
                  {flag2 && <p className="error-color">{error2}</p>}
                </div>

                <div className="box">
                  <p>Valid until:</p>
                  <ConfigProvider
                    theme={{
                      components: {
                        DatePicker: {
                          colorPrimary: "#000",
                          colorPrimaryHover: "#000",
                          colorPrimaryBorder: "#000",
                          colorPrimaryBorderHover: "#000",
                          colorPrimaryText: "#000",
                        },
                      },
                    }}>
                    <DatePicker
                      allowClear={false}
                      value={validUntil}
                      onChange={onChangeUntil}
                    />
                  </ConfigProvider>
                  {flag3 && <p className="error-color">{error3}</p>}
                </div>
              </div>

              <div className="add-suplier-sub1">
                <div className="box">
                  <p>Coupon code:</p>
                  <TextField
                    label="coupen code"
                    value={coupen.toUpperCase()}
                    onChange={(e) => setCoupen(e.target.value)}
                    size="small"
                    fullWidth={width}
                  />
                  {flag4 && <p className="error-color">{error4}</p>}
                </div>

                <div className="box">
                  <p>Minimum order value:</p>
                  <TextField
                    label="min order value"
                    type="number"
                    value={minValue}
                    InputProps={{
                      inputProps: { min: 1 },
                    }}
                    onChange={(e) => setminValue(e.target.value)}
                    size="small"
                    fullWidth={width}
                  />
                  {flag5 && <p className="error-color">{error5}</p>}
                </div>

                <div className="box">
                  <p>Maximum discount amount:</p>
                  <TextField
                    label="max discount amount"
                    size="small"
                    value={maxValue}
                    InputProps={{
                      inputProps: { min: 1 },
                    }}
                    onChange={(e) => setmaxValue(e.target.value)}
                    type="number"
                    fullWidth={width}
                  />
                  {flag6 && <p className="error-color">{error6}</p>}
                </div>

                <div className="suplier-button">
                  <button className="button-311" onClick={handleClick}>
                    Update
                  </button>
                </div>
              </div>
            </div>
          </ThemeProvider>
          <Footer />
          <Toaster
            position="top-center"
            containerStyle={{
              top: 65,
            }}
            reverseOrder={true}
          />
        </section>
      ) : (
        <>
          <div className="loader-spin">
            <ClipLoader color="#000" />
          </div>
        </>
      )}
    </>
  );
}

export default UpdateDiscount;
