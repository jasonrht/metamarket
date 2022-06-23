import { useEthers } from '@usedapp/core'
import { ethers } from 'ethers'
import metadata from '../assets/ProductTradeAbi.json'
import ProductTradeJSON from '../assets/ProductTrade.json'

export const DeployContract = async (productName: string, productPrice: number, sellerAddress: string) => {
    const bytecode = ProductTradeJSON
    const abi = metadata
    const provider = new ethers.providers.InfuraProvider('ropsten')

    // !!! REMEMBER TO REMOVE HARDCODED PRIVATE KEY !!!
    const signer = new ethers.Wallet('0xa5400dddc698e89fea6bb71b4e9e7a3ddc219240a73d79e167a2b44454ac9ed1', provider)

    const contractFactory = new ethers.ContractFactory(abi, bytecode, signer)
    const contract = await contractFactory.deploy(
        productName,
        productPrice,
        sellerAddress
    )
    return contract
}