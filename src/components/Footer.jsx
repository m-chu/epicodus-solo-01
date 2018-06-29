import React from 'react';
import youtubeDeveloperLogos from '../assets/img/developed-with-youtube-logos-2x.png';

function Footer() {
  return (
    <footer>
      <style jsx>
        {`
          footer {
            width: 100%;
            display: flex;
            justify-content: center;
            background-color: #282828;
          }

          figure {
            height: 75px;
            min-width: 410px;
            margin: 0;
            background-image: url(${youtubeDeveloperLogos});
            background-position-y: -236px;
            background-repeat: no-repeat;
          }
        `}
      </style>
      <a href="https://www.youtube.com/" target="_blank">
        <figure></figure>
      </a>
    </footer>
  );
}

export default Footer;
