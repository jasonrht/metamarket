import { useContractFunction, useEthers } from '@usedapp/core'
import ProductTradeAbi from '../chain-info/contracts/ProductTrade.json'
import networkMapping from '../chain-info/deployments/map.json'
import { Contract, constants, utils } from 'ethers'
import { useState } from 'react'

export const useProductTxn = () => {
    const { account, chainId } = useEthers()
    const { abi } = ProductTradeAbi

    const _networkMapping: { [key: string]: { [key: string]: any } } = networkMapping

    const productTradeAddress = chainId ? _networkMapping[String(chainId)]['ProductTrade'][0] : constants.AddressZero
    const productTradeInterface = new utils.Interface(abi)
    const productTradeContract = new Contract(productTradeAddress, productTradeInterface)

    const { send: purchaseItem, state: txnState } = useContractFunction(
        productTradeContract,
        'buyProduct',
        { transactionName: 'Purchase item' }
    )

    const txn = (amount: string) => {
        purchaseItem({ value: utils.parseEther(amount) })
    }

    return { txn, txnState }
}