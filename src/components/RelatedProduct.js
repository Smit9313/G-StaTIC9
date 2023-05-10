import React from "react";
import { useHistory } from "react-router-dom";
import "../Style/featuredproduct.css";
import { FrownOutlined } from "@ant-design/icons";
import { Result } from "antd";
import { Button } from "antd";
import { Link } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import { Rate, ConfigProvider } from "antd";
import "./custom.less";
import { isEmpty } from "lodash";

function RelatedProduct({ items }) {
  console.log(items);
  const history = useHistory();

  const displayUsers = items.map((item, index) => {
    return (
      <div className="pro animate__animated animate__zoomIn" key={index}>
        <Link to={`/single-product/${item._id}`}>
          <img src={item.prod_image[1]} alt="" style={{ display: "none" }} />
          <img
            src={item.prod_image[0]}
            alt=""
            onMouseLeave={(e) => (e.currentTarget.src = item.prod_image[0])}
            onMouseOver={(e) => (e.currentTarget.src = item.prod_image[1])}
          />
        </Link>
        <div
          className="des"
          style={{ cursor: "pointer" }}
          onClick={() => history.push(`/single-product/${item._id}`)}>
          <h5>{item.prod_name}</h5>
          <span className="des-text">{item.prod_desc}</span>
          <div className="star" style={{ fontSize: "18px" }}>
            <Rate disabled defaultValue={item.rating} value={item.rating} />
            <p
              className="pb1"
              style={{ marginLeft: "15px", paddingTop: "4px" }}>
              (
            </p>
            <p className="pdown1" style={{ paddingTop: "5px" }}>
              {item.user_count}
            </p>
            <p className="pb1" style={{ paddingTop: "4px" }}>
              )
            </p>
          </div>
          <h4>{item.prod_price} ₹</h4>
        </div>
      </div>
    );
  });


  return (
    <>
      {console.log(items)}
      {isEmpty(items) ? (
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
            }}>
            <Result
              icon={<FrownOutlined style={{ color: "#000" }} />}
              title="No products found!"
              extra={
                <Button
                  type="primary"
                  onClick={() => window.location.reload(true)}>
                  Refresh
                </Button>
              }
            />
          </ConfigProvider>
        </div>
      ) : (
        <section id="product1" className="section-p1">
          {/* <h2>{title}</h2>
          <p>{des}</p> */}
          <div className="pro-container">{displayUsers}</div>
        </section>
      )}

      <ScrollToTop />
    </>
  );
}

export default RelatedProduct;
