'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaCog } from 'react-icons/fa'; // Import React Icons
import React from 'react';
import { CgChevronDoubleUp } from "react-icons/cg";


const SideBar: React.FC = () => {
  const pathname = usePathname();

  const navItem = (href: string, label: string, Icon: React.ComponentType<any>) => (
    <Link
      href={href}
      className={`flex items-center p-2 rounded hover:bg-gray-700 ${
        pathname === href ? 'bg-gray-700' : ''
      }`}
    >
      <Icon className="h-6 w-6 mr-3" /> {/* Icon styling */}
      {label}
    </Link>
  );

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-6 flex flex-col">
      <h2 className="text-lg font-bold mb-10 flex gap-1">
        <CgChevronDoubleUp size={32}/>
        <span>ប្រព័ន្ធគ្រប់គ្រងការចំណាយ</span>
      </h2>
      <nav className="flex flex-col space-y-4">
        {navItem('/', 'ផ្ទាំងគ្រប់គ្រង', FaHome)} {/* Using FaHome Icon */}
        {navItem('/settings', 'ការកំណត់', FaCog)} {/* Using FaCog Icon */}
      </nav>
    </div>
  );
};

export default SideBar;
