'use client'

import React, { useState,} from 'react';
import { useRouter } from 'next/navigation';

import Button from '../components/Button';
import TextFormInput from '../components/TextFormInput';
import { MdEmail } from "react-icons/md";
import { IoLockClosedSharp } from "react-icons/io5";





function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e: any) => {
    e.preventDefault()

    console.log(email, password)

    router.push('/sidebar')


  }

  return (
    <div className="bg-gray-50 h-screen overflow-hidden flex items-center justify-center">


      <div className="bg-white shadow relative lg:w-5/12 md:w-6/12 w-10/12 p-8 md:p-12">
        <div className="bg-gray-800 absolute -top-10 left-1/2 transform -translate-x-1/2 rounded-full p-4 md:p-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-user-lock-icon text-white"
          >
            <circle cx="10" cy="7" r="4" />
            <path d="M10.3 15H7a4 4 0 0 0-4 4v2" />
            <path d="M15 15.5V14a2 2 0 0 1 4 0v1.5" />
            <rect width="8" height="5" x="13" y="16" rx=".899" />
          </svg>
        </div>

        <form onSubmit={handleLogin} className="pt-16 space-y-6">
          <div className="relative">
            <MdEmail size={24} className=' absolute top-1/2 left-3 transform -translate-y-1/2' />

            <TextFormInput
              type="email"
              placeholder="អុីម៉ែល"

              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='relative'>
            <IoLockClosedSharp size={24} className=' absolute top-1/2 left-3 transform -translate-y-1/2' />

            <TextFormInput
              type="password"
              placeholder="លេខសម្ងាត់"

              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button title="ចូលប្រើប្រាស់" />
        </form>
      </div>
    </div>
  );
}

export default Login;
