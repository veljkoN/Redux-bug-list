import {createStore, combineReducers} from 'redux'

const createClaim = (name,amountMoneyToCollect) => {
    return{
        type:'CREATE_CLAIM',
        payload:{
            name:name,
            amountMoneyToCollect:amountMoneyToCollect
        }
    }
}
const createPolicy = (name) =>{
    return{
        type:'CREATE_POLICY',
        payload:{
            name:name, 
            amount:20
        }
    }
}
const deletePolicy = (name) => {
    return {
        type:'DELETE_POLICY',
        payload:{
            name:name
        }
    }
}

//create reducers

const claimHistory = (oldListOfClaims=[],action) => {
    if(action.type==='CREATE_CLAIM'){
        return [...oldListOfClaims,action.payload]
    }
    return oldListOfClaims
}

const accounting = (bagOfMoney=100,action) => {
    if(action.type==='CREATE_CLAIM'){
        return bagOfMoney-action.payload.amountMoneyToCollect
    }
    else if(action.type==='CREATE_POLICY'){
        return bagOfMoney+action.payload.amount
    }
    return bagOfMoney
}
const polices = (listOfPolices=[],action) => {
    if(action.type==='CREATE_POLICY'){
        return [...listOfPolices,action.payload.name]
    }
    else if(action.type==='DELETE_POLICY'){
        return listOfPolices.filter(policy=>policy!==action.payload.name)
    }
    return listOfPolices
}

const ourDepartment=combineReducers({
    claimHistory:claimHistory,
    accounting:accounting,
    polices:polices
})

const store=createStore(ourDepartment)
/*
store.dispatch(createPolicy('Bob'))
store.dispatch(createClaim('Bob',80))
store.dispatch(deletePolicy('bob'))
console.log(store.getState())
*/
//create box div
const wrapper=document.querySelector('.wrapper') 
wrapper.className='container'
const box=document.createElement('div')
box.className='row'
wrapper.appendChild(box)


const divCl=document.createElement('div')
divCl.className='col-lg-4'
const headerCl=document.createElement('h5')
headerCl.innerHTML='Create claim'
//divCl.appendChild(headerPol)
const inputClName=document.createElement('input')
inputClName.className='form-control'
inputClName.placeholder='Enter name'
const inputClAmount=document.createElement('input')
inputClAmount.className='form-control'
inputClAmount.type='number'
inputClAmount.placeholder='Enter amount of money (max $30)'
const btnCl=document.createElement('button')
btnCl.className='btn btn-danger'
btnCl.innerHTML='Submit claim'
divCl.append(headerCl, inputClName,inputClAmount,btnCl)

box.appendChild(divCl)

//create policy 

const divPolicy=document.createElement('div')
divPolicy.className='col-lg-4'
const headerPol=document.createElement('h5')
headerPol.innerHTML='Create policy'
const nameInput=document.createElement('input')
nameInput.className='form-control'
nameInput.placeholder='Enter policy name'
const nameSubmit=document.createElement('button')
nameSubmit.id='nameSub'
nameSubmit.className='btn btn-warning'
nameSubmit.innerHTML='Submit name'
const pAmoount=document.createElement('p')
pAmoount.innerHTML='<span class="text-danger">*</span>Amount of new polices is <span class="text-danger">$20</span>'
divPolicy.append(headerPol, nameInput,nameSubmit,pAmoount)

box.appendChild(divPolicy)


//create policy for delete

const divPolicyDel=document.createElement('div')
divPolicyDel.className='col-lg-4'
const headerDel=document.createElement('h5')
headerDel.innerHTML='Delete policy'
const nameInputDel=document.createElement('input')
nameInputDel.className='form-control'
nameInputDel.placeholder='Enter name of policy'
const nameSubmit1=document.createElement('button')
nameSubmit1.id='nameSub1'
nameSubmit1.className='btn btn-warning'
nameSubmit1.innerHTML='Delete policy'

divPolicyDel.append(headerDel, nameInputDel,nameSubmit1)

box.appendChild(divPolicyDel)


