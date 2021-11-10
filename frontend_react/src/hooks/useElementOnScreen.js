// import React, { useState, useEffect, useRef } from 'react';

// const useElementOnScreen = (options, handlePageChange, next) => {
//   const containerRef = useRef(null);
//   //   const [isVisible, setIsVisible] = useState(false);

//   const callbackFunction = (entries) => {
//     const [entry] = entries;
//     if (entry.isIntersecting) {
//       handlePageChange();
//     }
//   };

//   useEffect(() => {
//     const observer = new IntersectionObserver(callbackFunction, options);
//     if (containerRef.current) {
//       observer.observe(containerRef.current);
//     }

//     return () => {
//       if (containerRef.current) {
//         observer.unobserve(containerRef.current);
//       }
//     };
//   }, [containerRef]);
// };

// export default useElementOnScreen;
