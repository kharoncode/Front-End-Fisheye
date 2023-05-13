export function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "flex";
}

export function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

export function firstNameModal(element, value){
    let data = value.trim();
    let pattern = /^[^\d].*[\w]$/;
    let errorForm = true;
    const first_error = document.querySelector('.first-error')
    if(data === ""){
        let error = 'Veuillez remplir le champ prénom.';
        first_error.textContent = error;
    } else if(!pattern.test(data)){
        let error = 'Veuillez entrer 2 caractères ou plus.';
        first_error.textContent = error;
    } else{
        let error = '';
        first_error.textContent = error;
        errorForm = false;
    }
    console.log(errorForm);
    return {data, errorForm};
}


