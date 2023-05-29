// Import
import { initLightBox } from "../utils/lightBox.js";
import { photographerPage, photographerMediaCard, getPhotographerInfo } from "../factories/photographer.js";
import { initIncreaseLikes } from "../factories/favoris.js";

// select
function initSelectFilterChanged(photographerMedias,totalLikes){
    const select_elt = document.querySelector('select');
    const mediaCard_elts = document.querySelectorAll(".photograph-main--media-Card");
    const tempSort = [];
    for (let i = 0; i<mediaCard_elts.length; i++){
        tempSort[i]=mediaCard_elts[i];
    }
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

}

async function init(){
    // Fetch photographers.json
    const photographers = await fetch('./data/photographers.json').then(photographers => photographers.json());
    // Get Photographer ID
    let params = (new URL(document.location)).searchParams;
    let id = parseInt(params.get('id'));
    // Get Photographer Data
    const {photographer, totalLikes, medias:photographerMedias} = getPhotographerInfo(id, photographers);
    // Add Name in Contact Modal
    const modalName_elt = document.querySelector('.modal header h2');
    modalName_elt.innerHTML = `Contactez-moi </br> ${photographer.name}`;
    modalName_elt.setAttribute("aria-label", `Contactez-moi ${photographer.name}`)
    // Show Photographer Info
    photographerPage(photographer, totalLikes);
    // Default Select = Date
    photographerMedias.sort((a,b)=>{
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    // Show Photographer Media 
    photographerMediaCard(photographerMedias);
    // Add function to increase Likes
    initIncreaseLikes(totalLikes);
    // Add function to sort Photographer Media with Select
    initSelectFilterChanged(photographerMedias, totalLikes);
    // test
    initLightBox();
}

init();