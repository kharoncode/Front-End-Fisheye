// DOM Element
const openModal_elt = document.querySelector('.open');
const closeModal_elt = document.querySelector('.close');
const modalBackground_elt = document.querySelector('.contact_modal_background');
const firstName_elt = document.querySelector('#firstName');
const lastName_elt = document.querySelector('#lastName');
const mail_elt = document.querySelector('#mail');
const message_elt = document.querySelector('#message');
const submit_elt = document.querySelector('.submitButton');
const header_elt = document.querySelector('header');
const main_elt = document.querySelector('main');
const body_elt = document.querySelector('body');

// Display/Disable Error 
function displayError(input, name){
    input.setAttribute("aria-invalid", "true");
    input.className = "invalidInput"
    if(document.querySelector(`.displayError-${name}`) === null){
        let errorIcone = `<p class='iconeError displayError-${name}' aria-hidden="true">!</p>`
        input.insertAdjacentHTML("beforebegin", errorIcone);
    }
    const invalidInput_elts = document.querySelectorAll(".invalidInput");
    invalidInput_elts[0].focus();
}
function disableError(input, name){
    input.setAttribute("aria-invalid", "false");
    input.classList.remove('invalidInput')
    if(document.querySelector(`.displayError-${name}`) !== null){
        document.querySelector(`.displayError-${name}`).remove();
    }
}

// Open/Close Modal
function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
    header_elt.setAttribute("aria-hidden", "true");
    main_elt.setAttribute("aria-hidden", "true");
    body_elt.classList.add('noScroll');
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
    modal.setAttribute("aria-hidden", "true");
    header_elt.setAttribute("aria-hidden", "false");
    main_elt.setAttribute("aria-hidden", "false");
    body_elt.classList.remove('noScroll');
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
        displayError(firstName_elt, "first");
        errorForm = true;
    } else {
        disableError(firstName_elt, "first");
    }

    // Last Name Validity
    lastName_elt.value = lastName_elt.value.trim();
    if(!lastName_elt.value){
        displayError(lastName_elt, "last");
        errorForm = true;
    } else {
        disableError(lastName_elt, "last");
    }

    // Mail Validity
    mail_elt.value = mail_elt.value.trim();
    if(!mail_elt.validity.valid){
        displayError(mail_elt, "mail");
        errorForm = true;
    } else {
        disableError(mail_elt, "mail");
    }

    // Message Validity
    message_elt.value = message_elt.value.trim();
    if(!message_elt.value){
        displayError(message_elt, "message");
        errorForm = true;
    } else {
        disableError(message_elt, "message");
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

