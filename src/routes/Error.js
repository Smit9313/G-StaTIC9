import React from 'react';
import {Link} from 'react-router-dom';
import '../Style/error.css';
import Navbar from '../components/navbar/Navbar';
import { Dna } from "react-loader-spinner";


function Error() {
  return (
    <>
      {/* <Navbar /> */}
      <div className="error">
        <h1>
          <center>404 not found...</center>
          <center>
            <Link to="/">
              <h6>Back to home</h6>
            </Link>
          </center>
          <center>
            {/* <Dna
              visible={true}
              height="100"
              width="100"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            /> */}
          </center>
        </h1>
      </div>
    </>
  );
}

export default Error