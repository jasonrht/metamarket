import { useEthers } from "@usedapp/core";

export const Connect = ({ width }: { width: number }) => {
    const { account, activateBrowserWallet, deactivate } = useEthers()

    return (
        <>
            {account ?
                <button className='w-full mt-2 sm:mt-0 sm:w-[5rem] h-[3rem] my-auto bg-white rounded-md p-2 shadow-lg border-2 border-black transition-all duration-100 ease-in-out hover:scale-[1.01] hover:shadow-2xl hover:text-amber-300' onClick={deactivate}>
                    Logout
                </button> :
                <button className='w-full mt-2 sm:mt-0 sm:w-[5rem] h-[3rem] my-auto bg-white rounded-md p-2 shadow-lg border-2 border-black transition-all duration-100 ease-in-out hover:scale-[1.01] hover:shadow-2xl hover:text-amber-300' onClick={() => activateBrowserWallet()}>
                    Login
                </button>}
        </>
    )
}