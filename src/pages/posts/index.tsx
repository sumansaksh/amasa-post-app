import React, { useState, useEffect } from "react";
import LoadingStateCard from "../../components/common/LoadingState.tsx";
import ErrorState from "../../components/common/ErrorState.tsx";
import EmptyState from "../../components/common/EmptyState.tsx";
import PostTable from "../../components/posts/index.tsx";
import Pagination from "../../components/common/Pagination.tsx";
import { useSearchParams } from "react-router-dom";
import { CommentData } from "../../types/posts.ts";
import debounce from "lodash.debounce";

const Post: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<CommentData[] | null>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>("");
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const searchTerm = searchParams.get("search") || "";
  const emailSearchTerm = searchParams.get("email") || "";
  const [email, setEmail] = useState(emailSearchTerm || "");
  const [search, setSearch] = useState(searchTerm || "");

  async function fetchData() {
    setIsLoading(true); // Start loading
    try {
      // I have used api directly in this file but usually for a project we should keep it in .env file
      //usually we pass parameter like page number, limit etc  in api but here i am getting all the data and applying pagination and searching in frontend to get more controls

      const response = await fetch(`https://jsonplaceholder.typicode.com/comments`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  const handleSearchChange = debounce((newSearchTerm: string, type: "search" | "email") => {
    const newParams = { ...Object.fromEntries(searchParams), page: "1" };
    if (newSearchTerm) {
      newParams[type] = newSearchTerm;
    } else {
      delete newParams[type];
      if (type === "search") {
        setSearch("");
      } else if (type === "email") {
        setEmail("");
      }
    }
    setSearchParams(newParams);
  }, 300);

  const handlePageChange = (newPage) => {
    setSearchParams({ ...Object.fromEntries(searchParams), page: newPage.toString() });
  };

  const filteredData = data
    ? data
        .filter((item) => {
          return item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.body.toLowerCase().includes(searchTerm.toLowerCase()) || item.id.toString().includes(searchTerm) || item.postId.toString().includes(searchTerm) || item.email.toLowerCase().includes(searchTerm.toLowerCase());
        })
        .filter((item) => item.email.toLowerCase().includes(emailSearchTerm.toLowerCase()))
    : [];
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const PaginationComponent = <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={filteredData?.length || 0} setPage={handlePageChange} setItemsPerPage={setItemsPerPage} />;
  return (
    <div className="p-10 flex flex-col justify-center">
      <h1 className="font-bold text-2xl leading-8 py-10 capitalize">Post application using JavaScript / TypeScript.</h1>
      {/* border overflow-x-auto m-10 max-sm:m-1 max-sm:my-10 overflow-scroll */}
      <div className=" m-10 flex flex-row max-sm:flex-col gap-2 py-2 max-sm:py-1 max-sm:gap-1">
        <div className="flex flex-col gap-2 w-full">
          <label className="text-[#21191B] capitalize">Search in entire data</label>
          <input
            id="searchAll"
            type="text"
            placeholder="Search in entire data"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              handleSearchChange(e.target.value, "search");
            }}
            className="mb-4 p-2 border rounded"
          />
        </div>
        <div className="flex flex-col gap-2 w-full capitalize">
          <label className="text-[#21191B]">Search by email</label>
          <input
            id="searchEmail"
            type="text"
            placeholder="Search by email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              handleSearchChange(e.target.value, "email");
            }}
            className="mb-4 p-2 border rounded"
          />
        </div>
      </div>
      {isLoading ? (
        <LoadingStateCard />
      ) : error ? (
        <div className="flex items-center h-full ">
          <ErrorState message={error} />
        </div>
      ) : data ? (
        currentItems.length === 0 ? (
          <EmptyState />
        ) : (
          <div>
            {PaginationComponent}
            <PostTable comments={currentItems} />
            {PaginationComponent}
          </div>
        )
      ) : (
        <p>No data fetched</p>
      )}
    </div>
  );
};

export default Post;
