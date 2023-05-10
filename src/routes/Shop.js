import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import Footer from "../routes/Footer";
import FeaturedProduct from "../components/FeaturedProduct";
import "../Style/shop.css";
import Navbar from "../components/navbar/Navbar";
import { ShopOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { isEmpty } from "lodash";
import { ConfigProvider } from "antd";
import { Slider } from "antd";
import AllProduct from "../data/AllProduct";
import NavData from "../data/NavData";

function Shop() {
  let { id } = useParams();
  let { cat, subcat } = useParams();
  let { kid, kidcat, kidsubcat } = useParams();
  const location = useLocation();

  const [priceDisplay, setPrice] = useState(4000);
  const [maxPrice, setMaxPrice] = useState();
  const [minPrice, setMinPrice] = useState();
  const [searchTerm, setsearchTerm] = useState("");
  const [data, setData] = useState(AllProduct);
  const [product_data, setProductData] = useState(data);
  const [navClose, setNavClose] = useState(false);

  const [value, setValue] = useState([]);

  useEffect(() => {
    // All

    if (id === "all" && !isEmpty(data)) {
      setProductData(data);
      setMinPrice(Math.min(...data.map((data) => data.prod_price)));
      setMaxPrice(Math.max(...data.map((data) => data.prod_price)));
      setPrice(maxPrice);
      setValue([
        Math.min(...data.map((data) => data.prod_price)),
        Math.max(...data.map((data) => data.prod_price)),
      ]);
    }

    NavData.forEach((element) => {
      if (id === element.cat_type) {
        const updatedItem = data.filter((curEle) => {
          //  console.log(curEle.cat_type === catItem);
          return curEle.cat_type === element.cat_type;
        });
        //  console.log(updatedItem);
        setProductData(updatedItem);
        setMinPrice(Math.min(...updatedItem.map((data) => data.prod_price)));
        setMaxPrice(Math.max(...updatedItem.map((data) => data.prod_price)));
        setValue([
          Math.min(...updatedItem.map((data) => data.prod_price)),
          Math.max(...updatedItem.map((data) => data.prod_price)),
        ]);
        setPrice(maxPrice);
      }

      element.Category.forEach((element1) => {
        // console.log(element1)
        if (cat === element.cat_type && subcat === element1.cat_title) {
          const updatedItem = data.filter((curEle) => {
            //  console.log(curEle.cat_type === catItem);
            return (
              curEle.cat_type === element.cat_type &&
              curEle.cat_title === element1.cat_title
            );
          });
          //  console.log(updatedItem);
          setProductData(updatedItem);
          setMinPrice(Math.min(...updatedItem.map((data) => data.prod_price)));
          setMaxPrice(Math.max(...updatedItem.map((data) => data.prod_price)));
          setValue([
            Math.min(...updatedItem.map((data) => data.prod_price)),
            Math.max(...updatedItem.map((data) => data.prod_price)),
          ]);
          setPrice(maxPrice);
        }
      });
    });
  }, [data, id, cat, subcat, kid, kidcat, kidsubcat]);

  const searchProductHandler = (e) => {
    setsearchTerm(e.target.value);
  };

  let string_with_slashes = location.pathname.substring(1);
  let array_of_elements = string_with_slashes.split("/");
  // console.log(array_of_elements);

  const onChange = (value) => {
    console.log("onChange: ", value);
    console.log(value["0"], value["1"]);
    setValue(value);
  };
  const onAfterChange = (value) => {
    console.log("onAfterChange: ", value);
  };
  return (
    <>
      <Navbar closeNav={navClose} />
      <div onClick={() => setNavClose(!navClose)}>
        <div className="extra-space-home"></div>

        <div className="filters">
          <div className="filter-product">
            <h3>Price</h3>
            <div className="price-range">
              <p>{minPrice}</p>
              <p>{maxPrice}</p>
            </div>
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
              }}
            >
              <Slider
                range
                min={minPrice}
                max={maxPrice}
                step={10}
                style={{ width: "310px" }}
                value={value}
                onChange={onChange}
                onAfterChange={onAfterChange}
              />
            </ConfigProvider>
            <br />
            <p>
              Range: [ {value["0"]} - {value["1"]} ]
            </p>
          </div>

          <div className="search-product">
            <input
              type="text"
              className="search-field"
              placeholder="Search product"
              value={searchTerm}
              onChange={searchProductHandler}
            />
          </div>
        </div>

        {
          <div className="url-path">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to={`/${array_of_elements[0]}`}>
                  <ShopOutlined /> Shop
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={`/${array_of_elements[0]}/${array_of_elements[1]}`}>
                  {array_of_elements[1]}
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{array_of_elements[2]}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        }

        <FeaturedProduct
          items={product_data.filter((val) => {
            return (
              val.prod_price <= value["1"] &&
              val.prod_price >= value["0"] &&
              (val.prod_name
                .toLowerCase()
                .includes(searchTerm.toLocaleLowerCase()) ||
                val.prod_desc
                  .toLowerCase()
                  .includes(searchTerm.toLocaleLowerCase()) ||
                val.cat_title
                  .toLowerCase()
                  .includes(searchTerm.toLocaleLowerCase()) ||
                val.cat_type
                  .toLowerCase()
                  .includes(searchTerm.toLocaleLowerCase()))
            );
          })}
        />

        <Footer />
      </div>
    </>
  );
}

export default Shop;
