// Import
import {photographerPage, photographerMediaCard, getPhotographerInfo, increaseLikes} from "../factories/photographerFactory.js";

// DOM Element
const modalName_elt = document.querySelector('.modal header h3');
const select_elt = document.querySelector('select');
// DOM LightBox Element
const closeLightBox_elt = document.querySelector('.close-LightBox');
const leftLightBox_elt = document.querySelector('.left-LightBox');
const rightLightBox_elt = document.querySelector('.right-LightBox');

// Fetch photographers.json
const photographers = await fetch('./data/photographers.json').then(photographers => photographers.json());
// Get Photographer ID
let params = (new URL(document.location)).searchParams;
let id = parseInt(params.get('id'));

// Initialisation
const {photographer, totalLikes, medias:photographerMedias} = getPhotographerInfo(id, photographers);
modalName_elt.textContent = `${photographer.name}`;
photographerPage(photographer, totalLikes);
photographerMedias.sort((a,b)=>{ // Default Select = Date
    return new Date(b.date).getTime() - new Date(a.date).getTime();
});
photographerMediaCard(photographerMedias);

function initIncreaseLikes() {
    const inputLikes_elt = document.querySelectorAll('.getLikes');
    for(let i=0; i<inputLikes_elt.length; i++){
        const mediaLike = document.querySelector(`.media-likes-${i}`);
        inputLikes_elt[i].addEventListener('click', (e)=>{increaseLikes(e, mediaLike, totalLikes)})
    }
}

// Select
select_elt.addEventListener('change',(e)=>{
    const option = e.target.selectedIndex;
    if(option === 0){
        photographerMedias.sort((a,b)=>{
            return b.likes - a.likes;
        });
    } else if(option === 1){ 
        photographerMedias.sort((a,b)=>{
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
    } else if(option === 2){      
        photographerMedias.sort((a,b)=>{
            return a.title.localeCompare(b.title);
        });
    }

    document.querySelector('.photograph-main--media').innerHTML="";
    document.querySelector('.lightBox_modal-media').innerHTML="";
    photographerMediaCard(photographerMedias);
    initIncreaseLikes();
}
);

// Favoris Media
initIncreaseLikes();

// LightBox
// Close
closeLightBox_elt.addEventListener('click', closeLightbox);
// Open => photographerFactory > photographerMedia > LightBox
// Back
leftLightBox_elt.addEventListener("click", ()=>{
    const selected_elt = document.querySelector('.selected');
    backLightBox(photographerMedias, selected_elt);
});
// Next
rightLightBox_elt.addEventListener("click", ()=>{
    const selected_elt = document.querySelector('.selected');
    nextLightBox(photographerMedias, selected_elt)});