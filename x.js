/* 
  script to send Txs on the X chain
*/

const avalanche = require("avalanche")

let myNetworkID = 1 //default is 3, we want to override that for our local network
let myBlockchainID = "2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM" // The X-Chain blockchainID on this network
let avax = new avalanche.Avalanche(
  "localhost",
  9650,
  "http",
  myNetworkID,
  myBlockchainID
)

let xchain = avax.XChain(); //returns a reference to the X-Chain used by AvalancheJS
let myAddresses = xchain.keyChain().getAddresses(); //returns an array of addresses the KeyChain manages
let addressStrings = xchain.keyChain().getAddressStrings(); //returns an array of addresses the KeyChain manages as strings
let utxos = (await xchain.getUTXOs(myAddresses)).utxos

let assetid = "23wKfz3viWLmjWo2UZ7xWegjvnZFenGAVkouwQCeB9ubPXodG6" //avaSerialized string
let mybalance = utxos.getBalance(myAddresses, assetid) //returns 400 as a BN

console.log(mybalance);