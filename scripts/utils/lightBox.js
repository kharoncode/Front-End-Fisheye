// DOM Element
const lightBoxModal_elt = document.getElementById('lightBox_modal');
const closeLightBox_elt = document.querySelector('.close-LightBox');
const leftLightBox_elt = document.querySelector('.left-LightBox');
const rightLightBox_elt = document.querySelector('.right-LightBox');

// Open/Close Lightbox
function displayLightbox() {
    const modal = document.getElementById("lightBox_modal");
	modal.style.display = "flex";
    lightBoxModal_elt.setAttribute("aria-hidden", "false");
    document.addEventListener('keydown', e =>{
        if(e.key === 'Escape' && modal.style.display === "flex"){
            closeLightbox();
        }
    });
    
}
function closeLightbox() {
    const modal = document.getElementById("lightBox_modal");
    modal.style.display = "none";
    lightBoxModal_elt.setAttribute("aria-hidden", "true");;
}

// Back/Next LightBox
function backLightBox(data, selected) {
    for(let i = 0; i<data.length; i++){
        if(data[i].id === parseInt(selected.id)){
            let count = i-1;
            if(count<0){
                count = data.length-1;
            }
            selected.classList.remove('selected');
            document.getElementById(`${data[count].id}`).classList.add('selected');
        }
    }
};
function nextLightBox(data, selected) {
    for(let i = 0; i<data.length; i++){
        if(data[i].id === parseInt(selected.id)){
            let count = i+1;
            if(count>(data.length-1)){
                count = 0;
            }
            selected.classList.remove('selected');
            document.getElementById(`${data[count].id}`).classList.add('selected');
        }
    }
};