const divClaim=document.createElement('div')
divClaim.className='col-lg-4  mt-3'
const claimHeader=document.createElement('h3')
claimHeader.innerHTML='List of claims'
divClaim.appendChild(claimHeader)
const divContentClaim=document.createElement('div')
const showListOfClaims = (claim) =>{
   divContentClaim.innerHTML=''
    for(let el of claim){
        const nameClaim=document.createElement('h5')
        const amountClaim=document.createElement('span')
        nameClaim.innerHTML=el.name
        amountClaim.innerHTML=el.amountMoneyToCollect
        divContentClaim.append(nameClaim,amountClaim)
    }
}

divClaim.appendChild(divContentClaim)
box.appendChild(divClaim)

//Create div for policies
const divPol=document.createElement('div')
divPol.className='col-lg-4 mt-3'
const policyHeader=document.createElement('h3')
policyHeader.innerHTML='Policy'
divPol.appendChild(policyHeader)
let emptyPolicy=document.createElement('p')
const showEmptyError = (textError) => {
    
    emptyPolicy.innerHTML=textError
    emptyPolicy.style.color='red'
    nameInput.style.border='2px solid red'
    divPol.appendChild(emptyPolicy)
}

//good example
const divPolAdd=document.createElement('div')
const showListOfPolicy = (policy) =>{
    divPolAdd.innerHTML=''
    const namePolisy=document.createElement('h5')
    for(let el of policy){
        namePolisy.innerHTML+=`${el} <br>`
        divPolAdd.appendChild(namePolisy)
    }
}
divPol.appendChild(divPolAdd)
box.appendChild(divPol)

//create div for accounting
const divAcc=document.createElement('div')
divAcc.className='col-lg-4  mt-3 alert alert-info'
const accHeader=document.createElement('h3')
accHeader.innerHTML='Account'
accHeader.className='text-center'
divAcc.appendChild(accHeader)
const accAmount=document.createElement('h4')
accAmount.className='text-warning text-center'
const showAccounting = (amounOfAccounting) => {
    accAmount.innerHTML=`$${amounOfAccounting}`
}
divAcc.appendChild(accAmount)
box.appendChild(divAcc)

//create input for policy

nameSubmit.addEventListener('click',()=>{
    if(nameInput.value!==''){
        store.dispatch(createPolicy(nameInput.value))
        showListOfPolicy(store.getState().polices)
        showAccounting(store.getState().accounting)
        nameInput.value=''
        showEmptyError(null)
        nameInput.style.border='1px solid lightgray'
    }
})

btnCl.addEventListener('click',()=>{
    if(inputClName.value==''){
        inputClName.style.border='2px solid red'
        inputClName.placeholder='Required field'
    }
    else if(inputClAmount.value==''){
       inputClName.style.border='1px solid lightgray'
       inputClAmount.style.border='2px solid red'
       inputClAmount.placeholder='Required field (max $30)'
    }
    else if(inputClAmount.value>30){
        inputClName.style.border='1px solid lightgray'
        inputClAmount.style.border='2px solid red'
        inputClAmount.placeholder='Required field (max $30)'
    }
    else{
        store.dispatch(createClaim(inputClName.value,inputClAmount.value))
        showListOfClaims(store.getState().claimHistory)
        showAccounting(store.getState().accounting)
        inputClName.style.border='1px solid lightgray'
        inputClAmount.style.border='1px solid lightgray'
        inputClName.value=''
        inputClAmount.value=''
    }
})

nameSubmit1.addEventListener('click',()=>{
    if(!store.getState().polices[0]){
        showEmptyError('First you should create policy')
    }
    else{
        if(nameInputDel.value!==''){
            store.getState().polices.forEach(element => {
                if(element.toLowerCase() ===nameInputDel.value.trim().toLowerCase()){
                    store.dispatch(deletePolicy(element))
                    divPolAdd.innerHTML=''
                    showListOfPolicy(store.getState().polices)
                    nameInputDel.value=''
                }
                
            });
        }
        else{
            nameInputDel.style.border='2px solid red'
            nameInputDel.placeholder='Required field'
        }
        
    }
   
})







