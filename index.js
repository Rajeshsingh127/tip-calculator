const formEl = document.getElementById("formEl");
const tipOptions = document.querySelectorAll("input[name='tip']");
const customEl = document.querySelector("#customEl");
const customRadio = customEl.querySelector("input[type='radio']");
const customInput = customEl.querySelector("input[type='number']");
const amountEl = document.getElementById('amountEl');
const totalEl = document.getElementById('totalEl');
const resetBtn = document.getElementById('resetbtn');
const errorBox = document.getElementById('peopleError');


const data = {bill: 0,tip:0, people: 0};

formEl.addEventListener('input',(event) =>{
    let elem = event.target;
    let Evalue = Number(elem.value);
    if(elem.id == 'bill-amt'){
        data.bill = Evalue;
    }
    else if(elem.id == 'people'){
        data.people = Evalue;
        checkError(Evalue);
    }
    else if(elem.name == 'tip'){
        data.tip = Evalue;
    }

    checkEmpty();
})

function checkError(value){
    if(value == 0){
        errorBox.textContent = "People can't be Zero";
    }
    else if(typeof value !== 'number' || value < 0)
    errorBox.textContent = 'Wrong Format';

}


function checkEmpty(){
    Object.values(data).some((el) => el  == 0) ? clearDisp() : calculateTip();
}

function clearDisp(){
    amountEl.textContent = "$0.00";
    totalEl.textContent = "$0.00";
    resetBtn.disabled = true;
}

function calculateTip(){
    const {bill, tip, people} = data;
    resetBtn.disabled = false;

    const tipPerPerson = (bill * (tip/100))/people;
    const totalPerPerson = tipPerPerson + (bill/people);

    amountEl.textContent = `$${tipPerPerson.toFixed(2)}`;
    totalEl.textContent = `$${totalPerPerson.toFixed(2)}`;

}


customEl.addEventListener('click', () => handleCustom(customRadio.value));

customEl.addEventListener('input', (event) => {
event.preventDefault();
customRadio.value = event.target.value;
handleCustom(event.target.value);
})

function handleCustom(value){
    customRadio.checked = true;
    selectTip(value);
}

function selectTip(value){
    data.tip = Number(value);
    checkEmpty();
}




// reset function 

function reset(){
    Object.keys(data).forEach(id => data[id] =0);
    document.querySelector('form').reset();
    clearDisp();
}

resetBtn.addEventListener('click', reset)