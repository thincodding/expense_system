import React from 'react'
import { FaSearch } from "react-icons/fa";
import { LuUser } from "react-icons/lu";
import { usePathname } from 'next/navigation';
import { FaAnglesRight } from "react-icons/fa6";

function Navbar() {

    const pathname = usePathname()
    const displayPath =
        pathname === '/' ? 'ផ្ទាំងគ្រប់គ្រង' :
        pathname === '/settings' ? 'ការកំណត់' :
        pathname.replace('/', '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

    return (
        <div>

            <nav
                className="relative px-4 py-2 flex justify-between items-center bg-white shadow ">

                <div className="font-bold flex gap-2 items-center" >
                  <FaAnglesRight size={24}/>  
                  <span>{displayPath}</span>
                </div>

                <div className="lg:hidden">
                    <button className="navbar-burger flex items-center text-violet-600 dark:text-gray-100 p-1" id="navbar_burger">
                        <svg className="block h-6 w-6 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Hamberger menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                        </svg>
                    </button>
                </div>

                <ul
                    className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">

                    <li>
                        <div className=" relative mx-auto text-gray-600">
                            <input className="border border-gray-300 placeholder-current h-10 px-5 pr-16  rounded-lg text-sm focus:outline-none dark:bg-gray-500 dark:border-gray-50 dark:text-gray-200 " type="search" name="search" placeholder="ស្វែងរក" />

                            <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                             <FaSearch/>
                            </button>

                        </div>
                    </li>
                </ul>


                <div className="hidden lg:flex items-center">

                    <div>
                       ប្រវត្តិរូប៖
                    </div>

                    <div className='mr-3'>
                        <div>
                            Sokthin
                        </div>
                    </div>

                    <div>
                
                        <button className=" py-3 px-3 m-1 text-center bg-gray-100 border border-gray-300  text-black  hover:bg-gray-100 dark:text-gray-300 dark:bg-gray-700 hidden lg:inline-block rounded-full "
                     >
                            <LuUser size={28}/>
                        </button>
                    </div>

                </div>

            </nav>







        </div>
    )
}

export default Navbar