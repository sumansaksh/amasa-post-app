import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorState: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="bg-white  rounded-lg p-4 h-full w-full mx-auto flex items-center justify-center flex-col">
      <FaExclamationTriangle size={50} className="text-red-500" />
      <h2 className="text-lg font-bold text-red-600 mt-4">Error Occurred</h2>
      <p className="text-gray-600">{message}</p>
    </div>
  );
};

export default ErrorState;
