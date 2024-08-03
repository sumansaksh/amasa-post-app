import React, { useState } from "react";
import useToast from "../../hooks/useToast.jsx";
import { Tooltip } from "react-tooltip";
import { PostTableProps } from "../../types/posts.ts";

const PostTable: React.FC<PostTableProps> = ({ comments, fetchData }) => {
  const [deletingPost, setDeletingPost] = useState<number | null>(null);
  const { toastSuccess, toastError } = useToast();
  const handleDelete = async (commentId: number) => {
    setDeletingPost(commentId);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments/${commentId}`, {
        method: "DELETE",
      });
      console.log(response, "response");
      if (response.ok) {
        setDeletingPost(null);
        toastSuccess(`Comment Deleted Successfully`);
        fetchData();
      }
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <div className="border overflow-x-auto m-10 max-sm:m-1 max-sm:my-10 overflow-scroll">
      <Tooltip id="my-tooltip" className="max-w-[30vw] absolute" />
      <table className="w-full">
        <thead className="bg-gray-200 table-responsive">
          <tr>
            <th className="px-4 py-4 max-sm:py-2 text-left uppercase">Post Id</th>
            <th className="px-4 py-4 max-sm:py-2 text-left uppercase">Name</th>
            <th className="px-4 py-4 max-sm:py-2 text-left uppercase">Email</th>
            <th className="px-4 py-4 max-sm:py-2 text-left uppercase">Body</th>
            <th className="px-4 py-4 max-sm:py-2 text-left uppercase">Action</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment.id} className="border-b">
              <td className="px-4 py-4 text-center">{comment.postId}</td>
              <td className="px-4 py-4">{comment.name}</td>
              <td className="px-4 py-4">{comment.email}</td>
              <td className="px-4 py-4 cursor-pointer" data-tooltip-id="my-tooltip" data-tooltip-content={comment.body} title={comment.body || "No content"}>
                {comment.body.length > 30 ? `${comment.body.slice(0, 30)}...` : comment.body}
              </td>

              <td className="px-4 py-4 text-center">
                <button onClick={() => handleDelete(comment.id)} disabled={deletingPost === comment.id} className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${deletingPost === comment.id ? "opacity-50" : ""}`}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostTable;
