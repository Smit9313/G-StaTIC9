import React, { useState, useEffect } from "react";
import { useParams,useHistory } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Switch from "@mui/material/Switch";
import qs from "qs";
import "react-toastify/dist/ReactToastify.css";
import { Select } from "antd";
import { Toaster, toast } from "react-hot-toast";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function UpdateCategory() {
  let { id } = useParams();
  const history = useHistory();
  // Category_type
  const [cattype, setCat_type] = useState("");
  const [cat_typeflag, setCat_typeFlag] = useState(false);
  const [cat_typeerror, setCat_typeError] = useState("");
  const [cat1, setCat1] = useState(false);

  const [cat_status, setCat_status] = useState();

  const [cat_data, setCat_Data] = useState();

  // Category
  const [catid, setCatid] = useState("");
  const [catidflag, setCatIdFlag] = useState(false);
  const [catiderror, setCatIdError] = useState("");
  const [cat2, setCat2] = useState(false);

  const [cat_title, setCat_Title] = useState("");
  const [cat_titleFlag, setCat_TitleFlag] = useState(false);
  const [cat_titleError, setCat_TitleError] = useState("");
  const [cat3, setCat3] = useState(false);

  const [category_description, setCategotyDescription] = useState("");
  const [category_desFlag, setCategotyDesFlag] = useState(false);
  const [category_desError, setCategotyDesError] = useState("");
  const [cat4, setCat4] = useState(false);

  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const [subcatstatus, setSubCatStatus] = useState();

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
        .get(
          `${process.env.REACT_APP_API_HOST}/admin-category-type/${id}`,
          //  qs.stringify({ cat_type: cat_type, active: cat_status }),
          { headers }
        )
        .then((response) => {
          console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}
  }, []);

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/admin-category-type/${id}/`, {
          headers,
        })
        .then((response) => {
          console.log(response);
          if (response.data.message === "Success!") {
            setCat_type(response.data.data.cat_type);
            setCat_status(response.data.data.active);
            setVisible1(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log("Error");
    }

    try {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/admin-category/${id}/`, {
          headers,
        })
        .then((response) => {
          console.log(response);
          if (response.data.message === "Success!") {
            // setCat_type(response.data.data.cat_type);
            setCatid(response.data.data.cat_type_id);
            setCat_Title(response.data.data.cat_title);
            setCategotyDescription(response.data.data.cat_desc)
            setSubCatStatus(response.data.data.active)
            setVisible2(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log("Error");
    }
  }, [id]);

  const handleCategoryType = (e) => {
    e.preventDefault();

    /******* Category *******/


    if (cattype.trim().length === 0) {
      setCat_typeFlag(false);
      setCat_typeError("Invalid category!");
      toast.error("Invalid category!", {
        duration: 3000,
      });
      setCat1(true);
    }
    if (cattype.trim().length !== 0) {
      setCat_typeFlag(true);
    }

    if (cattype.trim().length !== 0) {
      console.log("valid");
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      try {
        axios
          .patch(
            `${process.env.REACT_APP_API_HOST}/admin-category-type/${id}/`,
            qs.stringify({ cat_type: cattype, active: cat_status }),
            { headers }
          )
          .then((response) => {
            if (response.data.message === "Success!") {
              setCat_typeFlag(false);
              toast.success("Category-type updated!", {
                duration: 3000,
              });
              setCat_type("");
              history.push("/admin/manageCategory");
              setCat_status(true);
              setCat1(false);
            } else if (
              response.data.message === "Category-type not inserted."
            ) {
              setCat_typeFlag(false);
              toast.error(response.data.message, {
                duration: 3000,
              });
              setCat_typeError("Category-type not inserted.");
            } else if (
              response.data.message === "Category-type already exists."
            ) {
              setCat_typeFlag(false);
              toast.error(response.data.message, {
                duration: 3000,
              });
              setCat_typeError("Category-type already exists.");
            } else if (response.data.message === "User not admin.") {
              setCat_typeFlag(false);
              toast.error(response.data.message, {
                duration: 3000,
              });
              setCat_typeError("User not admin.");
            } else {
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {}
    }
  };

  const handleCategory = (e) => {
    e.preventDefault();

    // Category type

    if (catid === "") {
      setCatIdFlag(false);
      setCatIdError("Select category!");
      setCat2(true);
    }
    if (catid !== "") {
      setCatIdFlag(true);
    }

    /******* Title *******/
    const re = /^[A-Za-z]+$/;

    if (cat_title.trim().length === 0) {
      setCat_TitleFlag(false);
      setCat_TitleError("Invalid category!");
      // toast_message("warning");
      setCat3(true);
    }
    // if (!re.test(cat_title)) {
    //   setCat_TitleFlag(false);
    //   setCat_TitleError("Invalid title!");
    //   //  toast_message("warning");
    //   setCat3(true);
    // }
    if (
      cat_title.trim().length !== 0
    ) {
      setCat_TitleFlag(true);
      setCat3(false);
    }

    /******* Description *******/
    if (
      category_description.toString().length === 0 ||
      category_description.toString().length < 10
    ) {
      setCategotyDesFlag(false);
      setCategotyDesError("Invalid Length!");
      setCat4(true);
      // toast_message("warning");
    }
    // if (!re.test(category_description)) {
    //   setCategotyDesFlag(false);
    //   setCategotyDesError("Invalid description!");
    //   setCat4(true);
    //   //  toast_message("warning");
    // }
    if (
      category_description.toString().length !== 0 &&
      category_description.toString().length > 5
      // re.test(category_description)
    ) {
      setCategotyDesFlag(true);
      setCat4(false);
      // console.log("des valid")
    }

    if (
      catid === "" ||
      cat_title.trim().length === 0 ||
      category_description.toString().length === 0 ||
      category_description.toString().length < 5
      // !re.test(category_description)
    ) {
      toast.error("Something wrong!", {
        duration: 3000,
      });
    }

    console.log(
      catid !== "",
        cat_title.toString().length !== 0,
        re.test(cat_title) ,
        category_description.trim().length !== 0 ,
        category_description.trim().length > 5
    );

    if (
      catid !== "" &&
      cat_title.toString().length !== 0 &&
      category_description.trim().length !== 0 &&
      category_description.trim().length > 5
      // re.test(category_description)
    ) {
      console.log("valid");
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      try {
        axios
          .patch(
            `${process.env.REACT_APP_API_HOST}/admin-category/${id}/`,
            qs.stringify({
              cat_type_id: catid,
              active: subcatstatus,
              cat_title: cat_title,
              cat_desc: category_description,
            }),
            { headers }
          )
          .then((response) => {
            // console.log(response.data);
            if (response.data.message === "Success!") {
              toast.success("Category updated!", {
                duration: 3000,
              });
              setCat_TitleFlag(false);
              setCategotyDesFlag(false);
              setCatIdFlag(false);
              setCat_Title("");
              setCategotyDescription("");
              setCatid("");
              setCat2(false);
              setCat3(false);
              setCat4(false);
              history.push("/admin/manageCategory");
            } else if (response.data.message === "Category not inserted.") {
              toast.error(response.data.message, {
                duration: 3000,
              });
            } else if (response.data.message === "Category already exists.") {
              toast.error(response.data.message, {
                duration: 3000,
              });
              console.log("hello");
            } else if (response.data.message === "User not admin.") {
              toast.error(response.data.message, {
                duration: 3000,
              });
            } else {
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
      <section className="home">
        <Header name="Update Category" path="admin / updateCategory" />
        <ThemeProvider theme={theme}>
          <div className="add-suplier">
            {visible1 && (
              <div className="add-suplier-sub1">
                Category:
                <div className="box">
                  <p>Enter Category type:</p>
                  <TextField
                    label="type"
                    size="small"
                    value={cattype}
                    fullWidth={width}
                    onChange={(e) => setCat_type(e.target.value)}
                  />
                  {cat1 && <p className="error-color">{cat_typeerror}</p>}
                </div>
                <div className="box">
                  <p>Status:</p>

                  <Switch
                    // defaultChecked
                    checked={cat_status}
                    onChange={(e) => setCat_status(e.target.checked)}
                  />
                </div>
                <div className="suplier-button">
                  <button className="button-311" onClick={handleCategoryType}>
                    Update Category
                  </button>
                </div>
              </div>
            )}

            {visible2 && (
              <div className="add-suplier-sub1">
                Sub-Category:
                <div className="box">
                  <p>Select Category:</p>

                  <Select
                    showSearch
                    style={{ width: 332 }}
                    placeholder="Search to Select"
                    value={catid}
                    onChange={(value) => setCatid(value)}
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
                    options={cat_data}
                  />
                  {cat2 && <p className="error-color">{catiderror}</p>}
                </div>
                <div className="box">
                  <p>Category Title</p>
                  <TextField
                    label="title"
                    size="small"
                    value={cat_title}
                    fullWidth={width}
                    onChange={(e) => setCat_Title(e.target.value)}
                  />
                  {cat3 && <p className="error-color">{cat_titleError}</p>}
                </div>
                <div className="box">
                  <p>Categoty Description</p>
                  <TextField
                    label="description"
                    size="small"
                    value={category_description}
                    fullWidth={width}
                    onChange={(e) => setCategotyDescription(e.target.value)}
                  />
                  {cat4 && <p className="error-color">{category_desError}</p>}
                </div>
                <div className="box">
                  <p>Category Status</p>

                  <Switch                    
                    checked={subcatstatus}
                    onChange={(e) => setSubCatStatus(e.target.checked)}
                  />
                </div>
                <div className="suplier-button">
                  <button
                    // variant="contained"
                    className="button-311"
                    onClick={handleCategory}
                    // endIcon={<SendIcon />}
                    // fullWidth={width}
                  >
                    Update sub-Category
                  </button>
                </div>
              </div>
            )}
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
    </>
  );
}

export default UpdateCategory;
