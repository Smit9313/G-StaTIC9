import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import './productlist.css';
// import { InputNumber } from "antd";

function ProductList({ products, onChangeProductQuantity, onRemoveProduct ,onAddQty, onRemoveQty }) {

    const onChange = (value) => {
      console.log("changed", value);
    };
    


  return (
      <section className="container">
          <ul className="products">
              {products.map((product, index) => {
                  return (
                    <li className="row" key={index}>
                      <div className="col left">
                        <div className="thumbnail">
                          <Link to={`/single-product/${product.prod_id}`}>
                            <img
                              src={product.prod_image}
                              alt={product.name}
                              height="150"
                              width="135"
                            />
                          </Link>
                        </div>
                        <div className="detail">
                          <div className="name_cart">
                            <Link to={`/single-product/${product.prod_id}`}>
                              {product.prod_name}
                            </Link>
                          </div>
                          <div className="description">{product.size}</div>
                          <div className="price">{product.prod_price}</div>
                        </div>
                      </div>

                      <div className="col right">
                        <div className="quantity">
                          <button
                            className="button-133"
                            onClick={() => onRemoveQty(index)}>
                            -
                          </button>
                          <input
                            type="text"
                            className="quantity"
                            disabled
                            max={10}
                            step="1"
                            value={product.qty}
                            onChange={(event) =>
                              onChangeProductQuantity(index, event)
                            }
                          />
                          <button
                            className="button-133"
                            onClick={() => onAddQty(index)}>
                            +
                          </button>
                        </div>

                        <div className="remove">
                          <i
                            className="bx bx-x remove-icon"
                            onClick={() => onRemoveProduct(index)}></i>
                        </div>
                      </div>
                    </li>
                  );
              })}
          </ul>
      </section>
  )
}

export default ProductList