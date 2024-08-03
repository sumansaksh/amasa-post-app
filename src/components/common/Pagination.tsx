import React from "react";
import { MdChevronLeft, MdChevronRight, MdFirstPage, MdLastPage } from "react-icons/md";

interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  setPage: (page: number) => void;
  setItemsPerPage: (number: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, itemsPerPage, totalItems, setPage, setItemsPerPage }) => {
  const lastPage = Math.ceil(totalItems / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < lastPage) setPage(currentPage + 1);
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
  };

  return (
    <div className={`flex max-sm:flex-col justify-center items-center gap-5 max-sm:gap-2`}>
      <div className="flex items-center gap-2">
        <button onClick={() => setPage(1)} disabled={currentPage === 1} className={`border text-[25px] rounded ${currentPage === 1 ? "bg-[#F2F6FF] text-[#3470E4] opacity-50 cursor-not-allowed" : "bg-[#F2F6FF] text-[#3470E4]"}`}>
          <MdFirstPage />
        </button>
        <button onClick={handlePrevious} disabled={currentPage === 1} className={`border text-[25px] rounded ${currentPage === 1 ? "bg-[#F2F6FF] text-[#3470E4] opacity-50 cursor-not-allowed" : "bg-[#F2F6FF] text-[#3470E4]"}`}>
          <MdChevronLeft />
        </button>
        <span className=" text-[#3470E4] ">
          {currentPage} of {lastPage}
        </span>
        <button onClick={handleNext} disabled={currentPage === lastPage} className={`border text-[25px] rounded ${currentPage === lastPage ? "bg-[#F2F6FF] text-[#3470E4] opacity-50 cursor-not-allowed" : "bg-[#F2F6FF] text-[#3470E4]"}`}>
          <MdChevronRight />
        </button>
        <button onClick={() => setPage(lastPage)} disabled={currentPage === lastPage} className={`border text-[25px] rounded ${currentPage === lastPage ? "bg-[#F2F6FF] text-[#3470E4] opacity-50 cursor-not-allowed" : "bg-[#F2F6FF] text-[#3470E4]"}`}>
          <MdLastPage />
        </button>
      </div>
      <select value={itemsPerPage} onChange={handleLimitChange} className="ml-4 border min-w-20 p-1">
        {[10, 20, 30, 50, 100].map((limit) => (
          <option key={limit} value={limit}>
            {limit} per page
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;
