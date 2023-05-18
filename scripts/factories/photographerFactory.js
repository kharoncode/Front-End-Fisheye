// Import JSON-data in index.html
export function photographerCard(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/mini/${portrait}`;

    function getUserCardDOM() {
        // Photographer Card
        const article = document.createElement( 'article' );
        article.classList.add('photographer-card')
        // Anchor
        const anchorElement = document.createElement('a');
        anchorElement.href = `photographer.html?id=${id}`;
        // Picture (portrait)
        const img = document.createElement( 'img' );
        img.src = picture;
        img.alt = `${name}`;
        // Name
        const photographerName = document.createElement( 'h2' );
        photographerName.textContent = name;
        anchorElement.appendChild(img);
        article.appendChild(anchorElement);
        anchorElement.appendChild(photographerName);
        
        // Information
        const div = document.createElement('div');
        div.classList.add('photographer-info')
        // Location
        article.appendChild(div);
        const photographerLocation = document.createElement('p');
        photographerLocation.className = 'photographer-info--location';
        photographerLocation.textContent = `${city}, ${country}`
        // Tagline
        const photographerTagline = document.createElement('p');
        photographerTagline.className = 'photographer-info--tagline';
        photographerTagline.textContent = tagline;
        // Price
        const photographerPrice = document.createElement('p');
        photographerPrice.className = 'photographer-info--price';
        photographerPrice.textContent = `${price}€/jour`
        div.appendChild(photographerLocation);
        div.appendChild(photographerTagline);
        div.appendChild(photographerPrice);
        
        return (article);
    }
    return { name, picture, getUserCardDOM }
}

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

// Increase Photographers Likes and Media Likes when user add like to media
export function increaseLikes(element, mediaLike, totalLikes){
    const photographerLikes = document.querySelector('.photographerLikes');
    const inputLikes_elt = document.querySelectorAll('.getLikes');
    const labelHeart_elt = document.querySelectorAll('.photograph-main--media-Card_info input + label');
    let addLikes = 0;
    for(let i=0; i<inputLikes_elt.length; i++){
        if(inputLikes_elt[i].checked){
            addLikes++
        }
    }
    if(element.target.checked){
        mediaLike.textContent++
        photographerLikes.textContent = (totalLikes+addLikes);
        for(let i=0; i<labelHeart_elt.length; i++){
            if(labelHeart_elt[i].htmlFor === element.target.id){
                labelHeart_elt[i].innerHTML = `<img src="assets/icons/heart-solid.svg" alt="Likes" aria-label="Likes">`;
            }
        }
        
    } else if(!element.target.checked){
        mediaLike.textContent--
        photographerLikes.textContent = (totalLikes+addLikes);
        for(let i=0; i<labelHeart_elt.length; i++){
            if(labelHeart_elt[i].htmlFor === element.target.id){
                labelHeart_elt[i].innerHTML = `<img src="assets/icons/heart-regular.svg" alt="Likes" aria-label="Likes">`;
            }
        }
        
    }
}

// Initialisation of increaseLikes function
export function initIncreaseLikes(totalLikes) {
    const inputLikes_elt = document.querySelectorAll('.getLikes');
    for(let i=0; i<inputLikes_elt.length; i++){
        const mediaLike = document.querySelector(`.media-likes-${i}`);
        inputLikes_elt[i].addEventListener('click', (e)=>{increaseLikes(e, mediaLike, totalLikes)})
    }
}

// Import JSON-data in photographer.html
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

// Import JSON-Data Media in photographer.html
export function photographerMediaCard(data){
    // DOM Elements
    const mediaSection_elt = document.querySelector('.photograph-main--media');
    const lightBoxModalCard_elt = document.querySelector('.lightBox_modal-media');

    let mediaIndex = 0;

    for(const media in data){
        const {id, photographerId, title, image, video, likes} = data[media];
    
        const mediaCard = document.createElement('section');
        mediaCard.className = `photograph-main--media-Card`
        const mediaArt = document.createElement('a');
        mediaArt.href = "#";
        mediaCard.appendChild(mediaArt);

        let html_img_small = `<img src="assets/media/${photographerId}/mini/${image}" alt="Image de ${title}">`;
        let html_video_small = `<video src="assets/media/${photographerId}/${video}" role="img">
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
                                <input type="checkbox" id="input-${id}" name="heart" class="getLikes"> 
                                <label for="input-${id}" ><img src="assets/icons/heart-regular.svg" alt="Likes" aria-label="Likes"></label>`;
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
                                    <video " src="assets/media/${photographerId}/${video}" autoplay="on" loop="">
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
            const mediaLightbox_elt = document.querySelectorAll(".media-lightbox");
            for(let i=0; i<mediaLightbox_elt.length; i++){
                mediaLightbox_elt[i].classList.remove("media-selected");
            }
            document.querySelector(`.media-lightbox-${id}`).classList.add("media-selected");
            displayLightbox();
        });
        
        mediaIndex++
    }

}