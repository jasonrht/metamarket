import { useQuery } from "react-query"
import { ProductCard } from "./ProductCard"
import axios from 'axios'
import keys from '../assets/keys.json'

export const FeaturedProducts = () => {
    const { isLoading, data } = useQuery('allProducts', async () => {
        return axios.get(keys.main_server.concat('all-products'))
    })

    type Product = {
        _id: string,
        date: Date,
        seller: string,
        price: number,
        buyer: string,
        name: string,
        contractAddress: string,
    }

    return (
        <div className='grid justify-center p-2 gap-2 sm:grid-cols-4 w-full h-[25%] bg-aj1-coll bg-cover bg-bottom sm:p-4 rounded-md border-amber-800 border-2 shadow-xl'>
            <h1 className='italic text-2xl sm:col-span-4 mb-2'>Featured Products</h1>
            {isLoading ?
                <p>Fetching products ...</p>
                :
                data?.data.map((product: Product, index: number) => {
                    return (
                        <ProductCard
                            key={index}
                            contractAddress={product.contractAddress}
                            productName={product.name}
                            productPrice={product.price}
                            productSize={42}
                            imgSource='aj1retro.jpg' />
                    )
                })}
        </div>
    )
}