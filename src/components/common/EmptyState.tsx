import React from "react";
import { FaRegMeh } from "react-icons/fa";

const EmptyState: React.FC<{ message?: string }> = ({ message = "No data available" }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 h-full w-full mx-auto flex items-center justify-center flex-col">
      <FaRegMeh size={50} className="text-gray-500" />
      <h2 className="text-lg font-bold text-gray-600 mt-4">Empty State</h2>
      <p className="text-gray-600">{message}</p>
    </div>
  );
};

export default EmptyState;
