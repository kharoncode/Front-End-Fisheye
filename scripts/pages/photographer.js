async function getPhotographers() {
    return await fetch('../data/photographers.json').then(photographers => photographers.json());
} 

let params = (new URL(document.location)).searchParams;
let id = parseInt(params.get('id'));

const main = document.querySelector('main');
const photographerName = document.createElement('p');
photographerName.textContent = "test";
main.appendChild(photographerName);

