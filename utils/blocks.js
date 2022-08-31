/* 
    Script to query all the last 10 blocks and print 
    the number of transactions and gas used in each block. 
*/

var Web3 = require('web3');
var config = require('./config.json')['caminoLocal'];

async function main()
{
    await getBlockDetails();
}   

async function getBlockDetails() {

    var web3 = new Web3(config.rpc_nodes[0] + "/ext/bc/C/rpc");
    var blockNumber = await web3.eth.getBlockNumber();
    console.log("Block number: " + blockNumber);

    for (let index = blockNumber - 10; index < blockNumber; index++) {
        var block = await web3.eth.getBlock(blockNumber);
        console.log({ 'blockNumber' : block.number, 'transactions' : block.transactions.length, 'gasUsed' : block.gasUsed, 'gasLimit' : block.gasLimit });
    }
}

main();

