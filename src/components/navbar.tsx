import React from "react";
import Link from "next/link";
const Navbar: React.FC = ({}) => {
  return (
    <nav className="bg-black text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-lg">My App</div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-white hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/login" className="text-white hover:text-gray-300">
              Login
            </Link>
          </li>
          <li>
            <Link href="/profile" className="text-white hover:text-gray-300">
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
