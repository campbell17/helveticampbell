import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/6"></div>
      </div>
       <div className="h-32 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
       <div className="space-y-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader; 