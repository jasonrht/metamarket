import { ActionButton } from "../components/ActionButton"

const { useQuery } = require('react-query')
const { useState } = require('react')
const { useEthers } = require('@usedapp/core')
const { DeployContract } = require('../functions/DeployContract')
const axios = require('axios')
const LoadingGif = require('../assets/loading.gif')
const keys = require('../assets/keys.json')

export const SellItem = () => {
    const { account } = useEthers()
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState(0)
    const [deploying, setDeploying] = useState(false)
    const [newContractAddress, setNewContractAddress] = useState('')
    const [selectedValue, setSelectedValue] = useState('')

    type Product = {
        _id: string,
        date: Date,
        seller: string,
        price: number,
        buyer: string,
        name: string,
        contractAddress: string,
    }

    const { isLoading, error, data } = useQuery('allProducts', async () => {
        return axios.get(keys.main_server.concat('all-products'))
    })

    const getAllProducts = (productData: Array<any>) => {
        return productData.map((product: Product, index: number) => {
            const rowColor = index % 2 === 1 ? 'bg-zinc-200' : ''
            return (
                <tr key={index} className={`text-center ${rowColor}`}>
                    <td className='font-bold py-2 border-r-2 border-amber-800'>{index + 1}</td>
                    <td key={index * 1000 + index}>{product.name}</td>
                    <td key={index * 1000 + 1 + index}>{product.price}</td>
                    <td key={index * 1000 + 2 + index}>
                        <a
                            href={`https://ropsten.etherscan.io/address/${product.contractAddress}`}
                            target='_blank'
                            className='hover:text-amber-300'>{product.contractAddress}</a>
                    </td>
                    <td key={1003 + 1}>
                        <ActionButton
                            productAddress={product.contractAddress}
                            selectedValue='Approve Return' />
                    </td>
                    <td key={1003 + 1}>
                        <ActionButton
                            productAddress={product.contractAddress}
                            selectedValue='Withdraw' />
                    </td>
                </tr>
            )
        })
    }

    const handleNewItem = async () => {
        setDeploying(true)
        const contract = await DeployContract(productName, productPrice, account)
        const deployedContract = await contract.deployed()
        setDeploying(false)
        setNewContractAddress(deployedContract.address)
        axios.post(keys.main_server.concat('add-new-product'), {
            seller: account,
            price: parseInt(productPrice),
            name: productName,
            contractAddress: deployedContract.address,
        })
    }

    return (
        <div className='w-full h-screen flex mx-auto justify-center'>
            <div className='mr-[5rem]'>
                <p className='text-center'>
                    <a href='/my-purchases' className='hover:text-amber-300'>My items</a>
                    <a href={`https://ropsten.etherscan.io/address/${account}`}
                        className='hover:text-amber-300 ml-2'>
                        ({account})
                    </a>
                </p>
                {isLoading ?
                    <p className='text-center'>Loading...</p>
                    :
                    <table className='w-[45rem] border-2 border-amber-800 shadow-xl mx-auto'>
                        <thead className='bg-amber-600'>
                            <tr className='border-b-2 border-amber-800'>
                                <th className='border-r-2 border-amber-800 px-2'>#</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Address</th>
                                <th>Approve Return</th>
                                <th>Withdraw</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getAllProducts(data.data.filter((product: Product) => product.seller === account))}
                        </tbody>
                    </table>}
                <br /><br />
                {newContractAddress ?
                    <p className=''>Contract for new item deployed to:<br />
                        <a
                            href={`https://ropsten.etherscan.io/address/${newContractAddress}`}
                            target='_blank'
                            className='hover:text-amber-300'>{newContractAddress}</a>
                    </p>
                    : ''}
            </div>
            <div>
                <div className='grid grid-cols-[8rem_12rem] gap-x-8 w-fit h-fit overflow-hidden justify-center bg-zinc-100 p-4 rounded-md border-2 border-amber-800 mx-auto shadow-xl'>
                    <h1 className='col-span-2 text-center font-bold'>Add new item</h1>
                    <label htmlFor='product-photo' className='pt-2'>Product picture: </label>
                    <input type='file' className='my-2'></input>
                    <label htmlFor='product-name' className='pt-2'>Product name: </label>
                    <input
                        type='text'
                        onChange={(e) => setProductName(e.target.value)}
                        className='my-2 border-2 border-amber-800 h-8 p-1 rounded-md'></input>
                    <label htmlFor='product-price' className='pt-2'>Product selling price: </label>
                    <input
                        type='text'
                        onChange={(e) => setProductPrice(e.target.value)}
                        className='my-2 border-2 border-amber-800 w-[5rem] h-8 p-1 rounded-md'></input>
                    <div className='col-span-2 text-center mt-20'>
                        <button
                            onClick={() => handleNewItem()}
                            className='bg-amber-600 p-4 rounded-full w-72 h-16 border-2 border-amber-800 shadow-lg hover:text-amber-300'>
                            {deploying ?
                                <img src={LoadingGif} alt='loading-gif' className='h-16 w-16 mx-auto -translate-y-[25%]'></img>
                                : 'SUBMIT'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}