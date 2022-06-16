import { useEthers } from "@usedapp/core";

export const Connect = () => {
    const { account, activateBrowserWallet, deactivate } = useEthers()

    return (
        <>
            {account ?
                <button className='w-[5rem] h-[3rem] my-auto bg-white rounded-md p-2 shadow-lg border-2 border-black transition duration-100 ease-in-out hover:scale-[1.01] hover:shadow-2xl' onClick={deactivate}>
                    Logout
                </button> :
                <button className='w-[5rem] h-[3rem] my-auto bg-white rounded-md p-2 shadow-lg border-2 border-black transition duration-100 ease-in-out hover:scale-[1.01] hover:shadow-2xl' onClick={() => activateBrowserWallet()}>
                    Login
                </button>}
        </>
    )
}