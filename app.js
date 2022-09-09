var Web3 = require("web3");
var config = require("./config.json");
var config = config[config.active_network];
let buildtxX = require("./buildtxx");
let buildtxC = require("./buildtxc");

async function main() {

  if (config.transaccion_load < config.rpc_nodes.length
    || config.transaccion_load % config.rpc_nodes.length != 0) 
  {
    console.log("Transaction load and number of nodes must be a multiple of each other");
    return;
  }

  var nonces = await getNoncesFromAccount();
  console.log("initial nonces :", nonces);


  console.log("Starting execution...");
  var counter = 0;
  while(counter < config.tries)
  {
    await distributeAndRunPromises(nonce);
    counter++;
  }
}

async function getNoncesFromAccount() {
  const web3 = new Web3(config.rpc_nodes[0] + "/ext/bc/C/rpc");
  var nonces = [];
  config.private_keys.forEach(async pk => {
    var address = web3.eth.accounts.privateKeyToAccount(pk);
    nonces.push(await web3.eth.getTransactionCount(address));
  });

  return nonces;
}

async function distributeAndRunPromises(nonce) {

  var numberOfTransactionsPerNode =
  config.transaccion_load / config.rpc_nodes.length;

  config.rpc_nodes.forEach((node, i) => 
  {
    functions = [];
    for (let index = 0; index < numberOfTransactionsPerNode; index++) 
    {
      nonce, node, config.private_keys[i]
      functions.push([buildtxC.executeTransaction, { 'nonce' : nonce, 'node' : node, 'pk' : config.private_keys[i] }]);
      count++;
    }
    
    runPromises(functions);
  });

}

//call funcions in array in order
async function runPromises(promises) {
  for (const promise of promises) {

    var success = true;
    
    try {
      var data = await promise[0](promise[1].nonce, promise[1].node, promise[1].pk);
    }
    catch(e){
      success = false;
    }
  
    //print current time with ms
    var d = new Date();
    var n = d.getTime();
    
    logdata = n + "," + data.nodo + "," + data.user + "," + data.count + "," + success + "\n";

    writeLog(data);
  }
}


//write log with data from transaction
function writeLog(data) {
  var fs = require('fs');
  var stream = fs.createWriteStream("log.txt", { flags: 'a' });
  stream.write(data.nodo + " - " + data.user + " - " + data.count)
  stream.end();
}

main();