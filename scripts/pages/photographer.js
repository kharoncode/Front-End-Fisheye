// Import
import {photographerPage, photographerMediaCard, getPhotographerInfo, initIncreaseLikes} from "../factories/photographerFactory.js";

// DOM Element
const modalName_elt = document.querySelector('.modal header h2');
const select_elt = document.querySelector('select');


// Fetch photographers.json
const photographers = await fetch('./data/photographers.json').then(photographers => photographers.json());
// Get Photographer ID
let params = (new URL(document.location)).searchParams;
let id = parseInt(params.get('id'));

// Initialisation
const {photographer, totalLikes, medias:photographerMedias} = getPhotographerInfo(id, photographers);
function init(){
    modalName_elt.textContent = `Contactez-moi ${photographer.name}`;
    modalName_elt.setAttribute("aria-label", `Contactez-moi ${photographer.name}`)
    photographerPage(photographer, totalLikes);
    photographerMedias.sort((a,b)=>{ // Default Select = Date
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    photographerMediaCard(photographerMedias);
}
init();
initIncreaseLikes(totalLikes);


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
    initIncreaseLikes(totalLikes);
});
