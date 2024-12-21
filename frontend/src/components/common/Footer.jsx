import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-800 text-white text-center py-4">
        <span>
          User Management | All Rights Reserved &copy;{" "}
          {new Date().getFullYear()}
        </span>
      </footer>
    </div>
  );
};

export default Footer;
