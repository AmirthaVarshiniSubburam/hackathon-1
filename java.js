const usernameEl = document.querySelector('#username');
const phonenumberE1 = document.querySelector('#phonenumber');
const addressE1 = document.querySelector('#address');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const form = document.querySelector('#signup');


const checkUsername = () => {

    let valid = false;

    const min = 3,
        max = 25;

    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
        showError(usernameEl, 'Username cannot be blank.');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};

const checkAddress = () => {

    let valid = false;

    const min = 10,
        max = 250;

    const address = addressE1.value;

    if (!isRequired(address)) {
        showError(addressE1, 'Address cannot be blank.');
    } else if (!isBetween(address.length, min, max)) {
        showError(addressE1, `Address must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(addressE1);
        valid = true;
    }
    return valid;
};

const checkPhonenumber = () =>{
    let valid = false;

    const min = 0,
        max = 11;

    const phonenumber = phonenumberE1.value;

    if (!isRequired(phonenumber)) {
        showError(phonenumberE1, 'Phone Number cannot be blank.');
    } else if (!isPhonenumberValid(phonenumber)) {
        showError(phonenumberE1, `Phone Number must have only 10 digits.`);
    } else {
        showSuccess(phonenumberE1);
        valid = true;
    }
    return valid;

}
    
const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const checkPassword = () => {
    let valid = false;


    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(passwordEl, 'Password cannot be blank.');
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }

    return valid;
};


const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

const isPhonenumberValid = (phonenumber) => {
    const re = new RegExp ("^[0-9]{10}$");
    return re.test(phonenumber);
}

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}


form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        
        isPhonenumberValid = checkPhonenumber(),
        isAddressValid = checkAddress();
        

    let isFormValid = isUsernameValid &&
        isEmailValid &&
        isPasswordValid &&        
        isPhonenumberValid &&
        isAddressValid;


    // submit to the server if the form is valid
    if (isFormValid) {
        alert ("Sign up completed")
    }
});


const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'username':
            checkUsername();
            break;
        case 'phonenumber':
            checkPhonenumber();
            break;
            case 'address':
            checkAddress();
            break;

        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        
    }
}));