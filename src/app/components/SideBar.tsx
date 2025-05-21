'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaHome, FaCog, FaMoneyCheck } from 'react-icons/fa'; // Import React Icons
import React, { useEffect } from 'react';
import { CgChevronDoubleUp } from "react-icons/cg";
import { FaUsersGear, FaMoneyBillWave } from "react-icons/fa6";
import { TbReportSearch, TbCreditCardPay } from "react-icons/tb";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { RiLogoutBoxRLine } from "react-icons/ri";



const SideBar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  //if user no token back to login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, []);


  const navItem = (href: string, label: string, Icon: React.ComponentType<any>) => (
    <Link
      href={href}
      className={`flex items-center p-2 rounded hover:bg-gray-700 ${pathname === href ? 'bg-gray-700' : ''
        }`}
    >
      <Icon className="h-6 w-6 mr-3" /> {/* Icon styling */}
      {label}
    </Link>
  );

  const handleLogout = () => {
    if (window.confirm("Are you sure logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");

      router.push("/login");
      
    }
  }

  return (

    <div>
      <div className="w-64 h-screen bg-gray-800 text-white p-6 flex flex-col">

        <h2 className="text-lg font-bold mb-10 flex gap-1">
          <CgChevronDoubleUp size={32} />
          <span>ប្រព័ន្ធគ្រប់គ្រងការចំណាយ </span>
        </h2>
        <nav className="flex flex-col space-y-4">
          {navItem('/', 'ផ្ទាំងគ្រប់គ្រង', FaHome)}
          {navItem('/settings', 'ប្រភេទចំណាយ', BiSolidCategoryAlt)}
          {navItem('/៣២', 'ការចំណាយ', TbCreditCardPay)}
          <p className='text-xs text-gray-400 my-2'>គ្រប់គ្រងហិរញ្ញវត្ថុ</p>
          {navItem('/settings', 'រូបិយប័ណ្ណ', FaMoneyBillWave)}
          {navItem('/bank', 'គណនី', FaMoneyCheck)}
          {navItem('/bankType', 'ប្រភេទគណនី', BiSolidCategoryAlt)}
          {navItem('/deposit', 'ដាក់លុយ', FaMoneyBillTransfer)}
          <p className='text-xs text-gray-400 my-2'>អ្នកប្រើប្រាស់និងរបាយការណ៍</p>
          {navItem('/signup', 'អ្នកប្រើប្រាស់', FaUsersGear)}
          {navItem('/g', 'របាយការណ៍', TbReportSearch)}
          {navItem('/settings', 'ការកំណត់', FaCog)}
        </nav>
      </div>


      <div className="fixed bottom-4 left-4">
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 cursor-pointer text-white font-bold py-2 px-4 rounded-full shadow-lg flex items-center gap-2">
          <RiLogoutBoxRLine />
          <span>ចាកចេញ</span>
        </button>
      </div>

    </div>

  );
};

export default SideBar;
