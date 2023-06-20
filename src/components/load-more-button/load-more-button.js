import React from 'react';

const LoadMoreButton = ({ onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled} className='c-btn'>
      Load More
    </button>
  );
};

export default LoadMoreButton;
