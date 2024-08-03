import React, { useState } from "react";
import { CommentData } from "../../types/posts.ts";
import { Tooltip } from "react-tooltip";


interface PostTableProps {
  comments: CommentData[];
}
const PostTable: React.FC<PostTableProps> = ({ comments }) => {
  return (
    <div className="border overflow-x-auto m-10 max-sm:m-1 max-sm:my-10 overflow-scroll">
      <table className="w-full ">
        <thead className="bg-gray-200 table-responsive">
          <tr>
            <th className="px-4 py-4 text-left">Post Id</th>
            <th className="px-4 py-4 text-left">Name</th>
            <th className="px-4 py-4 text-left">Email</th>
            <th className="px-4 py-4 text-left">Body</th>
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
              <Tooltip id="my-tooltip" className="max-w-[30vw]" />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostTable;
