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
        if(data[i].id === selected.id){
            let previousI = i-1;
            if(previousI<0){
                previousI = data.length-1;
            }
            selected.classList.remove('media-selected');
            document.getElementById(`${data[previousI].id}`).classList.add('media-selected');
            document.getElementById(`${data[previousI].id}`).children[0].focus();
            break;
        }
    }
};
function nextLightBox(data, selected) {
    for(let i = 0; i<data.length; i++){
        if(data[i].id === selected.id){
            let nextI = i+1;
            if(nextI>(data.length-1)){
                nextI = 0;
            }
            selected.classList.remove('media-selected');
            document.getElementById(`${data[nextI].id}`).classList.add('media-selected');
            document.getElementById(`${data[nextI].id}`).children[0].focus();
            break;
        }

    }
};


// Close
closeLightBox_elt.addEventListener('click', closeLightbox);
// Open => photographerFactory > photographerMedia > LightBox
// Back
leftLightBox_elt.addEventListener("click", ()=>{
    const mediaLightBox_elts = document.querySelectorAll(".media-lightbox");
    const selected_elt = document.querySelector('.media-selected');
    backLightBox(mediaLightBox_elts, selected_elt);
});
document.addEventListener('keydown', e =>{
    const mediaLightBox_elts = document.querySelectorAll(".media-lightbox");
    const selected_elt = document.querySelector('.media-selected');
    if(e.key === 'ArrowLeft' && lightBoxModal_elt.style.display === "flex"){
        backLightBox(mediaLightBox_elts, selected_elt);
    }
});
// Next
rightLightBox_elt.addEventListener("click", ()=>{
    const mediaLightBox_elts = document.querySelectorAll(".media-lightbox");
    const selected_elt = document.querySelector('.media-selected');
    nextLightBox(mediaLightBox_elts, selected_elt)});
document.addEventListener('keydown', e =>{
    const mediaLightBox_elts = document.querySelectorAll(".media-lightbox");
    const selected_elt = document.querySelector('.media-selected');
    if(e.key === 'ArrowRight' && lightBoxModal_elt.style.display === "flex"){
        nextLightBox(mediaLightBox_elts, selected_elt);
    }
});

