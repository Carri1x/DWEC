import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <>
        <header>
            <Link to='/' >
            <img src="https://yt3.googleusercontent.com/92XDN_PhYnUbrZVz3wTm1-LnXQQTGB5ccZDswiJCBInenlH5oTwgn3Siow8Dx_sMAXrrBeMYels=s900-c-k-c0x00ffffff-no-rj" alt="Logo de mi aplicación" />
            <h3>NetFlox</h3>
            </Link>
        </header>
    </>
  )
}

export default Header;