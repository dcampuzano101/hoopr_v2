import React from 'react';

const Spinner = () => (
  <div
    class='spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full'
    role='status'
  >
    <span class='visually-hidden'>Loading...</span>
  </div>
);

export default Spinner;
