'use client'

import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Button from '../components/Button'
import { useApi } from '../composable/useFetchData'
import AddNewButton from '../components/AddNewButton'
import AddBankTypeModal from '../components/modal/AddBankTypeModal'
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteData } from '../composable/useDeleteData'
import { FaEdit } from "react-icons/fa";

function BankType() {

    const { data: bankTypes } = useApi('/api/bankType')

    const [isModal, setIsModal] = useState(false)
    const [dataItem, setDataItem] = useState(null)

    const handleAddNew = () => {
        setIsModal(true)
        setDataItem(null)
    }

    const handleClose = () => {
        setIsModal(false)
    }

    const handleDelete = async(id: string)=> {
        try{
            if(window.confirm("Are you sure want to delete?")){
                
                await deleteData(`/api/bankType/${id}`)
                alert("បានលុបដោយជោគជ័យ")
            }
        }
        catch(err){
            console.log(err)
        }
    }


    const handleUpdate = async(item: any)=> {
        setIsModal(true)
        // console.log(item)
        setDataItem(item)
    }


    return (
        <div className=''>
            <Navbar />
            <div>
                <div className=' w-full flex justify-end p-4 mt-5'>
                    <div className='flex w-40'>
                        <AddNewButton onPress={handleAddNew} title='បន្ថែមថ្មី' />
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full">
                                    <thead className="bg-white border-b border-b-gray-400">
                                        <tr>

                                            <th scope="col" className="text-sm  text-gray-900 px-6 py-4 text-left">
                                                ឈ្មោះគណនី
                                            </th>

                                            <th scope="col" className="text-sm  text-gray-900 px-6 py-4 text-left">
                                                កត់ចំណាំ
                                            </th>
                                            <th scope="col" className="text-sm  text-gray-900 px-6 py-4 text-left">
                                                អ្នកប្រើប្រាស់
                                            </th>
                                            <th scope="col" className="text-sm  text-gray-900 px-6 py-4 text-left">
                                                កំណត់
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {bankTypes?.bankType?.map((item, index) => {
                                            return (
                                                <tr key={index} className="bg-white border-b border-b-gray-300">

                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {item.bankTypeName}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {item.note}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {item.userID}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        <div onClick={()=>handleDelete(item._id)} className='cursor-pointer hover:text-red-500'>
                                                            <RiDeleteBin6Line size={20}/>
                                                        </div>
                                                        <div onClick={()=>handleUpdate(item)} className='cursor-pointer hover:text-red-500'>
                                                            <FaEdit size={20}/>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isModal && (
                <AddBankTypeModal handleClose={handleClose} dataItem={dataItem} />
            )}
        </div>
    )
}

export default BankType