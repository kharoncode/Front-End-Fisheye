// DOM Element
const lightBoxModal_elt = document.getElementById('lightBox_modal');
const closeLightBox_elt = document.querySelector('.close-LightBox');
const leftLightBox_elt = document.querySelector('.left-LightBox');
const rightLightBox_elt = document.querySelector('.right-LightBox');
const header_elt = document.querySelector('header');
const main_elt = document.querySelector('main');
const body_elt = document.querySelector('body');

// Open/Close Lightbox
function lightboxKeyDown(e){
    const mediaLightBox_elts = document.querySelectorAll(".media-lightbox");
    const selected_elt = document.querySelector('.media-selected');
    if(e.key === 'ArrowRight' && lightBoxModal_elt.style.display === "flex"){
        nextLightBox(mediaLightBox_elts, selected_elt);
    }
    if(e.key === 'ArrowLeft' && lightBoxModal_elt.style.display === "flex"){
        backLightBox(mediaLightBox_elts, selected_elt);
    }
    if(e.key === 'Escape' && lightBoxModal_elt.style.display === "flex"){
        closeLightbox();
    }
}
function displayLightbox(e) {
	lightBoxModal_elt.style.display = "flex";
    lightBoxModal_elt.setAttribute("aria-hidden", "false");
    header_elt.setAttribute("aria-hidden", "true");
    main_elt.setAttribute("aria-hidden", "true");
    body_elt.classList.add('noScroll');
    e.children[0].focus();
    document.addEventListener('keydown', lightboxKeyDown);
}
function closeLightbox() {
    document.removeEventListener('keydown', lightboxKeyDown);
    lightBoxModal_elt.style.display = "none";
    lightBoxModal_elt.setAttribute("aria-hidden", "true");
    header_elt.setAttribute("aria-hidden", "false");
    main_elt.setAttribute("aria-hidden", "false");
    body_elt.classList.remove('noScroll');
    const selected_elt_id = document.querySelector(".media-selected").id;
    document.getElementById(`mediaArt-${selected_elt_id}`).focus();
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
}
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
}

// Remove all media-selected of media-lightbox Element and add media-selected on the selected media-lightbox element
function addMediaSelected (id){
    const mediaLightbox_elts = document.querySelectorAll(".media-lightbox");
            for(let i=0; i<mediaLightbox_elts.length; i++){
                mediaLightbox_elts[i].classList.remove("media-selected");
            }
            const mediaLightBoxSelected_elt = document.querySelector(`.media-lightbox-${id}`);
            mediaLightBoxSelected_elt.classList.add("media-selected");
            displayLightbox(mediaLightBoxSelected_elt);
}
export function initDisplayLightBox(){
    const openLightBox_elts = document.querySelectorAll('.openLightBox');
        for(let i =0; i<openLightBox_elts.length; i++){
            let eltID = openLightBox_elts[i].id.match(/\d+/);
            document.getElementById(`mediaArt-${eltID}`).addEventListener('click',()=>{
                addMediaSelected(eltID);
            });     
            document.getElementById(`mediaArt-${eltID}`).addEventListener('keypress',(e)=>{
                if(e.key === 'Enter'){
                    addMediaSelected(eltID);
                }
            });  
        }
}

// Init LightBox
export function initLightBox() {
    // Close
    closeLightBox_elt.addEventListener('click', closeLightbox);
    // Open
    initDisplayLightBox();
    // Back
    leftLightBox_elt.addEventListener("click", ()=>{
        const mediaLightBox_elts = document.querySelectorAll(".media-lightbox");
        const selected_elt = document.querySelector('.media-selected');
        backLightBox(mediaLightBox_elts, selected_elt);
    });
    leftLightBox_elt.addEventListener("keydown", (e)=>{
        const mediaLightBox_elts = document.querySelectorAll(".media-lightbox");
        const selected_elt = document.querySelector('.media-selected');
        if(e.key === 'Enter' && lightBoxModal_elt.style.display === "flex"){
            backLightBox(mediaLightBox_elts, selected_elt);
        }
    })
    // Next
    rightLightBox_elt.addEventListener("click", ()=>{
        const mediaLightBox_elts = document.querySelectorAll(".media-lightbox");
        const selected_elt = document.querySelector('.media-selected');
        nextLightBox(mediaLightBox_elts, selected_elt)});
    rightLightBox_elt.addEventListener("keydown", (e)=>{
        const mediaLightBox_elts = document.querySelectorAll(".media-lightbox");
        const selected_elt = document.querySelector('.media-selected');
        if(e.key === 'Enter' && lightBoxModal_elt.style.display === "flex"){
            nextLightBox(mediaLightBox_elts, selected_elt);
        }
    });
}

