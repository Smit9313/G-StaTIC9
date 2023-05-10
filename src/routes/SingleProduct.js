import React, { useState, useEffect } from "react";
import "../Style/singleproduct.css";
<<<<<<< HEAD
=======
import { useHistory } from "react-router-dom";
>>>>>>> 25cb49b506aed4524c82972a4f8de467b90a6f25
import { Link, useParams } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "../components/navbar/Navbar";
import axios from "axios";
import { FrownOutlined } from "@ant-design/icons";
import {
  Result,
  Button,
  ConfigProvider,
  Radio,
  Rate,
<<<<<<< HEAD
=======
  Badge,
>>>>>>> 25cb49b506aed4524c82972a4f8de467b90a6f25
  Breadcrumb,
} from "antd";
import { Toaster, toast } from "react-hot-toast";
import { isEmpty } from "lodash";
<<<<<<< HEAD
import RelatedProduct from "../components/RelatedProduct";
import { ShopOutlined } from "@ant-design/icons";
=======
import jwtDecode from "jwt-decode";
import RelatedProduct from "../components/RelatedProduct";
import { ShopOutlined } from "@ant-design/icons";
import ClipLoader from "react-spinners/ClipLoader";
>>>>>>> 25cb49b506aed4524c82972a4f8de467b90a6f25
import "lightbox.js-react/dist/index.css";
import { SlideshowLightbox } from "lightbox.js-react";
import AllProduct from "../data/AllProduct";

