import React from "react";
import Post from "./pages/posts/index.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreatePage from "./pages/posts/Create.tsx";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <div className="h-screen">
        <ToastContainer />
        <header className="h-full">
          <Routes>
            <Route path="/" element={<Post />} />
            <Route path="/create-comment" element={<CreatePage />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
