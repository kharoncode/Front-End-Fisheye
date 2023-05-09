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

function getPhotographer (id, photographers){
    let photographer = {};
    for(let i = 0; i < photographers.photographers.length; i++){
        if(photographers.photographers[i].id === id){
            photographer = photographers.photographers[i];
        }
    }
    return photographer;
}

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

// Modal Name
const modalName = document.querySelector('.modal header h3');
modalName.textContent = `${photographName}`;