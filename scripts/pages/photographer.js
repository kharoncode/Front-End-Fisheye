import {displayModal, closeModal, firstNameModal} from "../utils/contactForm.js";
import {photographerPage, photographerMedia, getPhotographerInfo} from "../factories/photographerFactory.js"

// Fetch photographers.json
const photographers = await fetch('./data/photographers.json').then(photographers => photographers.json());
// Get Photographer ID
let params = (new URL(document.location)).searchParams;
let id = parseInt(params.get('id'));

// Initialisation
const {photographer, likes, media} = getPhotographerInfo(id, photographers);
photographerPage(photographer, likes);
photographerMedia(media);

// Select
const select_elt = document.querySelector('select');
select_elt.addEventListener('change',(e)=>{
    const option = e.target.selectedIndex;
    if(option === 0){
        media.sort((a,b)=>{
            return b.likes - a.likes;
        });
    } else if(option === 1){ 
        media.sort((a,b)=>{
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
    } else if(option === 2){      
        media.sort((a,b)=>{
            return a.title.localeCompare(b.title);
        });
    }
    document.querySelector('.photograph-main--media').innerHTML="";
    photographerMedia(media);
}
)

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

// test
document.querySelector('#first').addEventListener('change', (e)=>{
    e.target.value = firstNameModal(e.target, e.target.value).data;
})