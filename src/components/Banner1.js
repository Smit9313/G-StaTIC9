import React from 'react';
import { Link } from 'react-router-dom';
import '../Style/banner1.css'

function Banner1() {
  return (
    <div className="banner1-image">
      <Link to="/shop">
        {/* <img
          src="https://firebasestorage.googleapis.com/v0/b/clothing-store-2.appspot.com/o/site_images%2Fdiscount-banner.png?alt=media&token=6429c70b-4653-4452-84f9-d327e6bf02d9"
          height="400px"
          width="100%"
        /> */}
        {/* <img
          src="https://firebasestorage.googleapis.com/v0/b/clothing-store-2.appspot.com/o/site_images%2F8131952.jpg?alt=media&token=7fca2cce-f398-4074-933a-43f6b70f26d9"
          // height="400px"
          width="100%"
        /> */}
        {/* <img
          src="https://firebasestorage.googleapis.com/v0/b/clothing-store-2.appspot.com/o/site_images%2F8131952%20copy.jpg?alt=media&token=a0876505-b5bb-455a-a7f1-042d8de03bbc"
          // height="400px"
          width="100%"
        /> */}
        <img
          src="https://firebasestorage.googleapis.com/v0/b/clothing-store-2.appspot.com/o/site_images%2FGroup%206.png?alt=media&token=a463afec-186e-4292-97ac-3c158e99631c"
          // height="400px"
          width="100%"
        />
      </Link>
    </div>
  );
}

export default Banner1