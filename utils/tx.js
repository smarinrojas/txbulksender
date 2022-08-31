/*
    Script to get details of a transaction.
*/

var Web3 = require('web3');
var config = require('../config.json')['caminoLocal'];

async function main()
{
    //transaction hash to get details of.
    var transactionHash = "0xa2d024e4164dacc051d75a29be9ff06949a3ee1cefa134518846dc7376ef2d4e";
    await getTransactionDetails(transactionHash);
}   

async function getTransactionDetails(transactionHash) {
    
    //query all rpc nodes for the transaction.
    config.rpc_nodes.forEach(async (node) => {
        var web3 = new Web3(node + "/ext/bc/C/rpc");
        //get transaction details using web3
        var transaction = await web3.eth.getTransaction(transactionHash);
        console.log(transaction);
    });
}

main();

