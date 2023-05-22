// Get Photographer Identity with ID
export function getPhotographer (id, data){
    for(let i = 0; i < data.photographers.length; i++){
        if(data.photographers[i].id === id){
            return data.photographers[i];
        }
    }
    return {};
}

// Get Photographer Media n Total Likes with ID
export function getPhotographerMediaLike (id, data){
    let medias = [];
    let totalLikes = 0;
    let count = 0;
    for(let i = 0; i < data.media.length; i++){
        if(data.media[i].photographerId === id){
            medias[count] = data.media[i];
            totalLikes += data.media[i].likes;
            count++
        }
    }
    return {medias, totalLikes};
}

// Return Photographer Information
export function getPhotographerInfo(id, data){
    const photographer = getPhotographer(id, data);
    const {medias, totalLikes} = getPhotographerMediaLike(id, data);

    return {photographer, medias, totalLikes}
}

// Import JSON-data.photographers in photographer.html
export function photographerPage(data, like){
    const { name, portrait, city, country, tagline, price} = data;

    const info_elt = document.querySelector('.photograph-header--info');
    const photographerName = document.createElement('h1');
    photographerName.textContent = name;
    // Location
    const photographerLocation = document.createElement('p');
    photographerLocation.className = 'photographer--location';
    photographerLocation.textContent = `${city}, ${country}`
    // Tagline
    const photographerTagline = document.createElement('p');
    photographerTagline.className = 'photographer--tagline';
    photographerTagline.textContent = tagline;
    info_elt.appendChild(photographerName);
    info_elt.appendChild(photographerLocation);
    info_elt.appendChild(photographerTagline);

    const picture = `assets/photographers/mini/${portrait}`;
    // Picture (portrait)
    const img_elt = document.querySelector(".picture")
    img_elt.src = picture;
    img_elt.alt = `${name}`;

    // Footer
    const likeNPrice_elt = document.querySelector('.photograph-footer');
    const photographerLikes = document.createElement('p');
    photographerLikes.innerHTML = `<span class="photographerLikes">${like}</span> <img src="assets/icons/heart-solid.svg" alt="Likes" aria-label="Likes">`;
    const photographerPrice = document.createElement('p');
    photographerPrice.textContent = `${price}€ / jour`;
    likeNPrice_elt.appendChild(photographerLikes);
    likeNPrice_elt.appendChild(photographerPrice);
}

