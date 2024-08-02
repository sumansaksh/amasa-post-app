import React from "react";
const LoadingState: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg p-4 h-full w-full mx-auto">
      <div className="animate-pulse flex flex-col space-y-2">
        <div className="h-8 bg-gray-400 rounded w-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-6 bg-gray-400 rounded w-full"></div>
          <div className="h-6 bg-gray-400 rounded w-full"></div>
          <div className="h-6 bg-gray-400 rounded w-full"></div>
          <div className="h-6 bg-gray-400 rounded w-full"></div>
          <div className="h-6 bg-gray-400 rounded w-full"></div>
          <div className="h-6 bg-gray-400 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
};
export default LoadingState;
