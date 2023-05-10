import React from "react";
import "../Style/home.css";
import { useParams } from "react-router-dom";
import ManageSupplier from "./Supplier/ManageSupplier";
import AddSupplier from "./Supplier/AddSupplier";
import ManagePurchase from "./Purchase/ManagePurchase";
import AddPurchase from "./Purchase/AddPurchase";
import AddCategory from "./Category/AddCategory";
import ManageCategory from "./Category/ManageCategory";
import ManageProduct from "./Product/ManageProduct";
import AddProduct from "./Product/AddProduct";
import ManageDiscount from "./Discount/ManageDiscount";
import AddDiscount from "./Discount/AddDiscount";
import Error from "../../routes/Error";
import Dashboard from "./Dashboard";
import PendingOrder from "./Order/PendingOrder";
import DeliveredOrder from "./Order/DeliveredOrder";
import AllOrder from "./Order/AllOrder"
import SupplierReport from "./Reports/SupplierReport";
import SalesReport from "./Reports/SalesReport";
import StockReport from "./Reports/StockReport";
import AddAdmin from "./Admin/AddAdmin";
import PurchaseReport from "./Reports/PurchaseReport";


function Home({ path }) {
  let { id } = useParams();

  return (
    <>
      {id === "dashboard" && (
        <section className="home">
          <Dashboard />
          {/* <h1>Admin Dashboard</h1> */}
        </section>
      )}
      {id === "manageSupplier" && (
        <section className="home">
          <ManageSupplier />
        </section>
      )}
      {id === "addSupplier" && (
        <section className="home">
          <AddSupplier />
        </section>
      )}
      {id === "managePurchase" && (
        <section className="home">
          <ManagePurchase />
        </section>
      )}
      {id === "addPurchase" && (
        <section className="home">
          <AddPurchase />
        </section>
      )}
      {id === "addCategory" && (
        <section className="home">
          <AddCategory />
        </section>
      )}
      {id === "manageCategory" && (
        <section className="home">
          <ManageCategory />
        </section>
      )}
      {id === "manageProduct" && (
        <section className="home">
          <ManageProduct />
        </section>
      )}
      {id === "addProduct" && (
        <section className="home">
          <AddProduct />
        </section>
      )}
      {id === "manageDiscount" && (
        <section className="home">
          <ManageDiscount />
        </section>
      )}
      {id === "addDiscount" && (
        <section className="home">
          <AddDiscount />
        </section>
      )}
      {id === "pendingOrder" && (
        <section className="home">
          <PendingOrder />
        </section>
      )}
      {id === "deliveredOrder" && (
        <section className="home">
          <DeliveredOrder />
        </section>
      )}
      {id === "allOrder" && (
        <section className="home">
          <AllOrder />
        </section>
      )}
      {id === "supplierReport" && (
        <section className="home">
          <SupplierReport />
        </section>
      )}
      {id === "salesReport" && (
        <section className="home">
          <SalesReport />
        </section>
      )}
      {id === "stockReport" && (
        <section className="home">
          <StockReport />
        </section>
      )}
      {id === "addAdmin" && (
        <section className="home">
          <AddAdmin />
        </section>
      )}
      {id === "purchaseReport" && (
        <section className="home">
          <PurchaseReport />
        </section>
      )}

      {id !== "dashboard" &&
        id !== "manageSupplier" &&
        id !== "addSupplier" &&
        id !== "managePurchase" &&
        id !== "addPurchase" &&
        id !== "addCategory" &&
        id !== "manageCategory" &&
        id !== "addProduct" &&
        id !== "manageProduct" &&
        id !== "manageDiscount" &&
        id !== "addDiscount" &&
        id !== "pendingOrder" &&
        id !== "deliveredOrder" &&
        id !== "allOrder" &&
        id !== "supplierReport" &&
        id !== "salesReport" &&
        id !== "stockReport" &&
        id !== "purchaseReport" &&
        id !== "addAdmin" && (
          <>
            <section className="home">
              <Error />
            </section>
          </>
        )}
    </>
  );
}

export default Home;
