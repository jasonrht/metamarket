import { useContractFunction, useEthers } from '@usedapp/core'
import ProductTradeAbi from '../chain-info/contracts/ProductTrade.json'
import networkMapping from '../chain-info/deployments/map.json'
import { Contract, constants, utils, ethers } from 'ethers'
import keys from './keys.json'

export const useProductTxn = (productTradeAddress: string) => {
    const { abi } = ProductTradeAbi
    const provider = new ethers.providers.InfuraProvider('ropsten')
    const wallet = ethers.Wallet.fromMnemonic(keys.wallet_secret)
    const signer = wallet.connect(provider)
    const productTradeInterface = new utils.Interface(abi)
    const productTradeContract = new Contract(productTradeAddress, productTradeInterface, signer)

    const { send: purchaseItem, state: txnState } = useContractFunction(
        productTradeContract,
        'buyProduct',
        { transactionName: 'Purchase item' }
    )

    const txn = (amount: string, account: string) => {
        purchaseItem({ value: utils.parseEther(amount) }).then((result) => {
            console.log(result)
            console.log('Item purchased !')
        })
        return Promise.resolve(true)
    }

    const { send: startReturn, state: returnState } = useContractFunction(
        productTradeContract,
        'startReturn',
        { transactionName: 'Start return' }
    )

    const returnInit = () => {
        startReturn().then((result) => {
            console.log(result)
            console.log('Return process started !')
        })
        return Promise.resolve(true)
    }

    const { send: approveReturn, state: approveReturnState } = useContractFunction(
        productTradeContract,
        'approveReturn',
        { transactionName: 'Approve return' }
    )

    const returnApproval = () => {
        approveReturn().then((result) => {
            console.log(result)
            console.log('Return approved !')
        })
        return Promise.resolve(true)
    }

    const { send: approveReception, state: approveReceptionState } = useContractFunction(
        productTradeContract,
        'approveReception',
        { transactionName: 'Approve reception' }
    )

    const receptionApproval = () => {
        approveReception().then((result) => {
            console.log(result)
            console.log('Reception approved !')
        })
        return Promise.resolve(true)
    }

    const { send: withdrawFunds, state: withdrawState } = useContractFunction(
        productTradeContract,
        'withdraw',
        { transactionName: 'Withdraw smart contract funds' }
    )

    const fundsWithdrawal = () => {
        withdrawFunds().then((result) => {
            console.log(result)
            console.log('Withdraw success !')
        })
        return Promise.resolve(true)
    }

    const { send: getTxnStatus, state: txnStatusState } = useContractFunction(
        productTradeContract,
        'getState',
        { transactionName: 'Get the current transaction state of the contract' }
    )

    const getStatus = () => {
        getTxnStatus().then((result) => {
            console.log(result)
            console.log('Fetched current contract status !')
        })
        return Promise.resolve(true)
    }

    return {
        txn,
        txnState,
        returnInit,
        returnState,
        returnApproval,
        approveReturnState,
        receptionApproval,
        approveReceptionState,
        fundsWithdrawal,
        withdrawState,
        getTxnStatus,
        getStatus
    }
}