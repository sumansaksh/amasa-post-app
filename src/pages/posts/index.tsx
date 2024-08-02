import React, { useState, useEffect } from "react";
import LoadingStateCard from "../../components/common/LoadingState.tsx";
import ErrorState from "../../components/common/ErrorState.tsx";
import EmptyState from "../../components/common/EmptyState.tsx";
import PostTable from "../../components/posts/index.tsx";
import Pagination from "../../components/common/Pagination.tsx";

const Post: React.FC = () => {
  type CommentData = {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
  };

  const [data, setData] = useState<CommentData[] | null>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>("");
  const [currentPage, setCurrentPage] = useState(1);

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
  }, []);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [searchTerm, setSearchTerm] = useState("");
  const [emailSearchTerm, setEmailSearchTerm] = useState("");
  const currentItems = data
    ? data
        .filter((item) => {
          return (item.name.includes(searchTerm) || item.body.includes(searchTerm) || item.id.toString().includes(searchTerm) || item.postId.toString().includes(searchTerm)) && item.email.includes(emailSearchTerm);
        })
        .slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const PaginationComponent = <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={data ? data.length : 0} setPage={setCurrentPage} setItemsPerPage={setItemsPerPage} />;
  return (
    <div className="p-10 flex flex-col justify-center">
      <h1 className="font-bold text-2xl leading-8 py-10">Post application using JavaScript/TypeScript.</h1>
      <div className=" flex flex-row gap-2 py-2 pl-[10%]">
        <div className="flex flex-col gap-2">
          <label className="text-[#21191B]">Search in entire data</label>
          <input id="searchAll" type="text" placeholder="Search in entire data" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="mb-4 p-2 border rounded" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[#21191B]">Search by email</label>
          <input id="searchEmail" type="text" placeholder="Search by email" value={emailSearchTerm} onChange={(e) => setEmailSearchTerm(e.target.value)} className="mb-4 p-2 border rounded" />
        </div>
      </div>
      {isLoading ? (
        <LoadingStateCard />
      ) : error ? (
        <div className="flex items-center h-full ">
          <ErrorState message={error} />
        </div>
      ) : data ? (
        data.length === 0 ? (
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
