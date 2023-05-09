export function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "flex";
}

export function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
