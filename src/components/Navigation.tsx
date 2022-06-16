import MetaMarketLogo from '../assets/MetaMarketLogo.png'
import { Connect } from './Connect'

export const Navigation = () => {
    return (
        <div className='w-full h-20 bg-amber-600 border-b-2 border-amber-800'>
            <ul className='flex flex-row py-6 mx-4 h-20'>
                <li>
                    <a href='/'>
                        <img
                            src={MetaMarketLogo}
                            alt='mm-logo'
                            className='w-16 h-16 mr-6 rounded-full -translate-y-4 border-2 border-amber-800 transform transition-all duration-300 hover:rotate-[360deg]'></img>
                    </a>
                </li>
                <li className='mx-2 border-r-2 border-black pr-4 pt-1'>Browse</li>
                <li className='mx-2 pt-1'>About</li>
                <li className='flex flex-row'>
                    <input
                        type='text'
                        placeholder='Search for an item'
                        className='italic w-full px-2 border-2 border-amber-800 rounded-md focus:outline-none'></input>
                    <button className='w-fit px-2 bg-amber-700 -translate-x-3/4 border-2 border-amber-800 rounded-md'>Search</button>
                </li>
                <li className='flex flex-row ml-auto -translate-y-[20%]'>
                    <li className='ml-auto mr-4 pt-3 hover:opacity-60'>
                        <a href='/sell-item'>Sell</a>
                    </li>
                    <Connect />
                </li>
            </ul>
        </div>
    )
}