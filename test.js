var nodes = [1,2]
var users = ["a","b"]

tries = 10;


var count = 0;
for (let index = 0; index < nodes.length; index++) 
{
    functions = [];
    for (let t = 0; t < tries; t++) {

        try
        {
            functions.push([executeTx, { 'nodo' : nodes[index], 'user' : users[index], 'count' : count }]);
            count++;
        }
        catch(ex)
        {

        }       
    }

    runPromises(functions);
}



//call funcions in array in order
async function runPromises(promises) {
    for (const promise of promises) {
        var data = await promise[0](promise[1].nodo, promise[1].user, promise[1].count);
        
        //print current time with ms
        var d = new Date();
        var n = d.getTime();
        console.log(n + " - " + data.nodo + " - " + data.user + " - " + data.count);
    }
}


async function executeTx(nodo,user, count)
{
   
    //create a random number between 1000 and 3000
    var random = Math.floor(Math.random() * 2000) + 1000;
    
    //create a promise that waits for a second and then resolves
    var data = await new Promise((resolve, reject) => {
        setTimeout(() => { resolve({ 'nodo' : nodo, 'user' : user, 'count' : count })}, random)
    });

    return data;
}