import React from "react";
import { SocialIcon } from "react-social-icons";

const Footer = () => {
  return (
    <div className='h-1/8 w-auto border-black border-t-1 flex justify-center'>
      <div className='flex flex-row justify-evenly w-1/2 items-center'>
        <SocialIcon url='https://instagram.com/merkyoass' />
        <SocialIcon url='https://linkedin.com/in/david-campuzano' />
        <SocialIcon url='https://github.com/dcampuzano101' />
      </div>
    </div>
  );
};

export default Footer;
