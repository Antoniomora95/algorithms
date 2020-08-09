
let pendingOperation = '';
let total = 0;
let actualValue = 0;
// each time you push an operation the actualValue should be reset, but
// until the costumer is writing in the input again.
let pushButtonOperation = false;
let firstOperation = true;
let inputActualValue = document.getElementById('actualValue');
let inputTotal = document.getElementById('total');



const triggerOperation = (operationSelected) => {
    //validate if there is something to work with
    if(!actualValue){
        return
    }
    // you have an actual value, but not a total nor a pending operation yet
    if(firstOperation){
        // if operation is equal this should be different
        firstOperation = false;
        total = getActualValue();
        inputTotal.value = total;
        pendingOperation = operationSelected;
        pushButtonOperation = true;
    } else {
        // perform pending operation
        switch (pendingOperation) {
            // set the new total
            // reset valuePushed
            case 'sum':
                total = performSum(total, getActualValue());
                updateValues(operationSelected);
                renderTotal(total);
                break;
            case 'rest':
                total = performRest(total, getActualValue());
                updateValues(operationSelected);
                renderTotal(total);
                break;
            case 'multiply':
                total = performMultiply(total, getActualValue());
                updateValues(operationSelected);
                renderTotal(total);
                break;
            case 'divide':
                total = performDivide(total, getActualValue());
                updateValues(operationSelected);
                renderTotal(total);
                break;
            case 'equal':
                updateValues(operationSelected);
                renderTotal(total);
                break;
            default:
                break;
        }
    }
}
const performSum = (total, actualValue) => {
    return (total + actualValue);
}
const performRest = (total, actualValue) => {
    return (total - actualValue);
}
const performDivide = (total, actualValue) => {
    return (total / actualValue);
}
const performMultiply = (total, actualValue) => {
    return (total * actualValue);
}
const updateValues = (operationSelected) => {
    pushButtonOperation = true;
    pendingOperation = operationSelected;
    actualValue = 0;
    setInputActualValue(actualValue);
    if(pendingOperation === 'equal'){
        triggerOperation(pendingOperation);
    }
}
// i am not sure, it should be midify
const setInputActualValue = (value = '') => {
    // you should clean the actual value and start a new cycle
    // in case the user push an operation
    if(pushButtonOperation){
        pushButtonOperation = false;
        inputActualValue.value = '';
    }
    let modifiedInputValue = '';
    let actualInputValue = inputActualValue.value;
    modifiedInputValue = `${actualInputValue}${value}`;
    // delete it if it is in the position 0
    let valueClean =  delZeroFromString(modifiedInputValue);
    inputActualValue.value = valueClean;
    // set the actual value for the next operations
    setActualValue(valueClean);  
}
const renderTotal = (total) => {
    inputTotal.value = total;
}
const delZeroFromString = (inputValue) => {
    if(inputValue && inputValue.charAt(0) === '0'){
        return inputValue.slice(1)
    } else {
        return inputValue;
    }
}
const setActualValue = (value) => {
    actualValue = parseFloat(value);
    console.log(actualValue, 'as');
}
const getActualValue = () => {
    return actualValue;
}
