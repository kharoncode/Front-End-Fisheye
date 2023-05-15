// Import
import {photographerPage, photographerMedia, getPhotographerInfo, increaseLikes} from "../factories/photographerFactory.js";

// DOM Element
const modalName_elt = document.querySelector('.modal header h3');
const select_elt = document.querySelector('select');

// Fetch photographers.json
const photographers = await fetch('./data/photographers.json').then(photographers => photographers.json());
// Get Photographer ID
let params = (new URL(document.location)).searchParams;
let id = parseInt(params.get('id'));

// Initialisation
const {photographer, totalLikes, medias} = getPhotographerInfo(id, photographers);
modalName_elt.textContent = `${photographer.name}`;
photographerPage(photographer, totalLikes);
medias.sort((a,b)=>{ // Default Select = Date
    return new Date(b.date).getTime() - new Date(a.date).getTime();
});
photographerMedia(medias);

// Select
select_elt.addEventListener('change',(e)=>{
    const option = e.target.selectedIndex;
    if(option === 0){
        medias.sort((a,b)=>{
            return b.likes - a.likes;
        });
    } else if(option === 1){ 
        medias.sort((a,b)=>{
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
    } else if(option === 2){      
        medias.sort((a,b)=>{
            return a.title.localeCompare(b.title);
        });
    }
    document.querySelector('.photograph-main--media').innerHTML="";
    document.querySelector('.lightBox_modal').innerHTML="";
    photographerMedia(medias);
}
);

// Favoris Media
const inputLikes_elt = document.querySelectorAll('.getLikes')
for(let i =0; i<inputLikes_elt.length; i++){
    const mediaLike = document.querySelector(`.media-likes-${i}`);
    inputLikes_elt[i].addEventListener('click', (e)=>{increaseLikes(e, mediaLike)})
}