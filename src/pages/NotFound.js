import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex h-screen items-center justify-center text-black dark:text-white">
      Not Found 😭{" "}
      <Link to="/" className="text-blue-600 underline">
        home
      </Link>
    </div>
  );
};

export default NotFound;
