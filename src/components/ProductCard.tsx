import { useProductTxn } from '../hooks/useProductTxn'
import { useCoingeckoPrice } from '@usedapp/coingecko'

export const ProductCard = ({ productName, productPrice, productSize, imgSource }
    : { productName: string, productPrice: number, productSize: number, imgSource: string }) => {

    const imageSource = require(`../assets/${imgSource}`)
    const ethPrice = useCoingeckoPrice('ethereum', 'usd')

    const { txn, txnState } = useProductTxn()
    const handlePurchase = () => {
        return txn((productPrice / parseFloat(String(ethPrice))).toString())
    }


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
                className='col-span-2 h-12 bg-amber-600 mb-0 mt-auto rounded-full hover:italic'>
                BUY NOW
            </button>
        </div>
    )
}