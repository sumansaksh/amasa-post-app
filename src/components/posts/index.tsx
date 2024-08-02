import React, { useState } from "react";
import { CommentData } from "../../types/posts.ts";
import { Tooltip } from "react-tooltip";

interface PostTableProps {
  comments: CommentData[];
}
const PostTable: React.FC<PostTableProps> = ({ comments }) => {
  return (
    <div>
      <table className="m-10 border-2 border-red-500 table-auto rounded overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">Post Id</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Body</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment.id} className="border-b">
              <td className="px-4 py-2">{comment.postId}</td>
              <td className="px-4 py-2">{comment.name}</td>
              <td className="px-4 py-2">{comment.email}</td>
              <td className="px-4 py-2 cursor-pointer" data-tooltip-id="my-tooltip" data-tooltip-content={comment.body} title={comment.body || "No content"}>
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
