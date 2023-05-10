import React from 'react';
import '../Style/start.css';
import {Link} from 'react-router-dom'; 


function Start(props) {
  return (
    <>    
    <div className={props.cName}>
          <div className='hero-text'>
            <h1>
                {props.title}
            </h1>
            <p>
                {props.text}
            </p>
            
            <Link to="/shop" className={props.btnClass}>
                {props.buttonText}
            </Link>
          </div>
    </div>
      </>
  );
}

export default Start;