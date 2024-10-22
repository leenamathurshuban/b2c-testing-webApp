import React from 'react';

const Flower = ({ style, image }) => {
  return <div className="flower" style={{ ...style, backgroundImage: `url(${image})` }}></div>;
};

export default Flower;