// Import JSON-Data.media in photographer.html
export function photographerMediaCard(data){
    // DOM Elements
    const mediaSection_elt = document.querySelector('.photograph-main--media');
    const lightBoxModalCard_elt = document.querySelector('.lightBox_modal-media');

    let mediaIndex = 0;

    for(const media in data){
        const {id, photographerId, title, image, video, likes, date} = data[media];
    
        const mediaCard = document.createElement('section');
        mediaCard.className = `photograph-main--media-Card`;
        mediaCard.setAttribute('data-date', `${date}`);
        mediaCard.setAttribute('data-likes' , `${likes}`);
        mediaCard.setAttribute('data-title', `${title}`)
        mediaCard.id = `section-${id}`;
        const mediaArt = document.createElement('a');
        mediaArt.href = "#";
        mediaCard.appendChild(mediaArt);

        let html_img_small = `<img src="assets/media/${photographerId}/mini/${image}" alt="${title}, closeup view">`;
        let html_video_small = `<video src="assets/media/${photographerId}/${video}" role="img" tabindex="-1">
                                <p>Video de ${title}</p></video>`;
        if(video === undefined){   
            mediaArt.insertAdjacentHTML("beforeend", html_img_small);
        }else{
            mediaArt.insertAdjacentHTML("beforeend", html_video_small);
        }

        const mediaInfo = document.createElement('div');
        mediaInfo.className = 'photograph-main--media-Card_info'
    
        const mediaTitle = document.createElement('p');
        mediaTitle.textContent = title;
        const mediaLikes = document.createElement('p');
        mediaLikes.innerHTML = `<span class="media-likes media-likes-${mediaIndex}">${likes}</span> 
                                <input type="checkbox" id="input-${id}" name="heart-${id}" class="getLikes"> 
                                <label for="input-${id}" ><img src="assets/icons/heart-regular.svg" alt="Likes" aria-label="Ajouter un like."></label>`;
        mediaInfo.appendChild(mediaTitle);
        mediaInfo.appendChild(mediaLikes);
        mediaCard.appendChild(mediaInfo);
        mediaSection_elt.appendChild(mediaCard);

        // LightBox
        let html_img_large = `<section id="${id}" class="media-lightbox media-lightbox-${id} media-selected">
                                <img  class="picture-large" src="assets/media/${photographerId}/mini/${image}" alt="${title}">
                                <p>${title}</p>
                              </section>`;
        let html_video_large = `<section id="${id}" class="media-lightbox media-lightbox-${id} media-selected">
                                    <video " src="assets/media/${photographerId}/${video}" controls>
                                        <p>Video de ${title}</p>
                                    </video>
                                    <p>${title}</p>
                                </section>`;
        if(video === undefined){   
            lightBoxModalCard_elt.insertAdjacentHTML("beforeend", html_img_large);
        }else{
            lightBoxModalCard_elt.insertAdjacentHTML("beforeend", html_video_large);
        }

        // Remove all media-selected of media-lightbox Element and add media-selected on the selected media-lightbox element
        mediaArt.addEventListener('click',(e)=>{
            e.preventDefault();
            const mediaLightbox_elts = document.querySelectorAll(".media-lightbox");
            for(let i=0; i<mediaLightbox_elts.length; i++){
                mediaLightbox_elts[i].classList.remove("media-selected");
            }
            const mediaLightBoxSelected_elt = document.querySelector(`.media-lightbox-${id}`);
            mediaLightBoxSelected_elt.classList.add("media-selected");
            displayLightbox(mediaLightBoxSelected_elt);
        });     
        mediaIndex++
    }
}

// select
export function onSelectFilterChanged(){
    const select_elt = document.querySelector('select');
    const mediaCard_elts = document.querySelectorAll(".photograph-main--media-Card");
    const tempSort = [];
    for (let i = 0; i<mediaCard_elts.length; i++){
        tempSort[i]=mediaCard_elts[i];
    }
    select_elt.addEventListener('change',(e)=>{
        const option = e.target.selectedIndex;
        if(option === 0){
            tempSort.sort((a,b)=>{
                return b.getAttribute("data-likes") - a.getAttribute("data-likes");
            });
            for (let i = 0; i<mediaCard_elts.length; i++){
                for(let j = 0; j<tempSort.length; j++){
                    if(mediaCard_elts[i].id === tempSort[j].id){
                        mediaCard_elts[i].style.order = `${j}`;
                        break;
                    }
                }
            }
        } else if(option === 1){ 
            tempSort.sort((a,b)=>{
                return new Date(b.getAttribute("data-date")).getTime() - new Date(a.getAttribute("data-date")).getTime();
            });
            for (let i = 0; i<mediaCard_elts.length; i++){
                for(let j = 0; j<tempSort.length; j++){
                    if(mediaCard_elts[i].id === tempSort[j].id){
                        mediaCard_elts[i].style.order = `${j}`;
                        break;
                    }
                }
            }
        } else if(option === 2){      
            tempSort.sort((a,b)=>{
                return a.getAttribute("data-title").localeCompare(b.getAttribute("data-title"));
            });
            for (let i = 0; i<mediaCard_elts.length; i++){
                for(let j = 0; j<tempSort.length; j++){
                    if(mediaCard_elts[i].id === tempSort[j].id){
                        mediaCard_elts[i].style.order = `${j}`;
                        break;
                    }
                }
            }
        }
    });
}