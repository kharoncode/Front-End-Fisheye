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
    const img_elt = document.querySelector(".picture")
    img_elt.src = picture;
    img_elt.alt = `Portrait de ${name}`;

    // Footer
    const likeNPrice_elt = document.querySelector('.photograph-footer');
    const photographerLikes = document.createElement('p');
    photographerLikes.innerHTML = `<span class="photographerLikes">${like}</span> <i class="fa-solid fa-heart"></i>`;
    const photographerPrice = document.createElement('p');
    photographerPrice.textContent = `${price}€ / jour`;
    likeNPrice_elt.appendChild(photographerLikes);
    likeNPrice_elt.appendChild(photographerPrice);
}

// Import JSON-Data Media in photographer.html
export function photographerMedia(data){
    let mediaIndex = 0;
    for(const media in data){
        const {id, photographerId, title, image, video, likes} = data[media];
    
        const mediaSection_elt = document.querySelector('.photograph-main--media');
        const mediaCard = document.createElement('div');
        mediaCard.className = 'photograph-main--media-Card'

        if(video === undefined){   
            const img = document.createElement('img');
            img.src = `assets/media/${photographerId}/mini/${image}`;
            img.alt = `Image de ${title}`;
            mediaCard.appendChild(img);
        }else{
            const movie = document.createElement('video');
            movie.width = "350";
            movie.height = "300";
            movie.setAttribute("controls", "");
            const movieAlt = document.createElement('p');
            movieAlt.innerText = `Video de ${title}`;
            const source = document.createElement('source');
            source.src = `assets/media/${photographerId}/${video}`;
            source.type="video/mp4";
            mediaCard.appendChild(movie);
            movie.appendChild(source);
            movie.appendChild(movieAlt);
        }
    
        const mediaTitle = document.createElement('p');
        mediaTitle.textContent = title;
        const mediaLikes = document.createElement('p');
        mediaLikes.innerHTML = `<span class="media-likes media-likes-${mediaIndex}">${likes}</span> <input type="checkbox" id="${id}" name="heart" class="getLikes"> <label for="${id}" ><i class="fa-regular fa-heart"></i></label>`;
        mediaCard.appendChild(mediaTitle);
        mediaCard.appendChild(mediaLikes);
        mediaSection_elt.appendChild(mediaCard);
        mediaIndex++
    }
    
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
    let media = [];
    let totalLikes = 0;
    for(let i = 0; i < data.media.length; i++){
        if(data.media[i].photographerId === id){
            media[i] = data.media[i];
            totalLikes += data.media[i].likes;
        }
    }
    return {media, totalLikes};
}

// Return Photographer Information
export function getPhotographerInfo(id, data){
    const photographer = getPhotographer(id, data);
    const {media, totalLikes} = getPhotographerMediaLike(id, data);

    return {photographer, media, totalLikes}
}