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

// Open/Close Modal
function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "flex";
    document.addEventListener('keydown', e =>{
        if(e.key === 'Escape' && modal.style.display === "flex"){
            closeModal();
        }
    });
    
}
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
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
        firstNameError_elt.textContent = errorMessages.first;
        errorForm = true;
    } else {
        firstNameError_elt.textContent = "";
    }

    // Last Name Validity
    lastName_elt.value = lastName_elt.value.trim();
    if(!lastName_elt.value){
        lastNameError_elt.textContent = errorMessages.last;
        errorForm = true;
    } else {
        lastNameError_elt.textContent = "";
    }

    // Mail Validity
    mail_elt.value = mail_elt.value.trim();
    if(!mail_elt.validity.valid){
        mailError_elt.textContent = errorMessages.mail;
        errorForm = true;
    } else {
        mailError_elt.textContent = "";
    }

    // Message Validity
    message_elt.value = message_elt.value.trim();
    if(!message_elt.value){
        messageError_elt.textContent = errorMessages.message;
        errorForm = true;
    } else {
        messageError_elt.textContent = "";
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

