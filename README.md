# MetaMarket

Welcome to the MetaMarket! This is the first project for which I have written my own Solidity smart contract from scratch. At the MetaMartket, a user can connect to their MetaMask account and put items up for sale. A potential buyer can then purchase the available product on the website.

The idea for this project came from the nature of Solidity to remove middlemen from certain business processes. 

## The buying and selling process

When a seller puts an item up for sale, a new smart contract is initiated which acts as a vault. A buyer can then send ether to the contract to purchase the item, the sent ether is now locked inside of the smart contract. As the seller sees that the right amount of ether is sent to the contract, he ships the product to the buyer. The seller cannot withdraw the smart contract funds until the buyer approves the reception of the product. 

If the buyer decides that he is not content with the product and wants to send it back, they can start the return process. The buyer cannot withdraw his ether until the seller approves the correct return of the product.

## Pitfalls

This transaction process is NOT waterproof. Bad actors can finds ways to exploit it. However, I created this project just to gain some experience in writing smart contracts and integrating them within a user interface..
