// DOM Element
const openModal_elt = document.querySelector('.open');
const closeModal_elt = document.querySelector('.close');
const modalBackground_elt = document.querySelector('.contact_modal_background');
const modalForm = document.querySelector('form');
const firstName_elt = document.querySelector('#firstName');
const lastName_elt = document.querySelector('#lastName');
const mail_elt = document.querySelector('#mail');
const message_elt = document.querySelector('#message');
const submit_elt = document.querySelector('.submitButton');
// DOM Element Error
const firstNameError_elt = document.querySelector('.firstName-error');
const lastNameError_elt = document.querySelector('.lastName-error');
const mailError_elt = document.querySelector('.mail-error');
const messageError_elt = document.querySelector('.message-error');

// Error Messages
const errorMessages = {
    first : "Veuillez remplir le champ prénom.",
    last : "Veuillez remplir le champ nom.",
    mail : "Veuillez entrer une adresse mail valide.",
    message : "Veuillez remplir le champ message.",
  }

// Display/Disable Error 
function displayError(input, error, message){
    input.style.border = "2px solid red";
    input.style.backgroundColor = "rgb(255, 227, 227)";
    error.textContent = message;
}
function disableError(input, error){
    error.textContent = "";
    input.style.border = "initial";
    input.style.backgroundColor = "#fff";
}

// Open/Close Modal
function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "flex";
    firstName_elt.focus();
    document.addEventListener('keydown', e =>{
        if(e.key === 'Escape' && modal.style.display === "flex"){
            closeModal();
        }
    });
    
}
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    openModal_elt.focus();
}

// Modal
// open/close
openModal_elt.addEventListener("click", displayModal);
closeModal_elt.addEventListener("click", closeModal);
modalBackground_elt.addEventListener('click', closeModal);

// submit
submit_elt.addEventListener('click', (event)=>{
    event.preventDefault();
    let errorForm = false;

    // First Name Validity
    firstName_elt.value = firstName_elt.value.trim();
    if(!firstName_elt.value){
        displayError(firstName_elt, firstNameError_elt, errorMessages.first);
        errorForm = true;
    } else {
        disableError(firstName_elt, firstNameError_elt);
    }

    // Last Name Validity
    lastName_elt.value = lastName_elt.value.trim();
    if(!lastName_elt.value){
        displayError(lastName_elt, lastNameError_elt, errorMessages.last);
        errorForm = true;
    } else {
        disableError(lastName_elt, lastNameError_elt);
    }

    // Mail Validity
    mail_elt.value = mail_elt.value.trim();
    if(!mail_elt.validity.valid){
        displayError(mail_elt, mailError_elt, errorMessages.mail);
        errorForm = true;
    } else {
        disableError(mail_elt, mailError_elt);
    }

    // Message Validity
    message_elt.value = message_elt.value.trim();
    if(!message_elt.value){
        displayError(message_elt, messageError_elt, errorMessages.message);
        errorForm = true;
    } else {
        disableError(message_elt, messageError_elt);
    }

    // Submit Test
    if(errorForm){
        return false;
    }else{
    closeModal();
    const submitValue = {
        first: `${firstName_elt.value}`,
        last: `${lastName_elt.value}`,
        mail: `${mail_elt.value}`,
        message: `${message_elt.value}`}
    console.log(submitValue);
    return submitValue;
    }
})

