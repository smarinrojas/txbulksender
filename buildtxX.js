
var request = require('request');

const buildTransaction =  async (rpcnode, addressTo) => 
{
    return new Promise(resolve => {
      request({
        'method': 'POST',
        'url': 'http://127.0.0.1:9650/ext/bc/X',
        'headers': {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "jsonrpc": "2.0",
          "id": 1,
          "method": "avm.send",
          "params": {
            "assetID": "o8seyjX6WupqJ1CE8CeaozK13kqVgc4DFvdvc4crfacLFBauW",
            "amount": 5,
            "from": [
              "X-columbus1tpgut7ewmejpy6hl5sxevpdk5nht7w2vj3tlup"
            ],
            "to": addressTo,
            "username": "ivan",
            "password": "[RASENldmk-30404-23]"
          }
        })
      }, async function (error, response, body) {
          // if(!error)
          // resolve(body)
          // console.log(resolve)
            //  console.log( resolve(body));
            console.log(addressTo)
            console.log(body)
      })
  }).then(body => {
    resolve(body)
      // process value here
  })
}

module.exports = {buildTransaction}

