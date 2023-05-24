// Import
import {photographerPage, photographerMediaCard, getPhotographerInfo, initSelectFilterChanged} from "../factories/photographer.js";

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
}
init();