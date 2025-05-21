
'use client'

import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useApi } from '../composable/useFetchData';
import { MdAccountBalance } from "react-icons/md";
import TextFormInput from '../components/TextFormInput';
import AddNewButton from '../components/AddNewButton';
import { BiSearch } from 'react-icons/bi';
import AddBankModal from '../components/modal/AddBankModal';
import ButtonAction from '../components/ButtonAction';
import { deleteData } from '../composable/useDeleteData';
import { updateData } from '../composable/useUpdateData';


interface Bank {
  _id: string;
  bankName: string;
  bankNumber: string;
  bankTypeId: string;
  amount: number;
  status: number;
  note: string;
  userID: string;
}

function Banks() {
  const [isModal, setIsModal] = useState(false);
  const [dataItem, setDataItem] = useState<Bank | null>(null);
  const [page, setPage] = useState(1);
  const limit = 8;

  const { data, loading, error, refetch } = useApi<{ results: Bank[]; totalPages: number }>(
    `/api/bank?page=${page}&limit=${limit}`
  );

  const handleAddNew = () => {
    setIsModal(true);
    setDataItem(null);
  };

  const handleClose = () => {
    setIsModal(false);
  };


  const handleUpdate = (item: Bank) => {
    setIsModal(true);
    setDataItem(item);
  };

  const handleDelete = async (id: string) => {
    try {
      if (window.confirm("Are you sure you want to delete this item?")) {
        await deleteData(`/api/bank/${id}`);
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

    await updateData(`/api/bank/${item._id}`, data);
    alert("បានកែប្រែស្ថានភាពដោយជោគជ័យ");
    refetch();
  };

  return (
    <div>
      <Navbar />
      <div className='p-4'>

        <div>
          <div className='flex items-center gap-2'>
            <MdAccountBalance className='text-2xl' />
            <h1 className='text-2xl font-bold my-5'>គណនី</h1>
          </div>

          <div className='flex items-center gap-2 justify-between my-3'>
            <div>

              <div className='flex justify-end pr-5 relative'>
                <BiSearch size={24} className=' absolute top-1/2 right-56 transform -translate-y-1/2' />

                <TextFormInput

                  placeholder="ស្វែងរក..."
                />

              </div>
            </div>
            <AddNewButton onPress={handleAddNew} title='បង្កើតថ្មី' />
          </div>

        </div>

        <div className=''>
          <table className="border-collapse border border-gray-400 w-full">
            <thead>
              <tr className='bg-black/80 text-white'>
                <th className="border border-gray-300 p-2">គណនី</th>
                <th className="border border-gray-300 p-2">លេខគណនី</th>
                <th className="border border-gray-300">ប្រភេទគណនី</th>
                <th className="border border-gray-300">ចំនួនទឹកប្រាក់</th>
                <th className="border border-gray-300 w-28 p-2">ស្ថានភាព</th>
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
                data?.results?.map((item: any, index: number) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{item.bankName}</td>
                    <td className="border border-gray-300 p-2">{item.bankNumber}</td>
                    <td className="border border-gray-300 p-2">{item.bankTypeId}</td>
                    <td className="border border-gray-300 p-2">{item.amount}</td>
                    <td className="border border-gray-300 p-2">
                      <div className="flex justify-center">
                        <button
                          onClick={() => updateStatus(item)}
                          className={`text-white text-sm rounded-md px-2 py-1 cursor-pointer ${item.status === 1 ? 'bg-green-600 hover:bg-green-500' : 'bg-red-600 hover:bg-red-500'
                            }`}
                        >
                          {item.status === 1 ? 'ប្រើប្រាស់' : 'មិនប្រើប្រាស់'}
                        </button>
                      </div>
                    </td>
                    
                    <td className="border border-gray-300 p-2">{item.userID}</td>
                    <td className="border border-gray-300 p-2">{item.note}</td>
                    <td className="border border-gray-300 p-2">
                      {new Date(item.createdAt).toLocaleDateString('en-GB')}
                    </td>

                    <td className="border border-gray-300 p-2">
                      <div className="flex gap-2">
                        <ButtonAction variant="primary" onClick={() => handleUpdate(item)}>
                          កែប្រែ
                        </ButtonAction>
                        <ButtonAction variant="default" onClick={() => handleUpdate(item)}>
                          ផ្ទេរលុយ
                        </ButtonAction>
                        <ButtonAction variant="success" onClick={() => handleUpdate(item)}>
                          ដាក់លុយ
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


      {isModal && (
        <AddBankModal handleClose={handleClose} dataItem={dataItem} refetch={refetch} />
      )}
    </div>
  )
}

export default Banks