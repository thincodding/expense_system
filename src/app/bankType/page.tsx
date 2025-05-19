'use client'

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import { useApi } from '../composable/useFetchData';  // Assuming this is defined elsewhere
import AddNewButton from '../components/AddNewButton';
import AddBankTypeModal from '../components/modal/AddBankTypeModal';
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteData } from '../composable/useDeleteData';  // Assuming this is defined elsewhere
import { FaEdit } from "react-icons/fa";
import Pagination from '../components/Pagination';
import TextFormInput from '../components/TextFormInput';
import { BiSearch } from 'react-icons/bi';

export interface BankType {
    _id: string;
    bankTypeName: string;
    note: string;
    userID: string;
    createdAt: string;
    updatedAt?: string;
}

function BankType() {
    const [isModal, setIsModal] = useState(false);
    const [dataItem, setDataItem] = useState<BankType | null>(null);

    const [page, setPage] = useState(1);
    const limit = 8;
    const [searchTerm, setSearchTerm] = useState('');

    // Use `useApi` to fetch bank type data
    const { data, loading, error, refetch } = useApi<{ results: BankType[]; totalPages: number }>(
        `/api/bankType?page=${page}&limit=${limit}`
    );
    // const { data, loading, error, refetch } = useApi<{ results: BankType[], totalPages: number }>(
    //     `/api/bankType?page=${page}&limit=${limit}&search=${encodeURIComponent(searchTerm)}`
    // );

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleAddNew = () => {
        setIsModal(true);
        setDataItem(null);
    };

    const handleClose = () => {
        setIsModal(false);
    };

    const handleDelete = async (id: string) => {
        try {
            if (window.confirm("Are you sure you want to delete this item?")) {
                await deleteData(`/api/bankType/${id}`);
                alert("បានលុបដោយជោគជ័យ!");
                refetch();
            }
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    const handleUpdate = (item: BankType) => {
        setIsModal(true);
        setDataItem(item);
    };

    //handle search
    // const handleFilterSearch = () => {
    //     return data?.results.filter((item) => item.bankTypeName.toLowerCase().includes(searchTerm.toLowerCase()));
    // }

    const filtered = data?.results.filter((item) =>
        item.bankTypeName.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];


    return (
        <div>
            <Navbar />
            <div className="p-4 mt-5 flex justify-end  ">
                <AddNewButton onPress={handleAddNew} title="បន្ថែមថ្មី" />
            </div>


            <div className='flex justify-end pr-5 relative'>
                <BiSearch size={24} className=' absolute top-1/2 right-56 transform -translate-y-1/2' />

                <TextFormInput
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setPage(1);
                    }}
                    placeholder="ស្វែងរក..."
                />

            </div>

            <div className="flex flex-col">
                <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <thead className="bg-white border-b border-b-gray-400">
                                    <tr>
                                        <th className="text-sm text-gray-900 px-6 py-4 text-left">ឈ្មោះគណនី</th>
                                        <th className="text-sm text-gray-900 px-6 py-4 text-left">កត់ចំណាំ</th>
                                        <th className="text-sm text-gray-900 px-6 py-4 text-left">អ្នកប្រើប្រាស់</th>
                                        <th className="text-sm text-gray-900 px-6 py-4 text-left">ការកំណត់</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered?.map((item) => (
                                        <tr key={item._id} className="bg-white border-b border-b-gray-300">
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
                                                <div onClick={() => handleDelete(item._id)} className="cursor-pointer hover:text-red-500">
                                                    <RiDeleteBin6Line size={20} />
                                                </div>
                                                <div onClick={() => handleUpdate(item)} className="cursor-pointer hover:text-blue-500">
                                                    <FaEdit size={20} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


            <div className='flex justify-end'>
                <Pagination currentPage={page} totalPages={data?.totalPages || 1} onPageChange={handlePageChange} />
            </div>


            {isModal && (
                <AddBankTypeModal handleClose={handleClose} dataItem={dataItem} refetch={refetch} />
            )}
        </div>
    );
}

export default BankType;
