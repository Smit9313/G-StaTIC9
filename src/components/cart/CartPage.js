import React, { useState } from "react";
import Header from "./Header";
import ProductList from "./ProductList";
import Summary from "./Summary";
import { useHistory } from "react-router-dom";
import "./cartpage.css";
import { isEmpty } from "lodash";
import Navbar from "../navbar/Navbar";
import CartProduct from "../../data/CartProduct";

function CartPage() {
  const [products, setProducts] = useState(CartProduct);
  const [navrender, setNavRender] = useState(true);

  const [navClose, setNavClose] = useState(false);

  const history = useHistory();

  const itemCount =
    products !== undefined &&
    products.reduce((qty, product) => {
      return qty + +product.qty;
    }, 0);

  const subTotal =
    products !== undefined &&
    products.reduce((total, product) => {
      return total + product.prod_price * +product.qty;
    }, 0);

  const onChangeProductQuantity = (index, event) => {
    const value = event.target.value;
    const valueInt = parseInt(value);
    const cloneProducts = [...products];

    // Minimum quantity is 1, maximum quantity is 100, can left blank to input easily
    if (value === "") {
      cloneProducts[index].quantity = value;
    } else if (valueInt > 0 && valueInt < 100) {
      cloneProducts[index].quantity = valueInt;
    }
    setProducts(cloneProducts);
  };

  const onAddQty = (index) => {
    const cloneProducts = [...products];
    if (cloneProducts[index].qty < 10) {
      cloneProducts[index].qty = parseInt(cloneProducts[index].qty) + 1;
    }

    setProducts(cloneProducts);
  };

  const onRemoveQty = (index) => {
    const cloneProducts = [...products];
    if (cloneProducts[index].qty > 1) {
      cloneProducts[index].qty = parseInt(cloneProducts[index].qty) - 1;
    }
    setProducts(cloneProducts);
  };

  const onRemoveProduct = (i) => {

    const filteredProduct = products.filter((product, index) => {
      return index !== i;
    });

    setProducts(filteredProduct);
  };

  return (
    <>
      <Navbar navrender={navrender} closeNav={navClose} />
      <div onClick={() => setNavClose(!navClose)}>
        {isEmpty(products) ? (
          <>
            <div className="empty-product">
              <h3>There are no products in your cart.</h3>
              <button
                onClick={() => {
                  history.push("/shop");
                }}
              >
                Shopping now
              </button>
            </div>
          </>
        ) : (
          <>
            <div>
              <Header itemCount={itemCount} />

              <ProductList
                products={products}
                onChangeProductQuantity={onChangeProductQuantity}
                onRemoveProduct={onRemoveProduct}
                onAddQty={onAddQty}
                onRemoveQty={onRemoveQty}
              />

              <Summary
                subTotal={subTotal}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CartPage;
