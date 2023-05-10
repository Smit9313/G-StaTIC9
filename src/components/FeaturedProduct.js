import React,{ useState } from 'react';
import { useHistory } from "react-router-dom";
import '../Style/featuredproduct.css';
import { FrownOutlined } from "@ant-design/icons";
import { Result } from "antd";
import {Button} from 'antd';
// import ProductData from '../data/ProductData';
import { Link } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import ScrollToTop from './ScrollToTop';
import { Rate, ConfigProvider } from "antd";
import "./custom.less";
import { isEmpty } from 'lodash';

function FeaturedProduct({items,title,des}) {

    // const [searchTerm, setsearchTerm] = useState("");
    // const [productItems, setProductItems] = useState(items);
    const [pageNumber, setPageNumber] = useState(0);
    const history = useHistory();
    

    const usersPerPage = 20;
    const pagesVisited = pageNumber * usersPerPage;

    // console.log(items);

    const displayUsers = items
      .slice(pagesVisited, pagesVisited + usersPerPage)
      .map((item,index) => {
        return (
          <div className="pro animate__animated animate__zoomIn" key={index}>
            <Link to={`/single-product/${item._id}`}>
              <img
                src={item.prod_image[1]}
                alt=""
                style={{ display: "none" }}
              />
              <img
                src={item.prod_image[0]}
                alt=""
                onMouseLeave={(e) => (e.currentTarget.src = item.prod_image[0])}
                onMouseOver={(e) => (e.currentTarget.src = item.prod_image[1])}
              />
            </Link>
            <div
              className="des"
              style={{cursor:"pointer"}}
              onClick={() => history.push(`/single-product/${item._id}`)}>
              <h5>{item.prod_name}</h5>
              <span className="des-text">{item.prod_desc}</span>
              <div className="star">
                <Rate
                  disabled
                  defaultValue={parseInt(item.rating)}
                  value={parseInt(item.rating)}
                />
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

    const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
    }
    
      const pageCount = Math.ceil(items.length / usersPerPage);

      const changePage = ({ selected }) => {
        setPageNumber(selected);
      };

    


  return (
    <>
      {/* <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
        onClick={scrollToTop}
      /> */}
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
          <h2>{title}</h2>
          <p>{des}</p>
          <div className="pro-container">{displayUsers}</div>
        </section>
      )}

      <ScrollToTop />

      {!isEmpty(items) && (
        <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
          onClick={scrollToTop}
        />
      )}

      {/* <div>
        <section id="product1" className="section-p1" >
          <h2>{title}</h2>
          <p>{des}</p>
          <div className="pro-container">
            {items
              // .filter((val) => {
              //   return val.des
              //     .toLowerCase()
              //     .includes(searchTerm.toLocaleLowerCase());
              // })
              .map((item, index) => {
                return (
                  
                  <div className="pro" key={index}>
                    <Link to="/single-product">
                      <img src={item.url} alt="" />
                    </Link>
                    {/* <img src='../assets/products/rock-staar-2XcbGfYShfk-unsplash.jpg' alt='jksjk'/> */}
      {/* </div> 
                    <div className="des">
                      <span>{item.title}</span>
                      <h5>{item.des}</h5>
                      <div className="star">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </div>
                      <h4>{item.price}</h4>
                    </div>
                    <Link to="/cart-products">
                      <img
                        className="cart"
                        src="logo/shopping-cart.png"
                        alt=""
                      />
                    </Link>
                  </div>
                );
              })}
          </div>
        </section>
      </div> */}
    </>
  );
}

export default FeaturedProduct