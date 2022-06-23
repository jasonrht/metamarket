import { useProductTxn } from "../hooks/useProductTxn"
import { useState } from 'react'
import LoadingGif from '../assets/loading.gif'

export const ActionButton = ({ productAddress, selectedValue }: { productAddress: string, selectedValue: string }) => {
    const { returnApproval, receptionApproval, returnInit, fundsWithdrawal } = useProductTxn(productAddress)
    const [loading, setLoading] = useState(false)
    const handleAction = () => {
        console.log(selectedValue)
        if (selectedValue === 'Approve Reception') {
            setLoading(true)
            receptionApproval().then(() => setLoading(false))
        } else if (selectedValue === 'Approve Return') {
            setLoading(true)
            returnApproval().then(() => setLoading(false))
        } else if (selectedValue === 'Start Return') {
            setLoading(true)
            returnInit().then(() => setLoading(false))
        } else if (selectedValue === 'Withdraw') {
            setLoading(true)
            fundsWithdrawal().then(() => setLoading(false))
        }
    }

    return (
        <button
            onClick={() => handleAction()}
            className='bg-amber-600 rounded-full px-2 py-1 border-2 border-amber-800 shadow-lg hover:text-amber-300'>
            {selectedValue === 'Start Return' && !loading ?
                'START'
                : selectedValue === 'Withdraw' && !loading ?
                    'WITHDRAW'
                    : 'APPROVE'}
            {loading ? <img src={LoadingGif} alt='loading-gif'></img> : ''}
        </button>
    )
}