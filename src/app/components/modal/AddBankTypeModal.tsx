import React, { useEffect, useState } from 'react'
import TextFormInput from '../TextFormInput'
import { RiBankCardLine } from "react-icons/ri";
import { MdNoteAlt } from "react-icons/md";
import TextAreaFormInput from '../TextAreaFormInput';
import SaveButton from '../SaveButton';
import CloseButton from '../CloseButton';
import { createData } from '@/app/composable/useCreateData';
import { updateData } from '@/app/composable/useUpdateData';
import { useApi } from '@/app/composable/useFetchData';


interface DataItem {
  _id: string,
  bankTypeName: string;
  note: string;
}
interface CloseButtonProps {
  handleClose: () => void,
  dataItem: DataItem | null,
  refetch: () => void
}

function AddBankTypeModal({ handleClose, dataItem, refetch }: CloseButtonProps) {

  const [bankTypeName, setBankTypeName] = useState("")
  const [note, setNote] = useState("")
  const [userID, setUserId] = useState<string | null>(null)


  // const { data: bankTypes, useFetchData } = useApi('/api/bankType')

  //retreive data
  useEffect(() => {

    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserId(storedUserName);

    }

    if (dataItem) {
      setBankTypeName(dataItem?.bankTypeName)
      setNote(dataItem?.note)
    }


  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {

      const data = {
        bankTypeName,
        note,
        userID
      }

      if (!dataItem) {
        await createData('/api/bankType', data)
        alert("បានបង្កើតដោយជោគជ័យ")
        // await useFetchData();\
        await refetch()
        handleClear();
        handleClose();

      }
      else {
        await updateData(`/api/bankType/${dataItem?._id}`, data)
        alert("បានកែប្រែដោយជោគជ័យ")
        // await useFetchData();
        await refetch();
        handleClear();
        handleClose();

      }
    }
    catch (err) {
      console.log(err)
    }
  }







  const handleClear = () => {
    setBankTypeName("")
    setNote("")
  }

  return (


    <div className="font-sans bg-gray-100 flex items-center justify-center h-full">
      <div >

        <div className="fixed z-10 inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          <form onSubmit={handleSubmit} className='bg-white z-40 w-[30%] p-4 rounded-md'>

            <div className=" py-4">
              <h3 className="text-lg font-bold text-gray-900"> + បង្កើតប្រភេទគណនី </h3>
            </div>
            <div className='space-y-4'>
              <div className='relative'>
                <RiBankCardLine size={24} className='absolute top-1/2 left-3 transform -translate-y-1/2' />
                <TextFormInput value={bankTypeName} onChange={(e) => setBankTypeName(e.target.value)} placeholder='ប្រភេទគណនីយ' />
              </div>
              <div className='relative'>
                <MdNoteAlt size={24} className='absolute top-7 left-3 transform -translate-y-1/2' />
                <TextAreaFormInput value={note} onChange={(e) => setNote(e.target.value)} placeholder='កត់ចំណាំ' />
              </div>


            </div>
            <div className="flex justify-end gap-2.5 ">
              <CloseButton onPress={handleClose} title='បិទ' />
              <SaveButton title='រក្សាទុក' />
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default AddBankTypeModal