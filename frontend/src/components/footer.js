import React from 'react';
import {  Twitter } from 'react-feather';
import { Folder  } from 'react-feather';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>By Westt Industries</p>
        <div className="social-links">
          
          <a href="https://x.com/AsifWestt?t=XCs2yCUf1Fkmos5kSYYFXA&s=08"><Twitter /></a>
          
          <a href="https://asifsheikh.vercel.app/"><Folder /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