function SingleProduct() {
  const [url, setUrl] = useState("cloths/1.jpg");
  let { product_id } = useParams();
<<<<<<< HEAD

=======
  const history = useHistory();
  const token = localStorage.getItem("token");
>>>>>>> 25cb49b506aed4524c82972a4f8de467b90a6f25

  const [data, setData] = useState("");
  const [prod_qty, setProd_qty] = useState(1);
  const [prod_size, setProd_size] = useState();
  const [selectSize, setSelectSize] = useState(false);
  const [navrender, setNavRender] = useState(true);
  const [relatedProduct, setrelatedProduct] = useState("");
  const [navClose, setNavClose] = useState(false);

  useEffect(() => {

    const RelatedProduct = [];

    for (let i = 0; i < AllProduct.length; i++) {
      if (AllProduct[i]._id === product_id) {
        setData(AllProduct[i]);
        setUrl(AllProduct[i].prod_image[0]);
        console.log(AllProduct[i]);

        for (let j = 0; j < AllProduct.length; j++) {
          if (AllProduct[i].cat_id === AllProduct[j].cat_id) {
            if (RelatedProduct.length < 5) {
              RelatedProduct.push(AllProduct[j]);
            }
          }
        }
      }
    }
    setrelatedProduct(RelatedProduct);
  }, [product_id]);


  const handleQty = (event) => {
    const value = event.target.value;
    const valueInt = parseInt(value);

    if (value !== "" && valueInt > 0 && valueInt < 100) {
      setProd_qty(valueInt);
    }
  };

  const handleAddToCart = () => {
    console.log(prod_size);
    if (product_id !== "" && prod_qty !== "" && prod_size !== undefined) {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      try {
        axios
          .post(
            `${process.env.REACT_APP_API_HOST}/cart/`,
            {
              prod_id: product_id,
              prod_qty: {
                [prod_size]: prod_qty,
              },
            },
            { headers }
          )
          .then((response) => {
            console.log(response.data.message);

            if (response.data.message === "Success!") {
              toast.success("Product added!", {
                duration: 3000,
              });
              setNavRender(!navrender);
            } else if (response.data.message === "Token corrupted.") {
              toast.error("Please login first to use cart!", {
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
      } catch (err) {}
    } else {
      setSelectSize(true);
    }
  };

  return (
    <>
      <Navbar navrender={navrender} closeNav={navClose} />
      <div onClick={() => setNavClose(!navClose)}>
            {!isEmpty(data) ? (
              <>
                <div id="prodetails" className="section-p1">
                  <div className="single-pro-image">
                    <img
                      src={url}
                      width="100%"
                      id="MainImg"
                      alt=""
                      className="animate__animated animate__zoomIn w-full rounded"
                    />

                    <div className="small-img-group">
                      <SlideshowLightbox
                        theme="lightbox"
                        className="small-img-group"
                      >
                        <img
                          src={data.prod_image[0]}
                          width="100%"
                          className="small-img animate__animated animate__zoomIn w-full rounded"
                          alt=""
                          onClick={() => setUrl(data.prod_image[0])}
                        />
                        <img
                          src={data.prod_image[1]}
                          className="small-img animate__animated animate__zoomIn w-full rounded"
                          alt=""
                          onClick={() => setUrl(data.prod_image[1])}
                        />
                        <img
                          src={data.prod_image[2]}
                          width="100%"
                          className="small-img animate__animated animate__zoomIn"
                          alt=""
                          onClick={() => setUrl(data.prod_image[2])}
                        />
                      </SlideshowLightbox>
                    </div>
                  </div>

                  <div className="single-pro-details">
                    <Breadcrumb>
                      <Breadcrumb.Item>
                        <Link to={`/shop`}>
                          <ShopOutlined /> Shop
                        </Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>
                        <Link to={`/shop/${data.cat_type}`}>
                          {data.cat_type}
                        </Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>
                        <Link to={`/shop/${data.cat_type}/${data.cat_title}`}>
                          {data.cat_title}
                        </Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>{data.prod_name}</Breadcrumb.Item>
                    </Breadcrumb>
                    <br />
                    <h1>{data.prod_name}</h1>
                    <Rate
                      disabled
                      defaultValue={data.rating}
                      value={data.rating}
                    />
                    <p>({data.user_count})</p>
                    <h2>{data.prod_price} ₹</h2>
                    <div className="size-container">
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
                          buttonStyle="solid"
                          onChange={(value) => {
                            setProd_size(value.target.value);
                            if (value.target.value === "") {
                              setSelectSize(true);
                            } else {
                              setSelectSize(false);
                            }
                          }}
                        >
                          {!isEmpty(data.prod_qty) &&
                            Object.keys(data.prod_qty).map((qty, index) => {
                              return (
                                <>
                                  <Radio.Button key={index} value={qty}>
                                    {qty}
                                  </Radio.Button>
                                </>
                              );
                            })}
                        </Radio.Group>
                      </ConfigProvider>
                      {selectSize && !isEmpty(data.prod_qty) && (
                        <p className="out-stock">Please select a size</p>
                      )}
                    </div>
                    <input
                      type="number"
                      className="quantity"
                      min={1}
                      max={10}
                      step="1"
                      value={prod_qty}
                      onChange={(event) => handleQty(event)}
                    />

                    <button
                      type="submit"
                      className="normal"
                      onClick={handleAddToCart}
                    >
                      Add to cart
                    </button>

                    <h4>Product details</h4>
                    <span>{data.prod_desc}</span>
                    <br />
                    <br />
                    <br />
                    <span style={{ fontSize: "12px" }}>
                      No Return, No Refund Policy *
                    </span>
                  </div>
                </div>

                {!isEmpty(relatedProduct) && (
                  <div id="prodetails-suggestion">
                    <center>
                      <h2>YOU MAY ALSO LIKE</h2>
                    </center>
                    <RelatedProduct items={relatedProduct} />
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="not-found">
                  <ConfigProvider
                    theme={{
                      components: {
                        Button: {
                          colorPrimary: "#000",
                          colorPrimaryHover: "#000",
                          colorPrimaryClick: "#000",
                          colorPrimaryActive: "#000",
                        },
                        Icon: {
                          colorPrimary: "#000",
                        },
                      },
                    }}
                  >
                    <Result
                      icon={<FrownOutlined style={{ color: "#000" }} />}
                      title="No products found!"
                      extra={
                        <Button
                          type="primary"
                          onClick={() => window.location.reload(true)}
                        >
                          Refresh
                        </Button>
                      }
                    />
                  </ConfigProvider>
                </div>
              </>
            )}
          

        <Footer />
      </div>

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

export default SingleProduct;
