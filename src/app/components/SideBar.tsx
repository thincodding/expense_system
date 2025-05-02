'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaCog, FaMoneyCheck } from 'react-icons/fa'; // Import React Icons
import React from 'react';
import { CgChevronDoubleUp } from "react-icons/cg";
import { FaUsersGear, FaMoneyBillWave } from "react-icons/fa6";
import { TbReportSearch, TbCreditCardPay } from "react-icons/tb";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaMoneyBillTransfer } from "react-icons/fa6";



const SideBar: React.FC = () => {
  const pathname = usePathname();

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

  return (
   
   
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
          {navItem('/៣២', 'គណនី', FaMoneyCheck)}
          {navItem('/settings', 'ប្រភេទគណនី', BiSolidCategoryAlt)}
          {navItem('/៤', 'ដាក់លុយ', FaMoneyBillTransfer)}
          <p className='text-xs text-gray-400 my-2'>អ្នកប្រើប្រាស់និងរបាយការណ៍</p>
          {navItem('/signup', 'អ្នកប្រើប្រាស់', FaUsersGear)}
          {navItem('/g', 'របាយការណ៍', TbReportSearch)}
          {navItem('/settings', 'ការកំណត់', FaCog)}
        </nav>
      </div>
    

    
  );
};

export default SideBar;
