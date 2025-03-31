import React, { useMemo } from 'react';
// import ChildComponent from './feed/feed';

const MyComponent = () => {
    const cachedString = useMemo(() => {
      console.log("Izračunavanje keširane vrednosti...");
      return "podatak";
    }, []); // Ovde ne navodimo nikakve zavisnosti jer se vrednost neće menjati
  
    // return (
    //   <div>
    //     <ChildComponent cachedData={cachedString} />
    //   </div>
    // );
  };

export default MyComponent;