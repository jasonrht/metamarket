import { FeaturedProducts } from "../components/FeaturedProducts"
import { useEthers } from '@usedapp/core'
import { useState, useEffect } from 'react'

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export const Home = () => {
    const { account } = useEthers()
    const [toggle, setToggle] = useState(false)
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const loggedInUser = windowDimensions.width <= 400 && account ? account.split('').slice(0, 10).join('').concat('...') : account
    return (
        <div>
            {account ?
                <h1 className='text-center text-3xl mb-4 max-w-screen'>Welcome {loggedInUser} !</h1>
                : <h1 className='text-center text-3xl mb-4'>Welcome !</h1>}
            <FeaturedProducts />
        </div>
    )
}