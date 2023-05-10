import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Footer from "../../components/Footer";
import "../../Style/addproduct.css";
import axios from "axios";
import { Select } from "antd";
import Switch from "@mui/material/Switch";
import { Upload, message } from "antd";
import { Toaster, toast } from "react-hot-toast";
import { LineWave } from "react-loader-spinner";
import { createTheme, ThemeProvider } from "@mui/material/styles";


function AddProduct() {
  const width = true;
  const [cat_typeflag, setCat_typeFlag] = useState(false);
  const [catid, setCatid] = useState("");
  const [cat_data, setCat_Data] = useState();
  const [sub_data, setSub_Data] = useState();
  const [images, setImages] = useState([]);
  const [imagesFlag, setImagesFlag] = useState(false);
  const [imagesError, setImagesError] = useState("")

  const [cattype, setCatType] = useState("");
  const [cattypeFlag, setCatTypeFlag] = useState(false);
  const [cattypeError, setCatTypeError] = useState("");

  const [name, setName] = useState("");
  const [nameFlag, setNameFlag] = useState(false);
  const [nameError, setNameError] = useState("");

  const [subcatid, setSubCatid] = useState("");
  const [subcatidFlag, setSubCatidFlag] = useState(false);
  const [subcatidError, setSubCatidError] = useState("");

  const [active, setActive] = useState(true);
  // const [activeFlag, setActiveFlag] = useState(false);
  // const [activeError, setActiveError] = useState("");

  const [description, setDescription] = useState("");
  const [descriptionFlag, setDescriptionFlag] = useState(false);
  const [descriptionError, setDescriptionError] = useState("");

  const [price, setPrice] = useState("");
  const [priceFlag, setPriceFlag] = useState(false);
  const [priceError, setPriceError] = useState("");

  const [loading, setLoading] = useState(false);

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
        .get(
          `${process.env.REACT_APP_API_HOST}/admin-category-type/`,
          //  qs.stringify({ cat_type: cat_type, active: cat_status }),
          { headers }
        )
        .then((response) => {
          //  console.log(response.data.data);
          setCat_Data(
            response.data.data.map(({ cat_type, _id }) => ({
              label: cat_type,
              value: _id,
            }))
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}
  }, [cat_typeflag]);

  const handleChange = ({ fileList }) => setImages(fileList);

  const props = {
    multiple: true,
    onChange: handleChange,
    beforeUpload: (file) => {
      const isJpgOrPng =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must be smaller than 2MB!");
      }
      return !isJpgOrPng && !isLt2M;
    },
  };
  //  console.log(images)

  const handleProduct = async (e) => {
    e.preventDefault();

    console.log(images)
    const formData = new FormData();
    images.map(async (file, index) => {
      formData.append(index, file.originFileObj, file?.name);
    });

    // Name
    if (name === "") {
      setNameError("Name should not be null");
      setNameFlag(true);
    }

    if (name !== "") {
      setNameError("");
      setNameFlag(false);
    }

    // Sub category id
    if (cattype === "") {
      setCatTypeError("Name should not be null");
      setCatTypeFlag(true);
    }

    if (cattype !== "") {
      setCatTypeError("");
      setCatTypeFlag(false);
    }

    // category
    if (subcatid === "") {
      setSubCatidError("Sub category should not be null");
      setSubCatidFlag(true);
    }

    if (subcatid !== "") {
      setSubCatidError("");
      setSubCatidFlag(false);
    }

    // description
    if (description === "") {
      setDescriptionError("Description should not be null");
      setDescriptionFlag(true);
    }

    if (description !== "") {
      setDescriptionError("");
      setDescriptionFlag(false);
    }

    // price
    if (price === "") {
      setPriceError("Price should not be null");
      setPriceFlag(true);
    }

    if (price !== "") {
      setPriceError("");
      setPriceFlag(false);
    }

    // images
    if(images.length < 3){
      setImagesFlag(true);
      setImagesError("Minimum 3 images required!");
    }
    if(images.length > 3){
       setImagesFlag(true);
       setImagesError("Upload only 3 images");
    }

    if(images.length === 3){
      setImagesFlag(false);
      setImagesError("");
    }


    if (
      name === "" ||
      subcatid === "" ||
      description === "" ||
      price === "" ||
      images === []
    ) {
      toast.error("Something wrong!", {
        duration: 3000,
      });
    }

    if (
      name !== "" &&
      subcatid !== "" &&
      description !== "" &&
      price !== "" &&
      images.length === 3
    ) {
      const token = localStorage.getItem("token");
      setLoading(true)
      

      formData.append("prod_name", name);
      formData.append("cat_id", subcatid);
      formData.append("active", active);
      formData.append("prod_desc", description);
      formData.append("prod_price", price);


      try {
        axios
          .post(`${process.env.REACT_APP_API_HOST}/admin-product/`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": `multipart/form-data`,
            },
          })
          .then((response) => {
            console.log(response.data.message);
            if (response.data.message === "Success!") {
              
              toast.success("Product added!", {
                duration: 3000,
              });
              setName("");
              setImages([]);
              setActive(true);
              setDescription("");
              setPrice("");
              setLoading(false)
            } else {
              toast.error(response.data.message, {
                duration: 3000,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {}
    }
  };

  return (
    <>
      <Header name="Add Product" path="admin / addProduct" />
      <ThemeProvider theme={theme}>
        <div className="add-suplier">
          <div className="add-suplier-sub1">
            <div className="box">
              <p>Enter product name:</p>
              <TextField
                label="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                size="small"
                fullWidth={width}
              />
              {nameFlag && <p className="error-color">{nameError}</p>}
            </div>

            <div className="box">
              <p>Select category-type</p>
              <Select
                showSearch
                style={{ width: 332 }}
                placeholder="Search to Select"
                // value={}
                onChange={(value1) => {
                  // console.log(value1);
                  setCatType(value1);

                  const token = localStorage.getItem("token");
                  const headers = { Authorization: `Bearer ${token}` };

                  try {
                    axios
                      .get(
                        `${process.env.REACT_APP_API_HOST}/admin-cat-type-to-category/${value1}/`,
                        //  qs.stringify({ cat_type: cat_type, active: cat_status }),
                        { headers }
                      )
                      .then((response) => {
                        console.log(response.data.data.Category);
                        setSub_Data(
                          response.data.data.Category.map(
                            ({ cat_title, cat_id }) => ({
                              label: cat_title,
                              value: cat_id,
                            })
                          )
                        );
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  } catch (err) {}
                }}
                size="medium"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={cat_data}
              />
              {cattypeFlag && <p className="error-color">{cattypeError}</p>}
            </div>

            <div className="box">
              <p>Select category</p>
              <Select
                showSearch
                style={{ width: 332 }}
                placeholder="Select category"
                value={subcatid}
                onChange={(value) => setSubCatid(value)}
                size="mediam"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={sub_data}
              />
              {subcatidFlag && <p className="error-color">{subcatidError}</p>}
            </div>

            <div className="box">
              <p>Enter status:</p>
              <Switch
                defaultChecked
                // checked={true}
                onChange={(e) => {
                  console.log(e.target.checked);
                  setActive(e.target.checked);
                }}
              />
            </div>

            <div className="box">
              <p>Enter product description:</p>
              <TextField
                label="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                size="small"
                fullWidth={width}
              />
              {descriptionFlag && (
                <p className="error-color">{descriptionError}</p>
              )}
            </div>

            <div className="box">
              <p>Enter price:</p>
              <TextField
                label="price"
                value={price}
                type="number"
                InputProps={{
                  inputProps: { min: 1 },
                }}
                onChange={(e) => setPrice(e.target.value)}
                size="small"
                fullWidth={width}
              />
              {priceFlag && <p className="error-color">{priceError}</p>}
            </div>
          </div>

          <div className="add-suplier-sub1">
            {loading && (
              <div style={{ marginLeft: "40px" }}>
                <LineWave
                  height="100"
                  width="100"
                  color="#000"
                  ariaLabel="line-wave"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  firstLineColor=""
                  middleLineColor=""
                  lastLineColor=""
                />
              </div>
            )}
            <div className="box box-qty ds-flex">
              <p>select Product image:</p>
              <br />
              <Upload.Dragger
                {...props}
                fileList={images}
                multiple
                accept=".jpg,.png,.jpeg"
                listType="picture">
                Drag file here OR
                <br />
                <Button>upload</Button>
              </Upload.Dragger>
              {imagesFlag && <p className="error-color">{imagesError}</p>}
              {loading && <h4>loading...</h4>}
            </div>

            <br />
            <br />
            <div className="suplier-button">
              <button
                // variant="contained"
                className="button-311"
                type="submit"
                onClick={handleProduct}
                // endIcon={<SendIcon />}
                // fullWidth={width}
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <Toaster
          position="top-center"
          containerStyle={{
            top: 65,
          }}
          reverseOrder={true}
        />
      </ThemeProvider>
      <Footer />
    </>
  );
}

export default AddProduct;
