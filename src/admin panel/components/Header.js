import React from 'react';
import '../Style/header.css';

function Header({name, path}) {
  return (
    <div className="header">
      <div className="name">

          <div className='header-name'>
            {name}
          </div>

          <div className='header-path'>
            {path}
          </div>

      </div>
    </div>
  );
}

export default Header