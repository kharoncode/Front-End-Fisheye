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
        anchorElement.style.display = "block";
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