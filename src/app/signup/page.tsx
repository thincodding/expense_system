'use client'

import React, { useState } from 'react';
import Button from '../components/Button';
import TextFormInput from '../components/TextFormInput';
import { FaUserPlus } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoLockClosedSharp } from "react-icons/io5";
import SelectFormInput from '../components/SelectFormInput';
import { RiAdminFill } from "react-icons/ri";



function SignUp() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [selectedValue, setSelectedValue] = useState("")

    const handleLogin = async (e: any) => {
        e.preventDefault()

        console.log(email, password)
    }

    return (
        <div className="bg-gray-50 h-screen overflow-hidden flex items-center justify-center">


            <div className="bg-white shadow relative lg:w-5/12 md:w-6/12 w-10/12 p-8 md:p-12">
                <div className="bg-gray-800 absolute -top-10 left-1/2 transform -translate-x-1/2 rounded-full p-4 md:p-8">
                    <FaUserPlus size={32} color='white' />
                </div>

                <form onSubmit={handleLogin} className="pt-16 space-y-6">
                    <div className="relative">
                        <FaUser size={24} className=' absolute top-1/2 left-3 transform -translate-y-1/2' />
                        <TextFormInput
                            type="text"
                            placeholder="អ្នកប្រើប្រាស់"

                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
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
                    <RiAdminFill size={24} className=' absolute top-1/2 left-3 transform -translate-y-1/2' />

                        <SelectFormInput
                            value={selectedValue}
                            onChange={(e) => setSelectedValue(e.target.value)}
                            options={[
                                { value: 'admin', label: 'Admin' },
                                { value: 'user', label: 'User' },
                            ]}
                            placeholder="--ជ្រើសរើស--"
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

                    <div className='relative'>
                        <IoLockClosedSharp size={24} className=' absolute top-1/2 left-3 transform -translate-y-1/2' />

                        <TextFormInput
                            type="password"
                            placeholder="បញ្ជាក់ពាក្យសម្ងាត់"

                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>


                    <Button title="បង្កើតអ្នកប្រើប្រាស់" />
                </form>
            </div>
        </div>
    );
}

export default SignUp;
