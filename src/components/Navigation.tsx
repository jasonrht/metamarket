import MetaMarketLogo from '../assets/MetaMarketLogo.png'
import { Connect } from './Connect'
import { useEthers } from '@usedapp/core'
import { useState, useEffect } from 'react'

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export const Navigation = () => {
    const [toggle, setToggle] = useState(false)
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const { account } = useEthers()

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!toggle && windowDimensions.width <= 400) {
        return (
            <div className='flex justify-between w-full h-20 bg-amber-600 border-b-2 border-amber-800'>
                <a href='/'>
                    <img
                        src={MetaMarketLogo}
                        alt='mm-logo'
                        className='w-16 h-16 sm:mr-6 rounded-full translate-y-2 mr-auto ml-2 sm:-translate-y-4 border-2 border-amber-800 transform transition-all duration-300 hover:rotate-[360deg]'></img>
                </a>
                <p className='absolute top-4 text-center text-3xl text-amber-900 w-full block underline underline-offset-4 sm:hidden'>MetaMarket</p>
                <button className='mr-4 mt-4 mb-auto z-20' onClick={() => setToggle(!toggle)}>
                    <div className='w-10 h-1 bg-amber-800 mt-2'></div>
                    <div className='w-10 h-1 bg-amber-800 mt-2'></div>
                    <div className='w-10 h-1 bg-amber-800 mt-2'></div>
                </button>
            </div>
        )
    }

    const buttonDisabled = !(windowDimensions.width <= 400)
    const navHeight = account ? '18.5rem' : '15rem'

    return (
        <div className={`w-full h-[${navHeight}] sm:h-20 bg-amber-600 border-b-2 border-amber-800`}>
            <button className='sm:hidden absolute top-6 right-4 w-10 h-10 z-20 border-2 border-amber-800 rounded-md bg-white' onClick={() => setToggle(!toggle)} disabled={buttonDisabled}>
                <div className='text-amber-800 font-extrabold text-4xl h-2 -translate-y-1'>{windowDimensions.width <= 400 ? '^' : ''}</div>
                <div className='text-amber-800 font-extrabold text-4xl h-2 -translate-y-1'>{windowDimensions.width <= 400 ? '^' : ''}</div>
                <div className='text-amber-800 font-extrabold text-4xl h-2 -translate-y-1'>{windowDimensions.width <= 400 ? '^' : ''}</div>
            </button>
            <ul className='flex flex-col sm:flex-row py-6 mx-4 h-20'>
                <li className='flex flex-row border-b-2 border-amber-800 mb-2 sm:border-0'>
                    <a href='/'>
                        <img
                            src={MetaMarketLogo}
                            alt='mm-logo'
                            className='w-16 h-16 mr-6 rounded-full -translate-y-4 border-2 border-amber-800 transform transition-all duration-300 hover:rotate-[360deg]'></img>
                    </a>
                    <p className='absolute top-8 text-center text-xl w-full block sm:hidden'>MetaMarket</p>
                </li>
                <li className='sm:mx-2 sm:border-r-2 border-black pr-4 pt-1'>Browse</li>
                <li className='mt-1 sm:mt-0 sm:mx-2 pt-1'>About</li>
                <li className='hidden sm:flex sm:flex-row'>
                    <input
                        type='text'
                        placeholder='Search for an item'
                        className='italic w-full px-2 border-2 border-amber-800 rounded-md focus:outline-none'></input>
                    <button className='w-fit px-2 bg-amber-700 -translate-x-3/4 border-2 border-amber-800 rounded-md hover:text-amber-300'>Search</button>
                </li>
                <li className='flex flex-col sm:flex-row sm:ml-auto sm:-translate-y-[20%]'>
                    {account ? <a href='/sell-item' className='-mt-1 sm:mt-0 sm:ml-auto mr-4 pt-3 hover:text-amber-300'>Sell</a> : ''}
                    {account ? <a href='/my-purchases' className='-mt-1 sm:mt-0 sm:ml-auto mr-4 pt-3 hover:text-amber-300'>My purchases</a> : ''}
                    <Connect width={windowDimensions.width} />
                </li>
            </ul>
        </div>
    )
}