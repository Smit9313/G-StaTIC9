import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Style/footer.css'


function Footer() {
  return (
    <div className="footer">
      <div className="top">
        <div>
          <h1>GuruKrupa Fashion</h1>
          <p>Choose your Favourite Products.</p>
        </div>
      </div>
      <div className="bottom">
        <div>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/contact">Contact Us</NavLink>
        </div>
        <div>
          <NavLink to="/shop/Men">
            <h4>Men</h4>
          </NavLink>
          <NavLink to="/shop/Men/T-Shirts">T-Shirt</NavLink>
          <NavLink to="/shop/Men/Jeans">Jeans</NavLink>
          <NavLink to="/shop/Men/Casual Shirts">Casual Shirt</NavLink>
          <NavLink to="/shop/Men/Formal Shirts">Formal Shirt</NavLink>
          <NavLink to="/shop/Men/Casual Trousers">Casual Trouser</NavLink>
          <NavLink to="/shop/Men/Kurtas & Kurtas Sets">
            Kurtas & Kurtas Sets
          </NavLink>
        </div>
        <div>
          <NavLink to="/shop/Women">
            <h4>Women</h4>
          </NavLink>
          <NavLink to="/shop/Women/Top">Tops</NavLink>
          <NavLink to="/shop/Women/T-shirts">T-shirts</NavLink>
          <NavLink to="/shop/Women/Lehenga Choli">Lehenga & Choli</NavLink>
          <NavLink to="/shop/Women/Kurtas & Suits">Kurtas & Suits</NavLink>
          <NavLink to="/shop/Women/Jeans">Jeans</NavLink>
          <NavLink to="/shop/Women/Dresses">Dresses</NavLink>
        </div>
        <div>
          <NavLink to="/shop/Kids">
            <h4>Kids</h4>
          </NavLink>
          <NavLink to="/shop/Kids(Boy)">Kids(Boy)</NavLink>
          <NavLink to="/shop/Kids(Girls)">Kids(Girl)</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Footer