var Web3 = require('web3');
var abi = require('./abi.json');
var config = require("./config.json");
var config = config[config.active_network];

const buildTransaction =  async (nonce,rpcnode) => 
{
    rpcnode = rpcnode + "/ext/bc/C/rpc";
    var web3 = new Web3(rpcnode, { transactionBlockTimeout: 2 });
    //High timeout.
    web3.eth.transactionPollingTimeout = 1000000;
    return new Promise((resolve, reject) => {

        var privateKey = config.private_key;
        var address = web3.eth.accounts.privateKeyToAccount(privateKey);
        var addressFrom = address.address;
        var contractAddress = config.contract_address;

        //set default address
        web3.eth.defaultAccount = address.address;
        var contract = new web3.eth.Contract(abi, contractAddress);
        
        const data = contract.methods.store(10).encodeABI();

        //with EIP1559 It is not necessary to send the gas price and gas limit.
        const txData =
          {
            nonce: nonce,
            gasLimit: web3.utils.toHex(config.gas_limit),
            //maxFeePerGas: web3.utils.toHex(50000000000 + 2500000000),
            from: addressFrom,
            to: contractAddress,
            value: web3.utils.toHex(0),
            data: data,
            //maxPriorityFeePerGas: web3.utils.toHex(0),
            // chainId: web3.utils.toHex(43112),
            // gasPrice: web3.utils.toHex(config.gas_price),
            // chainId: 43112,
            // type:web3.utils.toHex(2),
            // chainId: web3.utils.toHex(43112),

        }

        //We build and sign the transaction just as a real transaction so the node
        //won't have to do it.
        web3.eth.accounts.signTransaction(
            txData,
            "0x" + config.private_key
        ).then(signed => {
            web3.eth.sendSignedTransaction(signed.rawTransaction)
            .on('transactionHash', function(hash){
                console.log("transactionHash: " + hash + " - " + nonce);
            })
            .then((datahash =>{
                resolve(datahash)
            }))
            .catch(err =>{
                console.log("Err in txID " + nonce + " - " + err.message);
                //reject(err)
            })
        });
    })
}

module.exports = {buildTransaction}