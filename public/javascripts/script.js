function isChecked(checkbox, sub1) {
  document.getElementById(sub1).disabled = !checkbox.checked;
  
  if( !checkbox.checked){
    document.getElementById(sub1).className = "login-input"
    
  }else{
    document.getElementById(sub1).className = "buttonAction"
  }
}


const password = document.getElementById('password')
const cell = document.getElementById('cell')
const email = document.getElementById('email')
const userName = document.getElementById('userName')
const enrollForm = document.getElementById('enrollForm')
const passError = document.getElementById('passError')
const emailError = document.getElementById('emailError')
const cellError = document.getElementById('cellError')
const userNameError = document.getElementById('userNameError')

function nospacesEmail(ta){
  if(ta.value.match(/\s/g)){
    console.log(ta);
    ta.value=ta.value.replace(/\s/g,'');
    emailError.innerText = "Spaces are not allowed in user name";
  }else{
    emailError.innerText ="";
  }
}
function numbersOnly(cell){
  if(cell.value.match(/[^0-9]/g)){
    cell.value=cell.value.replace(/[^0-9]/g,'')
    cellError.innerText = "Cell number should be numbers only, ";
  }else{
    cellError.innerText ="";
  }
  if(cell.value.length >10){
    cellError.innerText += "cell number should be 10 numbers";
  }
}

function nospaces(t){
  if(t.value.match(/\s/g)){
    t.value=t.value.replace(/\s/g,'');
    passError.innerText = "Spaces are not allowed to be used in password";
  }else{
    passError.innerText ="";
  }
}



function chrOnly(userName){
  if(userName.value.match(/[^a-z]/gi)){
    userName.value=userName.value.replace(/[^a-z]/gi,'')
    userNameError.innerText = " Letters only"
  }else{
    userNameError.innerText ="";
  }
}


enrollForm.addEventListener('submit', (e) => {
  let messages = []
  let cellMessages =[]
  if (password.value.length <= 6) {
    messages.push('Password must be 7 to 20 characters')
  }

  if (cell.value.length !==10) {
    cellMessages.push('cell number should be 10 numbers')
  }


  if (password.value  == email.value) {
    messages.push('Password cannot be your email')
  }
  if (password.value  == userName.value) {
    messages.push('Password cannot be your user name')
  }
  if (password.value  == cell.value) {
    messages.push('Password cannot be your cell number')
  }

  if (password.value.length >= 20) {
    messages.push('Password must be less than 20 characters')
  }

  if (password.value === 'password' || password.value === 'Password') {
    messages.push('Password cannot be "password" or "Password"')
  }

  if (messages.length > 0  || cellMessages.length > 0 ) {
    e.preventDefault()
    passError.innerText = messages.join(', ')
    cellError.innerText = cellMessages.join(', ')
    
  }
})


