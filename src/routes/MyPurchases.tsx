import axios from "axios"
import { useQuery } from 'react-query'
import { useEthers } from '@usedapp/core'
import { useState } from 'react'
import { ActionButton } from "../components/ActionButton"
import keys from '../assets/keys.json'

export const MyPurchases = () => {
    type Product = {
        _id: string,
        date: Date,
        seller: string,
        price: number,
        buyer: string,
        name: string,
        contractAddress: string,
    }
    const [selectedValue, setSelectedValue] = useState('Select Action')

    const { account } = useEthers()

    const { isLoading, error, data } = useQuery('allProducts', async () => {
        return axios.get(keys.main_server.concat('all-products'))
    })



    const myProducts = data?.data.filter((product: Product) => product.buyer === account)
    const tableRows = (allProducts: Object) => {
        return myProducts.map((product: Product, index: number) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.contractAddress}</td>
                    <td>
                        <ActionButton selectedValue='Approve Reception' productAddress={product.contractAddress} />
                    </td>
                    <td>
                        <ActionButton selectedValue='Withdraw' productAddress={product.contractAddress} />
                    </td>
                </tr>
            )
        })
    }

    if (isLoading) {
        return <p>Fetching data ...</p>
    }

    return (
        <table className='w-full text-center border-2 border-amber-800'>
            <thead>
                <tr className='border-b-2 border-amber-800 bg-amber-600'>
                    <th>#</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Address</th>
                    <th>Approve Reception</th>
                    <th>Withdraw</th>
                </tr>
            </thead>
            <tbody>
                {tableRows(myProducts)}
            </tbody>
        </table>
    )
}