import "./App.css";
import React, { useState, useEffect } from "react";
import Home from "./routes/Home";
import Shop from "./routes/Shop";
import Contact from "./routes/Contact";
import Login from "./routes/Login";
import Footer from "./routes/Footer";
import Register from "./routes/Register";
import { Switch, Route, Redirect } from "react-router-dom";
import SingleProduct from "./routes/SingleProduct";
import CartProducts from "./routes/CartProducts";
import Error from "./routes/Error";
import Admin from "./admin panel/Admin";
import Checkout from "./routes/Checkout";
import Profile from "./routes/Profile";
import ForgotPassword from "./routes/ForgotPassword";
import ChangePassword from "./routes/ChangePassword";
import jwtDecode from "jwt-decode";
import Invoice from "./routes/Invoice";
import { CookiesProvider } from "react-cookie";
import StockReportPdf from "./admin panel/routes/Reports/StockReportPdf";
import SupplierReportPdf from "./admin panel/routes/Reports/SupplierReportPdf";
import SalesReportPdf from "./admin panel/routes/Reports/SalesReportPdf";
import PurchaseReportPdf from "./admin panel/routes/Reports/PurchaseReportPdf";
import ChangePasswordProfile from "./routes/ChangePasswordProfile";
import MyOrder from "./routes/MyOrder";

function App() {
  const user = localStorage.getItem("token");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      const decoded = jwtDecode(user);
      setRole(decoded["id"]["role"]);
    }
  }, [role, user]);

  return (
    <CookiesProvider>
      <div className="App">
        {/* <Navbar /> */}
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/home" component={Home} />
          <Route exact path="/shop">
            <Redirect to="/shop/all" />
          </Route>
          <Route exact path="/shop/:id" component={Shop} />
          <Route exact path="/shop/:cat/:subcat" component={Shop} />
          <Route exact path="/shop/:kid/:kidcat/:kidsubcat" component={Shop} />
          <Route
            exact
            path="/single-product/:product_id"
            component={SingleProduct}
          />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/footer" component={Footer} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/cart-products" component={CartProducts} />

          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <Route exact path="/resetpassword/:key" component={ChangePassword} />
          {user && role === "admin" && (
            <>
              <Switch>
                <Route
                  exact
                  path="/admin/stockReportPdf/:id"
                  component={StockReportPdf}
                />
                <Route
                  exact
                  path="/admin/supplierReportPdf/:id"
                  component={SupplierReportPdf}
                />
                <Route
                  exact
                  path="/admin/salesReportPdf/:id"
                  component={SalesReportPdf}
                />
                <Route
                  exact
                  path="/admin/purchaseReportPdf/:id"
                  component={PurchaseReportPdf}
                />
                <Route path="/admin" component={Admin} />
                <Route exact path="/checkout" component={Checkout} />
                <Route path="/profile" component={Profile} />
                <Route path="/*" component={Error} />
              </Switch>
            </>
          )}
          <Route path="/profile" component={Profile} />
          <Route path="/change-password" component={ChangePasswordProfile} />
          <Route path="/my-order" component={MyOrder} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/invoice/:order_id" component={Invoice} />
          <Route path="/*" component={Error} />

          <Route path="/*" component={Error} />
        </Switch>
      </div>
    </CookiesProvider>
  );
}

export default App;
