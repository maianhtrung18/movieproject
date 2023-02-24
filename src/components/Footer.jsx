import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer-distributed">
      <div className="footer-left">
        <h3>CyberMovie Ltd</h3>
        <p className="footer-links">
          <Link to='#' className="link-1">Home</Link>
          <Link to='#'>Seller</Link>
          <Link to='#'>Pricing</Link>
          <Link to='#'>About</Link>
          <Link to='#'>pages</Link>
          <Link to='#'>Contact</Link>
        </p>
        <p className="footer-company-name">CyberMovie Ltd © 2015</p>
      </div>
      <div className="footer-center">
        <div>
          <i className="fa fa-map-marker" />
          <p><span>444 S. Cedros Ave</span> Solana Beach, California</p>
        </div>
        <div>
          <i className="fa fa-phone" />
          <p>+1.555.555.5555</p>
        </div>
        <div>
          <i className="fa fa-envelope" />
          <p><a href="mailto:support@company.com">support@company.com</a></p>
        </div>
      </div>
      <div className="footer-right">
        <p style={{ color: 'white' }} className="footer-company-about">
          <span>About the company</span>
          E-commerce (electronic commerce) is the buying and selling of goods and services, or the transmitting of funds or data, over an electronic network, primarily the internet.
        </p>
        <div className="footer-icons">
          <Link to='#'><i className="fa-brands fa-square-facebook"></i></Link>
          <Link to='#'><i className="fa-brands fa-twitter"></i></Link>
          <Link to='#'><i className="fa-brands fa-linkedin"></i></Link>
          <Link to='#'><i className="fa-brands fa-github"></i></Link>
        </div>
      </div>
    </footer>


  )
}
