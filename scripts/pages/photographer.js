import {displayModal, closeModal} from "../utils/contactForm.js";
import {photographerPage, photographerMedia, getPhotographer, getPhotographerMediaLike} from "../factories/photographerFactory.js"

// Photographer Page
const photographers = await fetch('./data/photographers.json').then(photographers => photographers.json());

let params = (new URL(document.location)).searchParams;
let id = parseInt(params.get('id'));

async function getPhotographerInfo(id, data){
    const photographer = getPhotographer(id, data);
    const likes = getPhotographerMediaLike(id, data).likes;
    const media = getPhotographerMediaLike(id, data).media;

    return {photographer, likes, media}
}

const {photographer, likes, media} = await getPhotographerInfo(id, photographers);
photographerPage(photographer, likes);

for (const [key, value] of Object.entries(media)) {
    photographerMedia(value)
  }


  
// Modal
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