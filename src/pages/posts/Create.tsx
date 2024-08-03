import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../components/posts/Form.tsx";
import useToast from "../../hooks/useToast.jsx"; // Import the useToast hook

const CreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const { toastSuccess, toastError } = useToast();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const postData = { name, email, body };

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const data = await response.json();
        navigate("/");
        toastSuccess("Comment created successfully!");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      toastError("Error submitting form. Please try again later.");
    }

    setName("");
    setEmail("");
    setBody("");
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Create a Comment</h1>
      <Form name={name} email={email} body={body} setName={setName} setEmail={setEmail} setBody={setBody} handleSubmit={handleSubmit} />
    </div>
  );
};

export default CreatePage;
