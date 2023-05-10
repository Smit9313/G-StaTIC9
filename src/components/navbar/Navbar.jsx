import React, { useState, useEffect } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import "./NavbarStyle.css";
import { ConfigProvider, Badge } from "antd";
import {
  LogoutOutlined,
  UserOutlined,
  FormOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { isEmpty } from "lodash";
import navData from "../../data/NavData";
import userData from "../../data/UserData";

function Navbar({ navrender, closeNav }) {
  const history = useHistory();
  const [icon, setIcon] = useState(false);
  const [arrow, setArrow] = useState(true);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setIcon(false)
  }, [closeNav])
  

  const items = [
    {
      label: "Profile",
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: "My Order",
      key: "2",
      icon: <ShopOutlined />,
    },
    {
      label: "Change Password",
      key: "3",
      icon: <FormOutlined />,
    },
    {
      label: "Logout",
      key: "4",
      icon: <LogoutOutlined />,
    },
  ];

  const handleMenuClick = (e) => {
    if (e.key === "1") {
      history.push("/profile");
    }
    if (e.key === "2") {
      history.push("/my-order");
    }
    if (e.key === "3") {
      history.push("/change-password");
    }
    if (e.key === "4") {
      localStorage.removeItem("token");
      history.push("/home");
      window.location.reload(true);
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const handleClick = () => {
    setIcon(!icon);
  };

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleArrow = () => {
    setArrow(!arrow);
  };

  return (
    <>
      <nav className="NavBarItems">
        <Link to="/home">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/clothing-store-2.appspot.com/o/site_images%2Fgurukrupa.png?alt=media&token=f6246337-bbac-46a9-b2bf-1abaac2de541"
            alt=""
            height="40px"
            width="130px"
          />
        </Link>
        <ul className={icon ? "nav-menu active-mb" : "nav-menu"}>
          <li>
            <NavLink
              to="/home"
              className="nav-links"
              activeClassName="active-link"
              onClick={handleClick}
            >
              HOME
            </NavLink>
          </li>
          <li onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <NavLink
              to="/shop/all"
              className="nav-links sun-nav"
              activeClassName="active-link"
              onClick={handleClick}
            >
              SHOP
            </NavLink>
            <i
              className={arrow ? "fas fa-angle-right" : "fas fa-angle-down"}
              onClick={handleArrow}
            ></i>
          </li>
          {!arrow && (
            <div
              className="mb-category"
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <div className="mb-category-1">
                {navData.map((val, index) => {
                  return (
                    <div className="mb-category-2" key={index}>
                      <div className="cat-man">
                        <NavLink
                          to={`/shop/${val.cat_type}`}
                          onClick={handleClick}
                        >
                          <h4>{val.cat_type}</h4>
                        </NavLink>
                      </div>
                      <hr />

                      {val.Category.map((val1, index1) => {
                        return (
                          <div className="man-cat-items" key={index1}>
                            <NavLink
                              to={`/shop/${val.cat_type}/${val1.cat_title}`}
                              onClick={handleClick}
                            >
                              {val1.cat_title}
                            </NavLink>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <li>
            <NavLink
              to="/contact"
              className="nav-links"
              activeClassName="active-link"
              onClick={handleClick}
            >
              CONTACT
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/register"
              className="nav-links"
              activeClassName="active-link"
              onClick={handleClick}
            >
              SIGN-UP
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className="nav-links"
              activeClassName="active-link"
              onClick={handleClick}
            >
              LOGIN
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin"
              className="nav-links"
              activeClassName="active-link"
            >
              DASHBOARD
            </NavLink>
          </li>
        </ul>

        <div className="icon-flex">
          {!isEmpty(userData) && (
            <>
              <div className="profile-icon-style">
                <ConfigProvider
                  theme={{
                    components: {
                      UserOutlined: {
                        colorPrimary: "#000",
                        colorPrimaryHover: "#000",
                        colorPrimaryBorder: "#000",
                        colorPrimaryBorderHover: "#000",
                        colorPrimaryText: "#000",
                      },
                    },
                  }}
                >
                  <Dropdown menu={menuProps}>
                    <Space
                      style={{
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: "17px",
                      }}
                    >
                      {userData.name}
                      <UserOutlined
                        style={{ fontSize: "25px", color: "black" }}
                      />
                    </Space>
                  </Dropdown>
                </ConfigProvider>
              </div>
            </>
          )}

          <Link to="/cart-products">
            <div className="cat-icon-style">
              <ConfigProvider
                theme={{
                  colorPrimary: "#000",
                  colorPrimaryHover: "#000",
                  colorErrorText: "#000",
                  colorError: "#000",
                }}
              >
                <Badge
                  count={5}
                  showZero
                  className="cart-img"
                  style={{
                    backgroundColor: "#000",
                  }}
                >
                  <img
                    src="/logo/shopping-cart.png"
                    alt=""
                    className="cart-img"
                    height="35px"
                    width="35px"
                  />
                </Badge>
              </ConfigProvider>
            </div>
          </Link>
        </div>

        <div className="menu-icons">
          <div className="profile-icon-style">
            <ConfigProvider
              theme={{
                components: {
                  UserOutlined: {
                    colorPrimary: "#000",
                    colorPrimaryHover: "#000",
                    colorPrimaryBorder: "#000",
                    colorPrimaryBorderHover: "#000",
                    colorPrimaryText: "#000",
                  },
                },
              }}
            >
              <Dropdown menu={menuProps}>
                <Space>
                  <UserOutlined style={{ fontSize: "25px", color: "black" }} />
                </Space>
              </Dropdown>
            </ConfigProvider>
          </div>

          <Link to="/cart-products">
            <div className="cart-icon-mobile">
              <Badge
                count={5}
                showZero
                style={{
                  backgroundColor: "#000",
                }}
              >
                <img
                  src="/logo/shopping-cart.png"
                  alt=""
                  className="cart-mb"
                  height="40px"
                  width="40px"
                />
              </Badge>
            </div>
          </Link>

          <i
            className={icon ? "fas fa-times" : "fas fa-bars"}
            onClick={handleClick}
          ></i>
        </div>
      </nav>
      {isHovering && !isEmpty(navData) && (
        <div
          className="category-container animate__animated animate__fadeIn"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <div className="sub-category-container">
            {navData.map((val, index) => {
              return (
                <div className="category-1" key={index}>
                  <center>
                    <NavLink to={`/shop/${val.cat_type}`}>
                      <h3>{val.cat_type}</h3>
                    </NavLink>
                  </center>
                  <hr className="hr-style" />
                  {val.Category.map((val1, index1) => {
                    return (
                      <div key={index1} style={{ margin: "5px" }}>
                        <center>
                          <NavLink
                            to={`/shop/${val.cat_type}/${val1.cat_title}`}
                          >
                            {val1.cat_title}
                          </NavLink>

                          <br />
                        </center>
                        <hr />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
