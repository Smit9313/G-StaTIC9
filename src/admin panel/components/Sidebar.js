import React, { useState } from "react";
import { NavLink, useHistory} from "react-router-dom";
import "../Style/sidebar.css";

function Sidebar({ url }) {
  const history = useHistory();
  const [sidebar, setSidebar] = useState(true);
  const [supplier, setSupplier] = useState(true);
  const [purchase, setPurchase] = useState(true);
  const [category, setCategory] = useState(true);
  const [product, setProduct] = useState(true);
  const [order, setOrder] = useState(true);
  const [discount, setDiscount] = useState(true);
  const [report, setReport] = useState(true);
  const [lock, setLock] = useState(false);
  const [admin, setAdmin] = useState(true);
  // const [urlPath, setUrlPath] =useState(url);

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  function removeTrailingSlash(str) {
    return str.replace(/\/+$/, "");
  }

  const handleSuplier = () => {
    setPurchase(true);
    setCategory(true);
    setProduct(true);
    setOrder(true);
    setDiscount(true);
    setReport(true);
    setAdmin(true);
    setSupplier(!supplier);
  };

  const handlePurchase = () => {
    setSupplier(true);
    setCategory(true);
    setProduct(true);
    setOrder(true);
    setDiscount(true);
    setReport(true);
    setAdmin(true);
    setPurchase(!purchase);
  };

  const handleCategory = () => {
    setPurchase(true);
    setSupplier(true);
    setProduct(true);
    setOrder(true);
    setDiscount(true);
    setReport(true);
    setAdmin(true);
    setCategory(!category);
  };

  const handleProduct = () => {
    setPurchase(true);
    setSupplier(true);
    setCategory(true);
    setOrder(true);
    setDiscount(true);
    setReport(true);
    setAdmin(true);
    setProduct(!product);
  };

  const handleOrder = () => {
    setPurchase(true);
    setSupplier(true);
    setCategory(true);
    setProduct(true);
    setDiscount(true);
    setReport(true);
    setAdmin(true);
    setOrder(!order);
  };

  const handleDiscount = () => {
    setPurchase(true);
    setSupplier(true);
    setCategory(true);
    setProduct(true);
    setOrder(true);
    setReport(true);
    setAdmin(true);
    setDiscount(!discount);
  };

  const handleReport = () => {
    setPurchase(true);
    setSupplier(true);
    setCategory(true);
    setProduct(true);
    setOrder(true);
    setDiscount(true);
    setAdmin(true);
    setReport(!report);
  };

  const handleAdmin = () => {
    setPurchase(true);
    setSupplier(true);
    setCategory(true);
    setProduct(true);
    setOrder(true);
    setDiscount(true);
    setReport(true);
    setAdmin(!admin);
  };

  return (
    <>
      <nav
        className={
          lock ? "sidebar open" : sidebar ? "sidebar close" : "sidebar open"
        }>
        <header>
          <div className="image-text">
            <span className="image">
              {/* <!--<img src="logo.png" alt="">--> */}
            </span>

            <div className="text logo-text">
              {/* <span className="name">Codinglab</span>
                    <span className="profession">Web developer</span> */}
              {/* <img src="logo/gurukrupa.png" alt='sf' height="40px" width="100px" /> */}
              <img
                src="/logo/gurukrupa.png"
                alt=""
                height="40px"
                width="130px"
              />
              <i
                className={lock ? "bx bx-lock-alt lock-icon" : "bx bx-lock-alt"}
                onClick={() => setLock(!lock)}></i>
            </div>
          </div>

          <i className="bx bx-chevron-right toggle" onClick={handleSidebar}></i>
        </header>

        <div className="menu-bar">
          <div className="menu">
            {/* <li className="search-box">
              <i className="bx bx-search icon"></i>
              <input type="text" placeholder="Search..." />
            </li> */}
            {/* {console.log(url)} */}
            <ul className="menu-links">
              <li className="nav-link">
                <NavLink
                  to={`${removeTrailingSlash(url)}/dashboard`}
                  activeClassName="sidebar-active"
                  onClick={() => setSidebar(!sidebar)}>
                  <i className="bx bx-home-alt icon"></i>
                  <span className="text nav-text">Dashboard</span>
                </NavLink>
              </li>

              {/*
                  <i className="bx bx-user-pin icon"></i>
                  <span className="text nav-text">Admin</span>
                  </section>
                <i
                  className={
                    admin
                      ? "bx bx-right-arrow-alt icon"
                      : "bx bx-down-arrow-alt icon"
                  }></i>
              </li>
              {!admin && (
                <>
                 
                  <li
                    className="nav-link-sub"
                    onClick={() => setSidebar(!sidebar)}>
                    <NavLink
                      to={`/admin/addAdmin`}
                      activeClassName="sidebar-active">
                    
                      <span className="text nav-text">{"»"}Add Admin</span>
                      
                    </NavLink>
                  </li>
                  <hr />
                </>
              )} */}

              <li className="nav-link" onClick={handleSuplier}>
                <section>
                  {/* <i className="bx bx-bar-chart-alt-2 icon"></i> */}
                  <i className="bx bx-user-voice icon"></i>
                  <span className="text nav-text">Supplier</span>
                </section>
                <i
                  className={
                    supplier
                      ? "bx bx-right-arrow-alt icon"
                      : "bx bx-down-arrow-alt icon"
                  }></i>
              </li>
              {!supplier && (
                <>
                  <hr />
                  <li
                    className="nav-link-sub"
                    onClick={() => setSidebar(!sidebar)}>
                    <NavLink
                      to={`/admin/manageSupplier`}
                      activeClassName="sidebar-active">
                      {/* <i className="bx bx-bell icon"></i> */}
                      <span className="text nav-text">
                        {"»"} Manage Supplier
                      </span>
                      {/* <hr /> */}
                    </NavLink>
                  </li>
                  <hr />
                  <li
                    className="nav-link-sub"
                    onClick={() => setSidebar(!sidebar)}>
                    <NavLink
                      to={`/admin/addSupplier`}
                      activeClassName="sidebar-active">
                      {/* <i className="bx bx-bell icon"></i> */}
                      <span className="text nav-text">{"»"} Add Supplier</span>
                      {/* <hr /> */}
                    </NavLink>
                  </li>
                  <hr />
                </>
              )}

              <li className="nav-link" onClick={handlePurchase}>
                <section>
                  {/* <i className="bx bx-bell icon"></i> */}
                  {/* <i className="bx bxs-purchase-tag-alt icon"></i> */}
                  <i className="bx bx-purchase-tag-alt icon"></i>
                  <span className="text nav-text">Purchase</span>
                </section>
                <i
                  className={
                    purchase
                      ? "bx bx-right-arrow-alt icon"
                      : "bx bx-down-arrow-alt icon"
                  }></i>
              </li>

              {!purchase && (
                <>
                  <li
                    className="nav-link-sub"
                    onClick={() => setSidebar(!sidebar)}>
                    <NavLink
                      to={`/admin/managePurchase`}
                      activeClassName="sidebar-active">
                      <span className="text nav-text">
                        {"»"} Manage Purchase
                      </span>
                      {/* <hr /> */}
                    </NavLink>
                  </li>
                  <hr />
                  <li
                    className="nav-link-sub"
                    onClick={() => setSidebar(!sidebar)}>
                    <NavLink
                      to={`/admin/addPurchase`}
                      activeClassName="sidebar-active">
                      {/* <i className="bx bx-bell icon"></i> */}
                      <span className="text nav-text">{"»"} Add Purchase</span>
                      {/* <hr /> */}
                    </NavLink>
                  </li>
                  <hr />
                </>
              )}

              <li className="nav-link" onClick={handleCategory}>
                <section>
                  <i className="bx bx-pie-chart-alt icon"></i>
                  <span className="text nav-text">Category</span>
                </section>
                <i
                  className={
                    category
                      ? "bx bx-right-arrow-alt icon"
                      : "bx bx-down-arrow-alt icon"
                  }></i>
              </li>

              {!category && (
                <>
                  <li
                    className="nav-link-sub"
                    onClick={() => setSidebar(!sidebar)}>
                    <NavLink
                      to={`/admin/manageCategory`}
                      activeClassName="sidebar-active">
                      {/* <i className="bx bx-bell icon"></i> */}
                      <span className="text nav-text">
                        {"»"} Manage Category
                      </span>
                      {/* <hr /> */}
                    </NavLink>
                  </li>
                  <hr />
                  <li
                    className="nav-link-sub"
                    onClick={() => setSidebar(!sidebar)}>
                    <NavLink
                      to={`/admin/addCategory`}
                      activeClassName="sidebar-active">
                      {/* <i className="bx bx-bell icon"></i> */}
                      <span className="text nav-text">{"»"} Add Category</span>
                      {/* <hr /> */}
                    </NavLink>
                  </li>
                  <hr />
                </>
              )}

              <li className="nav-link" onClick={handleProduct}>
                <section>
                  {/* <i className="bx bx-heart icon"></i> */}
                  {/* <i className="bx bxl-product-hunt icon"></i> */}
                  <i className="bx bx-package icon"></i>
                  <span className="text nav-text">Product</span>
                </section>
                <i
                  className={
                    product
                      ? "bx bx-right-arrow-alt icon"
                      : "bx bx-down-arrow-alt icon"
                  }></i>
              </li>

              {!product && (
                <>
                  <li
                    className="nav-link-sub"
                    onClick={() => setSidebar(!sidebar)}>
                    <NavLink
                      to={`/admin/manageProduct`}
                      activeClassName="sidebar-active">
                      {/* <i className="bx bx-bell icon"></i> */}
                      <span className="text nav-text">
                        {"»"} Manage Product
                      </span>
                      {/* <hr /> */}
                    </NavLink>
                  </li>
                  <hr />
                  <li
                    className="nav-link-sub"
                    onClick={() => setSidebar(!sidebar)}>
                    <NavLink
                      to={`/admin/addProduct`}
                      activeClassName="sidebar-active">
                      {/* <i className="bx bx-bell icon"></i> */}
                      <span className="text nav-text">{"»"} Add Product</span>
                      {/* <hr /> */}
                    </NavLink>
                  </li>
                  <hr />
                </>
              )}

              <li className="nav-link" onClick={handleOrder}>
                <section>
                  <i className="bx bx-wallet icon"></i>
                  <span className="text nav-text">Order</span>
                </section>
                <i
                  className={
                    order
                      ? "bx bx-right-arrow-alt icon"
                      : "bx bx-down-arrow-alt icon"
                  }></i>
              </li>

              {!order && (
                <>
                  <li
                    className="nav-link-sub"
                    onClick={() => setSidebar(!sidebar)}>
                    <NavLink
                      to={`/admin/allOrder`}
                      activeClassName="sidebar-active">
                      {/* <i className="bx bx-bell icon"></i> */}
                      <span className="text nav-text">{"»"} All Order</span>
                      {/* <hr /> */}
                    </NavLink>
                  </li>
                  <hr />
                  <li
                    className="nav-link-sub"
                    onClick={() => setSidebar(!sidebar)}>
                    <NavLink
                      to={`/admin/pendingOrder`}
                      activeClassName="sidebar-active">
                      {/* <i className="bx bx-bell icon"></i> */}
                      <span className="text nav-text">{"»"} Pending Order</span>
                      {/* <hr /> */}
                    </NavLink>
                  </li>
                  <hr />
                  <li
                    className="nav-link-sub"
                    onClick={() => setSidebar(!sidebar)}>
                    <NavLink
                      to={`/admin/deliveredOrder`}
                      activeClassName="sidebar-active">
                      {/* <i className="bx bx-bell icon"></i> */}
                      <span className="text nav-text">
                        {"»"} Delivered Product
                      </span>
                      {/* <hr /> */}
                    </NavLink>
                  </li>
                  <hr />
                  {/* <li
                    className="nav-link-sub"
                    onClick={() => setSidebar(!sidebar)}>
                    <NavLink to="/" activeClassName="sidebar-active">
                      <span className="text nav-text-sub">
                        {"»"}Returned Product
                      </span>

                    </NavLink>
                  </li> */}
                  <hr />
                </>
              )}

              <li className="nav-link" onClick={handleDiscount}>
                <section>
                  {/* <i className="bx bx-bar-chart-alt-2 icon"></i> */}
                  {/* <i className="bx bxs-discount icon"></i> */}
                  <i className="bx bx-gift icon"></i>
                  <span className="text nav-text">Discount</span>
                </section>
                <i
                  className={
                    discount
                      ? "bx bx-right-arrow-alt icon"
                      : "bx bx-down-arrow-alt icon"
                  }></i>
              </li>

              {!discount && (
                <>
                  <li
                    className="nav-link-sub"
                    onClick={() => setSidebar(!sidebar)}>
                    <NavLink
                      to={`/admin/manageDiscount`}
                      activeClassName="sidebar-active">
                      {/* <i className="bx bx-bell icon"></i> */}
                      <span className="text nav-text">
                        {"»"} Manage Discount
                      </span>
                      {/* <hr /> */}
                    </NavLink>
                  </li>
                  <hr />
                  <li
                    className="nav-link-sub"
                    onClick={() => setSidebar(!sidebar)}>
                    <NavLink
                      to={`/admin/addDiscount`}
                      activeClassName="sidebar-active">
                      {/* <i className="bx bx-bell icon"></i> */}
                      <span className="text nav-text">{"»"} Add Discount</span>
                      {/* <hr /> */}
                    </NavLink>
                  </li>
                  <hr />
                </>
              )}

              <li className="nav-link" onClick={handleReport}>
                <section>
                  <i className="bx bx-copy-alt icon"></i>
                  <span className="text nav-text">Reports</span>
                </section>
                <i
                  className={
                    report
                      ? "bx bx-right-arrow-alt icon"
                      : "bx bx-down-arrow-alt icon"
                  }></i>
              </li>

              {!report && (
                <>
                  <li
                    className="nav-link-sub"
                    onClick={() => setSidebar(!sidebar)}>
                    <NavLink
                      to={`/admin/supplierReport`}
                      activeClassName="sidebar-active">
                      <span className="text nav-text">
                        {"»"} Supplier Report
                      </span>
                    </NavLink>
                  </li>

                  <hr />

                  <li
                    className="nav-link-sub"
                    onClick={() => setSidebar(!sidebar)}>
                    <NavLink
                      to={`/admin/salesReport`}
                      activeClassName="sidebar-active">
                      <span className="text nav-text">{"»"} Sales Report</span>
                    </NavLink>
                  </li>

                  <hr />

                  <li
                    className="nav-link-sub"
                    onClick={() => setSidebar(!sidebar)}>
                    <NavLink
                      to={`/admin/stockReport`}
                      activeClassName="sidebar-active">
                      <span className="text nav-text">{"»"} Stock Report</span>
                    </NavLink>
                  </li>

                  <hr />

                  <li
                    className="nav-link-sub"
                    onClick={() => setSidebar(!sidebar)}>
                    <NavLink
                      to={`/admin/purchaseReport`}
                      activeClassName="sidebar-active">
                      <span className="text nav-text">
                        {"»"} Purchase Report
                      </span>
                    </NavLink>
                  </li>

                  <hr />
                </>
              )}
            </ul>
          </div>

          <div className="bottom-content">
            <li className="">
              <NavLink to="/">
                {/* <i className="bx bx-log-out icon"></i> */}
                <i className="bx bx-store-alt icon"></i>
                <span className="text nav-text">Go to store</span>
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="/"
                onClick={() => {
                  localStorage.removeItem("token");
                  history.push("/home");
                  window.location.reload(true);
                }}>
                <i className="bx bx-log-out icon"></i>
                <span className="text nav-text">Logout</span>
              </NavLink>
            </li>

            {/* <li className="mode">
              <div className="sun-moon">
                <i className="bx bx-moon icon moon"></i>
                <i className="bx bx-sun icon sun"></i>
              </div>
              <span className="mode-text text">Dark mode</span>

              <div className="toggle-switch">
                <span className="switch"></span>
              </div>
            </li> */}
          </div>
        </div>
      </nav>

      {/* <section className="home">
        <div className="text">Dashboard Sidebar</div>
      </section> */}
    </>
  );
}

export default Sidebar;
