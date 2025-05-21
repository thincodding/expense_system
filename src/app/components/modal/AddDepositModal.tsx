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
import SelectFormInput from '../SelectFormInput';
import { FaMoneyBill1Wave } from 'react-icons/fa6';
import { CiBank } from 'react-icons/ci';
import { BsFillCreditCardFill } from 'react-icons/bs';
import { getSelectDataApi } from '@/app/composable/getSellectData';
import SelectDropdownData from '../SelectDropdownData';

// interface DataItem {
//     _id: string
//     bankName: string
//     bankNumber: string

//     amount: number
//     status: number
//     note: string
//     userID: string
// }


interface CloseButtonProps {
    handleClose: () => void,

    refetch: () => void
}

function AddDepositModal({ handleClose, refetch }: CloseButtonProps) {


    const [bankNumber, setBankNumber] = useState("")

    const [amount, setAmount] = useState<number>(0)
    const [currency, setCurrency] = useState("")
    const [note, setNote] = useState("")
    const [userID, setUserId] = useState<string | null>(null)

    const { data: bankTypes } = getSelectDataApi('/api/bank')


    // const { data: bankTypes, useFetchData } = useApi('/api/bankType')

    //retreive data
    useEffect(() => {

        const storedUserName = localStorage.getItem("userName");
        if (storedUserName) {
            setUserId(storedUserName);

        }

        // if (dataItem) {

        //     setBankNumber(dataItem?.bankNumber)

        //     setAmount(dataItem?.amount)

        //     setNote(dataItem?.note)
        // }


    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const data = {
                bankNumber,
                amount,
                note,
                currency_id: currency,
                userID,
            };

            await createData('/api/deposit', data);

            alert(`បានដាក់លុយចូលគណនី ${bankNumber} ដោយជោគជ័យ`);
            await refetch();
            handleClear();
            handleClose();
        } catch (err: any) {
            const message =
                err?.response?.data?.error || err?.message || 'មានបញ្ហាមួយកើតឡើង!';
            console.error('Deposit Error:', message);
            alert(message);
        }
    };




    const handleClear = () => {

        setNote("")
    }

    return (

        <div>
            <div className="font-sans bg-gray-100 flex items-center justify-center h-full">
                <div >

                    <div className="fixed z-10 inset-0 flex items-center justify-center">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        <form onSubmit={handleSubmit} className='bg-white z-40 w-[30%] p-4 rounded-md'>

                            <div className=" py-4">
                                <h3 className="text-lg font-bold text-gray-900"> + ដាក់លុយចូលគណនី </h3>
                            </div>
                            <div className='space-y-4'>



                                <div className='relative'>
                                    <RiBankCardLine size={24} className='absolute top-1/2 left-3 transform -translate-y-1/2' />


                                    <SelectDropdownData
                                        options={bankTypes?.results || []}
                                        valueKey="bankNumber"
                                        labelKey="bankName"
                                        secondKey='bankNumber'
                                        name="bankType"
                                        value={bankNumber}
                                        onChange={(e) => setBankNumber(e.target.value)}
                                        placeholder="--ជ្រើសរើសគណនី--"
                                    />

                                </div>



                                <div className='relative'>
                                    <FaMoneyBill1Wave size={24} className='absolute top-1/2 left-3 transform -translate-y-1/2' />
                                    <TextFormInput
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(Number(e.target.value))}
                                        placeholder="ចំនួនទឹកប្រាក់"
                                    />
                                </div>

                                <div className='relative'>
                                    <BsFillCreditCardFill size={24} className='absolute top-1/2 left-3 transform -translate-y-1/2' />
                                    <TextFormInput value={currency} onChange={(e) => setCurrency(e.target.value)} placeholder='រូប​បិយប័ណ្ណ' />
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


        </div>
    )
}

export default AddDepositModal