// DOM Element
const lightBoxModal_elt = document.getElementById('lightBox_modal');
const closeLightBox_elt = document.querySelector('.close-LightBox');
const leftLightBox_elt = document.querySelector('.left-LightBox');
const rightLightBox_elt = document.querySelector('.right-LightBox');

// Open/Close Lightbox
function displayLightbox(e) {
	lightBoxModal_elt.style.display = "flex";
    lightBoxModal_elt.setAttribute("aria-hidden", "false");
    e.children[0].focus();
    document.addEventListener('keydown', e =>{
        if(e.key === 'Escape' && lightBoxModal_elt.style.display === "flex"){
            closeLightbox();
        }
    });
    
}
function closeLightbox() {
    lightBoxModal_elt.style.display = "none";
    lightBoxModal_elt.setAttribute("aria-hidden", "true");
}

// Back/Next LightBox
function backLightBox(data, selected) {
    for(let i = 0; i<data.length; i++){
        if(parseInt(data[i].id) === parseInt(selected.id)){
            let count = i-1;
            if(count<0){
                count = data.length-1;
            }
            selected.classList.remove('media-selected');
            document.getElementById(`${data[count].id}`).classList.add('media-selected');
            document.getElementById(`${data[count].id}`).children[0].focus();
        }
    }
};
function nextLightBox(data, selected) {
    for(let i = 0; i<data.length; i++){
        if(parseInt(data[i].id) === parseInt(selected.id)){
            let count = i+1;
            if(count>(data.length-1)){
                count = 0;
            }
            selected.classList.remove('media-selected');
            document.getElementById(`${data[count].id}`).classList.add('media-selected');
            document.getElementById(`${data[count].id}`).children[0].focus();
        }
    }
};


// Close
closeLightBox_elt.addEventListener('click', closeLightbox);
// Open => photographerFactory > photographerMedia > LightBox
// Back
leftLightBox_elt.addEventListener("click", ()=>{
    const mediaLightBox_elt = document.querySelectorAll(".media-lightbox");
    const selected_elt = document.querySelector('.media-selected');
    backLightBox(mediaLightBox_elt, selected_elt);
});
document.addEventListener('keydown', e =>{
    const mediaLightBox_elt = document.querySelectorAll(".media-lightbox");
    const selected_elt = document.querySelector('.media-selected');
    if(e.key === 'ArrowLeft' && lightBoxModal_elt.style.display === "flex"){
        backLightBox(mediaLightBox_elt, selected_elt);
    }
});
// Next
rightLightBox_elt.addEventListener("click", ()=>{
    const mediaLightBox_elt = document.querySelectorAll(".media-lightbox");
    const selected_elt = document.querySelector('.media-selected');
    nextLightBox(mediaLightBox_elt, selected_elt)});
document.addEventListener('keydown', e =>{
    const mediaLightBox_elt = document.querySelectorAll(".media-lightbox");
    const selected_elt = document.querySelector('.media-selected');
    if(e.key === 'ArrowRight' && lightBoxModal_elt.style.display === "flex"){
        nextLightBox(mediaLightBox_elt, selected_elt);
    }
});

