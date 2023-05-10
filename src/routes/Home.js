import React, { useState, useEffect } from "react";
import Footer from "./Footer.js";
import { Link } from "react-router-dom";
import "../Style/home.css";
import Banner1 from "../components/Banner1.js";
import Navbar from "../components/navbar/Navbar";
import Slider from "react-slick";
import HomeImages from "../data/HomeImages";
import HomeProduct from "../data/HomePageProduct.js";

import RelatedProduct from "../components/RelatedProduct.js";
import { isEmpty } from "lodash";

function Home() {
  const [navClose, setNavClose] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <>
      <Navbar closeNav={navClose} />
      <div onClick={() => setNavClose(!navClose)}>
        <div className="slider">
          <Slider {...settings}>
            {HomeImages.map((item, index) => {
              return (
                <div key={index} className="set-image">
                  <img src={item.url} alt="img-home" />
                </div>
              );
            })}
          </Slider>
        </div>

        {!isEmpty(HomeProduct) &&
          HomeProduct.map((element, index) => {
            console.log(element);
            return (
              <>
                <div
                  id="prodetails-suggestion"
                  style={{ marginBottom: "20px!impotant" }}
                  key={index}
                >
                  <center>
                    <h2>{element.cat_type}</h2>
                  </center>

                  <RelatedProduct items={element.Product} />
                  <Link
                    to={`/shop/${element.cat_type}`}
                    style={{
                      textDecoration: "none",
                      fontSize: "15px",
                      color: "black",
                    }}
                  >
                    <center>
                      <button className="normal">view more..</button>
                    </center>
                  </Link>
                </div>
                <br />
                <hr />
              </>
            );
          })}

        <Banner1 />

        <Footer />
      </div>
    </>
  );
}

export default Home;
