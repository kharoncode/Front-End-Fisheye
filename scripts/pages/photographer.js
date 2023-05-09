import {photographerPage, photographerMedia} from "../factories/photographerFactory.js"
// Photographer Page
const photographers = await fetch('./data/photographers.json').then(photographers => photographers.json());

let params = (new URL(document.location)).searchParams;
let id = parseInt(params.get('id'));

async function getPhotographerInfo(id, data){
    // Get Photographer Information with ID
    function getPhotographer (id, data){
        let photographer = {};
        for(let i = 0; i < data.photographers.length; i++){
            if(data.photographers[i].id === id){
                photographer = data.photographers[i];
            }
        }
        return photographer;
    }

    // Get Photographer total Likes with ID
    function getPhotographerLike (id, data){
        let like = 0;
        for(let i = 0; i < data.media.length; i++){
            if(data.media[i].photographerId === id){
                like += data.media[i].likes;
            }
        }
        return like;
    }

    // Get Photographer Media with ID
    function getPhotographerMedia (id, data){
        let media = {};
        for(let i = 0; i < data.media.length; i++){
            if(data.media[i].photographerId === id){
                media[i] = data.media[i];
            }
        }
        return media;
    }

    const photographer = getPhotographer(id, data);
    const likes = getPhotographerLike(id, data);
    const media = getPhotographerMedia(id, data);

    return {photographer, likes, media}
}

const {photographer, likes, media} = await getPhotographerInfo(id, photographers);
photographerPage(photographer, likes);

for (const [key, value] of Object.entries(media)) {
    photographerMedia(value)
  }

// Modal
import {displayModal, closeModal} from "../utils/contactForm.js";
// open/close
document.querySelector('.open').addEventListener("click", displayModal);
document.querySelector('.close').addEventListener("click", closeModal);
// submit
const submit = document.querySelector('.form');
submit.addEventListener('submit', (event)=>{
    event.preventDefault();
    closeModal();
})
// Modal Name
const modalName = document.querySelector('.modal header h3');
modalName.textContent = `${photographer.name}`;