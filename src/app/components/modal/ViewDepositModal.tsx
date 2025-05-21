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



interface CloseButtonProps {
    handleCloseViewDeposit: () => void,

}

function ViewDepositModal({ handleCloseViewDeposit }: CloseButtonProps) {


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



    }, []);




    const handleClear = () => {

        setNote("")
    }

    return (

        <div>
            <div className="font-sans bg-gray-100 flex items-center justify-center h-full">
                <div >

                    <div className="fixed z-10 inset-0 flex items-center justify-center">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        <form  className='bg-white z-40 w-[30%] p-4 rounded-md'>

                            <div className=" py-4">
                                <h3 className="text-lg font-bold text-gray-900"> + មើលគណនីដាក់លុយចូល </h3>
                            </div>
                            <div className='space-y-4'>



                            </div>
                            <div className="flex justify-end gap-2.5 ">
                                <CloseButton onPress={handleCloseViewDeposit} title='បិទការមើល' />
                               
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default ViewDepositModal