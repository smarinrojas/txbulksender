var Web3 = require("web3");
var config = require("./config.json");
var config = config[config.active_network];
let web3_test = require("./buildtxX");

var start;
async function main() {

  if (config.transaccion_load < config.rpc_nodes.length
    || config.transaccion_load % config.rpc_nodes.length != 0) 
  {
    console.log("Transaction load and number of nodes must be a multiple of each other");
    return;
  }
  console.log(config.addressTo)
  console.log("Starting execution...");

  // var nonce = await getNoncesFromAccount();
  // console.log("First nonce: " + nonce);

  //record start time.
  start = new Date().getTime();

  var counter = 0;
  while(counter < config.tries){
    var promisesToExecute = await getDistributedPromises();
    // console.log("Sending nonce ", nonce);
    await runPromises(promisesToExecute, counter);
    await new Promise(resolve => {setTimeout(resolve, 1000)
    console.log(resolve)});
    // nonce = nonce + config.transaccion_load;
    console.log("Waiting 5 second..");
    counter++;
  }
}

// async function getNoncesFromAccount() {
//   const web3 = new Web3(config.rpc_nodes[0] + "/ext/bc/X/rpc");
//   return await web3.eth.getTransactionCount(config.account_address);
// }

async function getDistributedPromises() {
  var promises = [];

  var numberOfTransactionsPerNode =
    config.transaccion_load / config.rpc_nodes.length;

  config.rpc_nodes.forEach((node,i) => {
    for (let index = 0; index < numberOfTransactionsPerNode; index++) {
      promises.push(web3_test.buildTransaction( node,config.addressTo[i]));
      // nonce++;
    }
  });

  return promises;
}

async function runPromises(promises, counter) {

  Promise.all(promises).then(function (results) {
    var end = new Date().getTime();
    elapsedSeconds = (end - start) / 1000;
    console.log("Elapsed seconds: " + elapsedSeconds);
    // var blockNumbers = results.map(x => x.blockNumber);
    // console.log('blockNumbers > ' + blockNumbers.join());
    try {
      console.log('ok', counter + 1);
    } catch (err) {
      console.log(err);
    }
  });
}

main();