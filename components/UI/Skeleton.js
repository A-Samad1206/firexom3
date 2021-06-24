import React from 'react';

const Skeleton = ({ className }) => {
  const cls = `animate-pulse bg-gray-200 rounded-md m-1  `;
  return <div className={`${cls} ${className}`} />;
};

export default Skeleton;
