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
        img.alt = `Portrait de ${name}`;
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
    const img = document.querySelector(".picture")
    img.src = picture;
    img.alt = `Portrait de ${name}`;

    // Footer
    const likeNPrice = document.querySelector('.photograph-footer');
    const photographerLike = document.createElement('p');
    photographerLike.innerHTML = `${like} <i class="fa-solid fa-heart"></i>`;
    const photographerPrice = document.createElement('p');
    photographerPrice.textContent = `${price}€ / jour`;
    likeNPrice.appendChild(photographerLike);
    likeNPrice.appendChild(photographerPrice);
}

// Import JSON-Data Media in photographer.html
export function photographerMedia(data){
    const {photographerId, title, image, likes, date, price} = data;

    const mediaSection = document.querySelector('.photograph-main--media');

    const picture = `assets/media/${photographerId}/mini/${image}`;
    const mediaCard = document.createElement('div');
    mediaCard.className = 'photograph-main--media-Card'

    const img = document.createElement('img');
    img.src = picture;
    img.alt = `Image de ${title}`;
    const mediaTitle = document.createElement('p');
    mediaTitle.textContent = title;
    const mediaLikes = document.createElement('p');
    mediaLikes.innerHTML = `${likes} <i class="fa-solid fa-heart"></i>`;
    mediaCard.appendChild(img);
    mediaCard.appendChild(mediaTitle);
    mediaCard.appendChild(mediaLikes);
    mediaSection.appendChild(mediaCard);
}

// Get Photographer Information with ID
export function getPhotographer (id, data){
    for(let i = 0; i < data.photographers.length; i++){
        if(data.photographers[i].id === id){
            return data.photographers[i];
        }
    }
    return {};
}

// Get Photographer Media n Likes with ID
export function getPhotographerMediaLike (id, data){
    let media = {};
    let likes = 0;
    for(let i = 0; i < data.media.length; i++){
        if(data.media[i].photographerId === id){
            media[i] = data.media[i];
            likes += data.media[i].likes;
        }
    }
    return {media, likes};
}

// Sort Media
export function sortPhotographerMedia (media, filter){
    const mediaSection = document.querySelector('.photograph-main--media');
    
}