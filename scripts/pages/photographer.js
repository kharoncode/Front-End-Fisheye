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

// Photographer Page
const photographers = await fetch('./data/photographers.json').then(photographers => photographers.json());

let params = (new URL(document.location)).searchParams;
let id = parseInt(params.get('id'));

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

console.log(getPhotographerMedia(id, photographers));

const { name:photographName, portrait, city, country, tagline, price} = getPhotographer(id, photographers);

const info = document.querySelector('.photograph-header--info');
const photographerName = document.createElement('h2');
photographerName.textContent = photographName;
// Location
const photographerLocation = document.createElement('p');
photographerLocation.className = 'photographer--location';
photographerLocation.textContent = `${city}, ${country}`
// Tagline
const photographerTagline = document.createElement('p');
photographerTagline.className = 'photographer--tagline';
photographerTagline.textContent = tagline;
info.appendChild(photographerName);
info.appendChild(photographerLocation);
info.appendChild(photographerTagline);

const picture = `assets/photographers/${portrait}`;
// Picture (portrait)
const img = document.querySelector(".picture")
img.src = picture;
img.alt = `Portrait de ${photographName}`;

// Footer
const likeNPrice = document.querySelector('.photograph-footer');
const photographerLike = document.createElement('p');
let totalLike = getPhotographerLike(id, photographers);
photographerLike.innerHTML = `${totalLike} <i class="fa-solid fa-heart"></i>`;
const photographerPrice = document.createElement('p');
photographerPrice.textContent = `${price}€ / jour`;
likeNPrice.appendChild(photographerLike);
likeNPrice.appendChild(photographerPrice);

// Modal Name
const modalName = document.querySelector('.modal header h3');
modalName.textContent = `${photographName}`;