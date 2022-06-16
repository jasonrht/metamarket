import { ProductCard } from "./ProductCard"

export const FeaturedProducts = () => {
    return (
        <div className='grid justify-center p-2 gap-2 sm:grid-cols-4 w-full h-[25%] bg-zinc-100 sm:p-4 rounded-md border-amber-800 border-2 shadow-xl'>
            <h1 className='italic text-2xl sm:col-span-4 mb-2'>Featured Products</h1>
            <ProductCard
                productName='Product I'
                productPrice={100}
                productSize={42}
                imgSource='aj1retro.jpg' />
            <ProductCard
                productName='Product I'
                productPrice={100}
                productSize={42}
                imgSource='aj1retro.jpg' />
            <ProductCard
                productName='Product I'
                productPrice={100}
                productSize={42}
                imgSource='aj1retro.jpg' />
            <ProductCard
                productName='Product I'
                productPrice={100}
                productSize={42}
                imgSource='aj1retro.jpg' />
        </div>
    )
}