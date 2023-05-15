// Open/Close Lightbox
function displayLightbox() {
    const modal = document.querySelector(".lightBox_modal");
	modal.style.display = "flex";
    document.addEventListener('keydown', e =>{
        if(e.key === 'Escape' && modal.style.display === "flex"){
            closeLightbox();
        }
    });
    
}
function closeLightbox() {
    const modal = document.querySelector(".lightBox_modal");
    modal.style.display = "none";
}

document.querySelector('.closeLightBox').addEventListener('click', closeLightbox);