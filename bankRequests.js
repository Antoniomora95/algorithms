class BankRequest {
    constructor(operation, amount, origin, destiny){
        this.operation = operation;
        this.amount = amount;
        this.origin = origin;
        this.destiny = destiny;
    }
}
/*this.accounts = () => {
           return {origin, destiny}
        } */
const arrRequests = [
    new BankRequest('withdraw', 10, 1),
    new BankRequest('transfer', 40, 1, 4),
    new BankRequest('deposit', 30, 1),
    new BankRequest('withdraw', 10, 1),
    new BankRequest('transfer', 40, 1, 4),
    new BankRequest('deposit', 30, 1),
    new BankRequest('withdraw', 10, 1),
    new BankRequest('transfer', 40, 1, 4),
    new BankRequest('deposit', 30, 1)
];

let ulRequests = document.getElementById('ul-requests');
console.log(ulRequests);
arrRequests.forEach((request, index)=> {
    let liNode = document.createElement('li');
    let textnode = '';
    console.log(liNode);
    if(request && request.operation === 'transfer'){
        textnode = document.createTextNode(`${request.operation} from ${request.origin} to ${request.destiny}, amount: ${request.amount}`);
    } else {
        textnode =  document.createTextNode(`${request.operation} for ${request.origin} amount: ${request.amount}`);
    }
    liNode.appendChild(textnode);
    ulRequests.appendChild(liNode);
});

