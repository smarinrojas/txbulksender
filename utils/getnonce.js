/*
    Script to get the nonce of an account
*/

var Web3 = require('web3');
var abi = require('../abi.json');
var config = require('../config.json')['caminoLocal'];

async function main()
{
    var nonce = await getNoncesFromAccount();
    console.log("First nonce: " + nonce);
}

async function getNoncesFromAccount() {
    const web3 = new Web3(config.rpc_nodes[0]);
    return await web3.eth.getTransactionCount(config.account_address);
}

main();