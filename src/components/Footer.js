import React from "react";
import { Link } from "react-router-dom";
import CopyrightIcon from '@material-ui/icons/Copyright';

const Footer = () => {
  return (
    <footer>
      <div
        className="footer_bg"
        style={{
          position: "relative",
          top: "0",
          bottom: "0",
          right: "0",
          left: "0",
          width: "100%",
          height: "13em",
          backgroundImage: "linear-gradient(#7D69AF, #7D69AF)",
          transform: "skewY(-4deg)",
          transformOrigin: "bottom right",
        }}
      >
        <div className='footer-content'>
          <div className='admin-link'>
            <Link href="#" to='/login' style={{
              color: 'white',
              fontWeight: 'normal',
              fontFamily: 'Garamond',
              textDecoration: 'none'
            }}>
              Admin
            </Link>
          </div>
          <div className='copy-right'>
            Copyright
            <CopyrightIcon />
            DevNinjas
          </div>
        </div>
      </div>
    </footer>
  );

};

export default Footer;