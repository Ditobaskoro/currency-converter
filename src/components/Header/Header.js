import React from 'react';
import './header.css';
import Input from '../commons/Input.js';


const Header = props => {
  return (
    <div className="header">
      <div className="header-sub">USD - United States Dollars</div>
      <div className="header-title">
        USD
        <Input {...props} />
      </div>
      
    </div>
  );
}

export default Header;
