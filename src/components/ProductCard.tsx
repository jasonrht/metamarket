import { useProductTxn } from '../hooks/useProductTxn'
import { useCoingeckoPrice } from '@usedapp/coingecko'
import { useEthers } from '@usedapp/core'
import axios from 'axios'
import keys from '../assets/keys.json'
import { useState, useEffect } from 'react'
import LoadingGif from '../assets/loading.gif'
import { Contract, ethers, utils } from 'ethers'
import ProductTradeAbi from '../chain-info/contracts/ProductTrade.json'
import keys2 from '../hooks/keys.json'

export const ProductCard = ({ contractAddress, productName, productPrice, productSize, imgSource }
    : { contractAddress: string, productName: string, productPrice: number, productSize: number, imgSource: string }) => {

    const { account } = useEthers()
    const imageSource = require(`../assets/${imgSource}`)
    const ethPrice = useCoingeckoPrice('ethereum', 'usd')
    const [buying, setBuying] = useState(false)
    const [contractStatus, setContractStatus] = useState(0)

    const { abi } = ProductTradeAbi
    const productTradeInterface = new utils.Interface(abi)
    const provider = new ethers.providers.InfuraProvider('ropsten')
    const wallet = ethers.Wallet.fromMnemonic(keys2.wallet_secret)
    const signer = wallet.connect(provider)
    const contract = new Contract(contractAddress, productTradeInterface, signer)

    const { txn, txnState, getStatus } = useProductTxn(contractAddress)
    const handlePurchase = async () => {
        setBuying(true)
        await axios.post(keys.main_server.concat('change-buyer'), {
            name: productName,
            buyer: account
        })
        setBuying(false)
        return txn((productPrice / parseFloat(String(ethPrice))).toString(), String(account))
    }

    useEffect(() => {
        const getState = async () => {
            const status = await contract.txn_state()
            console.log(status)
            setContractStatus(status)
        }
        getState()
    }, [buying])

    return (
        <div className='grid grid-cols-2 w-[15rem] h-[22rem] p-4 bg-amber-300 rounded-md shadow-lg border-4 border-amber-800'>
            <img
                src={imageSource}
                alt={`${productName}`}
                className='col-span-2 w-full h-full rounded-md border-amber-600 border-2'></img>
            <p className='col-span-2 text-center text-xl italic font-bold pt-2 underline'>{productName}</p>
            <table className='w-[12.5rem] mx-auto'>
                <thead>
                    <tr>
                        <th className='italic font-normal'>Size</th>
                        <th className='italic font-normal'>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <p className='text-center w-[5rem] mx-auto mb-2 bg-white rounded-md border-2 border-amber-600'>{productSize}</p>
                        </td>
                        <td>
                            <p className='text-center w-[5rem] mx-auto mb-2 bg-white rounded-md border-2 border-amber-600'>{productPrice}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button
                onClick={() => handlePurchase()}
                className={`${contractStatus !== 0 ? 'italic bg-red-500 ' : 'bg-amber-600 '}col-span-2 h-12 mb-0 mt-auto border-2 border-amber-800 rounded-full hover:italic`}
                disabled={contractStatus !== 0}>
                {contractStatus === 0 && !buying ? 'BUY NOW' : 'SOLD'}
                {buying ? <img src={LoadingGif} alt='loading-gif' className='h-10 w-10'></img> : ''}
            </button>
        </div>
    )
}