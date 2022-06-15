console.log("this is form validation");


const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('number');
let validPhone = false;
let validEmail = false;
let validName = false;


name.addEventListener('blur',()=>{
    console.log("name is blurred")
    //validate name here
    let regex = /^[a-zA-Z]([0-9a-zA-Z]){2,10}$/
    let str = name.value;
    console.log(regex, str)
    if (regex.test(str)) {
        console.log('Your name is valid')
        name.classList.remove('is-invalid')
        validName=true;
    }
    else {
        console.log('Your name is not valid');
        name.classList.add('is-invalid');
        validName= false;
    }
})

email.addEventListener('blur', () => {
    console.log("email is blurred")
    //validate email here
    let regex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
    let str = email.value;
    console.log(regex, str)
    if (regex.test(str)) {
        console.log('Your email is valid')
        email.classList.remove('is-invalid')
        validEmail=true;
    }
    else {
        console.log('Your email is not valid')
        email.classList.add('is-invalid');
        validEmail=false;
    }
})

number.addEventListener('blur', () => {
    console.log("number is blurred")
    //validate number here
    let regex = /^([0-9]){10}$/
    let str = phone.value;
    console.log(regex, str)
    if (regex.test(str)) {
        console.log('Your number is valid')
        number.classList.remove('is-invalid')
        validPhone=true;
    }
    else {
        console.log('Your number is not valid')
        number.classList.add('is-invalid')
        validPhone=false;
    }
})

let submit = document.getElementById('submit');
submit.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("you have clicked the submit button");
    //submit your form here
    if (validEmail && validName && validPhone) {
        let failure= document.getElementById('fail');
        console.log("email,phone and user are valid")
        let success = document.getElementById('success');
        success.classList.add('show',"alert");
        // failure.classList.remove('show')
        $('#failure').hide();
        $('#success').show();
        
    }
    else {
        console.log("One of phone email or user is not valid");
        let failure= document.getElementById('fail');
        let success = document.getElementById('success');
        console.log(success)
        console.log(failure)
        fail.classList.add('show',"alert");
        // success.classList.remove('show')
        $('#success').hide();
        $('#fail').show();
        // failure.classList.add('show')
    }

})