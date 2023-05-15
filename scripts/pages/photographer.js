// Import
import {photographerPage, photographerMedia, getPhotographerInfo} from "../factories/photographerFactory.js";

// DOM Element
const modalName_elt = document.querySelector('.modal header h3');
const select_elt = document.querySelector('select');

// Fetch photographers.json
const photographers = await fetch('./data/photographers.json').then(photographers => photographers.json());
// Get Photographer ID
let params = (new URL(document.location)).searchParams;
let id = parseInt(params.get('id'));

// Initialisation
const {photographer, totalLikes, media} = getPhotographerInfo(id, photographers);
modalName_elt.textContent = `${photographer.name}`;
photographerPage(photographer, totalLikes);
photographerMedia(media);

// Select
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
);

// Increase Photographers Likes when add like to media
const inputLikes_elt = document.querySelectorAll('.getLikes')
for(let i =0; i<inputLikes_elt.length; i++){
    const mediaLike = document.querySelector(`.media-likes-${i}`);
    const photographerLikes = document.querySelector('.photographerLikes');
    inputLikes_elt[i].addEventListener('click', ()=>{
        let getLikes = 0;
        if(inputLikes_elt[i].checked){
            mediaLike.textContent++
        } else {
            mediaLike.textContent--
        }
        for(let i =0; i<inputLikes_elt.length; i++){
            if(inputLikes_elt[i].checked){
                getLikes ++;
            }
        }
        let likes = getLikes + totalLikes;
        photographerLikes.textContent = `${likes}`; 
    })
}