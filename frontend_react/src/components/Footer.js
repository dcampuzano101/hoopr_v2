import React from 'react';
import { SocialIcon } from 'react-social-icons';

const Footer = (props) => {
  return (
    <div className='h-20 w-auto border-black border-4 flex justify-center'>
      <div className='flex flex-row justify-evenly w-2/6 items-center'>
        <SocialIcon url='https://instagram.com/merkyoass' />
        <SocialIcon url='https://linkedin.com/in/david-campuzano' />
        <SocialIcon url='https://github.com/dcampuzano101' />
      </div>
    </div>
  );
};

export default Footer;
