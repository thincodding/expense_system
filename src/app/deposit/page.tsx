
'use client'

import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useApi } from '../composable/useFetchData';
import TextFormInput from '../components/TextFormInput';
import AddNewButton from '../components/AddNewButton';
import { BiSearch } from 'react-icons/bi';
import ButtonAction from '../components/ButtonAction';
import { deleteData } from '../composable/useDeleteData';
import { updateData } from '../composable/useUpdateData';
import { FaMoneyBillTrendUp } from 'react-icons/fa6';
import AddDepositModal from '../components/modal/AddDepositModal';
import Pagination from '../components/Pagination';
import ViewDepositModal from '../components/modal/ViewDepositModal';

//   {
//             "_id": "682d9fa8b0ca6d5e80a950a9",
//             "bank_id": "682bfa1e67f52d1f3a97cd99",
//             "amount": 100,
//             "currency_id": "USD",
//             "note": "New deposit for May",
//             "userID": "user123",
//             "createdAt": "2025-05-21T09:40:56.087Z",
//             "updatedAt": "2025-05-21T09:40:56.087Z",
//             "__v": 0
//         },


interface Deposit {
    _id: string;
    bank_id: string;
    amount: number;
    currency_id: string;
    note: string;
    userID: string;
    createdAt: string;

}


function Deposit() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModal, setIsModal] = useState(false);
    const [isViewModal, setIsViewModal] = useState(false);

    const [dataItem, setDataItem] = useState<Deposit | null>(null);
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data, loading, error, refetch } = useApi<{ results: Deposit[]; totalPages: number }>(
        `/api/deposit?page=${page}&limit=${limit}`
    );


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


    const handleUpdate = (item: Deposit) => {
        setIsModal(true);
        setDataItem(item);
    };

    const handleDelete = async (id: string) => {
        try {
            if (window.confirm("តើអ្នកចង់លុបមែនទេ?")) {
                await deleteData(`/api/deposit/${id}`);
                alert("បានលុបដោយជោគជ័យ!");
                refetch();
            }
        }
        catch (err) {
            console.error("Delete failed", err);
        }
    }
    const updateStatus = async (item: any) => {
        const newStatus = item.status === 1 ? 0 : 1;

        const data = {
            status: newStatus,
        };

        await updateData(`/api/deposit/${item._id}`, data);
        alert("បានកែប្រែស្ថានភាពដោយជោគជ័យ");
        refetch();
    };


    const filtered = data?.results.filter((item) =>
        item.note.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];


    //handle view modal


    const handleViewModalDepositDetails = () => {
        setIsViewModal(true);
    }

    const handleCloseViewDeposit = () => {
        setIsViewModal(false);
    }
    return (
        <div>
            <Navbar />
            <div className='p-4'>

                <div>
                    <div className='flex items-center gap-2'>
                        <FaMoneyBillTrendUp className='text-2xl' />
                        <h1 className='text-2xl font-bold my-5'>ដាក់លុយចូលគណនី</h1>
                    </div>

                    <div className='flex items-center gap-2 justify-between my-3'>
                        <div>

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
                        </div>
                        <AddNewButton onPress={handleAddNew} title='ដាក់លុយចូល' />
                    </div>

                </div>

                <div className=''>
                    <table className="border-collapse border border-gray-400 w-full">
                        <thead>
                            <tr className='bg-black/80 text-white'>
                                <th className="border border-gray-300 p-2">កូដគណនី</th>
                                <th className="border border-gray-300 p-2">ចំនួនទឹកប្រាក់</th>
                                <th className="border border-gray-300">រូបិយប័ណ្ណ</th>
                                <th className="border border-gray-300 ">អ្នកប្រើប្រាស់</th>
                                <th className="border border-gray-300 ">កត់ចំណាំ</th>
                                <th className="border border-gray-300 p-2">កាលបរិច្ឆេត</th>
                                <th className="border border-gray-300">កំណត់</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={9} className="border border-gray-300 p-2 text-center">
                                        សូមរងចាំ...
                                    </td>
                                </tr>
                            ) : (
                                filtered?.map((item: any, index: number) => (
                                    <tr key={index}>
                                        <td className="border border-gray-300 p-2">
                                            <p onClick={handleViewModalDepositDetails} className='text-red-600 underline cursor-pointer hover:text-red-400'>{item.bank_id}</p>
                                        </td>

                                        <td className="border border-gray-300 p-2 font-bold">{item.amount}</td>
                                        <td className="border border-gray-300 p-2 font-bold">{item.currency_id}</td>


                                        <td className="border border-gray-300 p-2">{item.userID}</td>
                                        <td className="border border-gray-300 p-2">{item.note}</td>
                                        <td className="border border-gray-300 p-2">
                                            {new Date(item.createdAt).toLocaleDateString('en-GB')}
                                        </td>

                                        <td className="border border-gray-300 p-2">
                                            <div className="flex gap-2">
                                                <ButtonAction variant="primary" onClick={handleViewModalDepositDetails}>
                                                    មើល
                                                </ButtonAction>
                                                <ButtonAction variant="danger" onClick={() => handleDelete(item._id)}>
                                                    លុប
                                                </ButtonAction>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>


                    </table>
                </div>
            </div>
            <div className='flex justify-end'>
                <Pagination currentPage={page} totalPages={data?.totalPages || 1} onPageChange={handlePageChange} />
            </div>

            {isModal && (
                <AddDepositModal handleClose={handleClose} refetch={refetch} />
            )}

            {isViewModal && (
                <ViewDepositModal handleCloseViewDeposit={handleCloseViewDeposit}/>
            )}
        </div>
    )
}

export default Deposit