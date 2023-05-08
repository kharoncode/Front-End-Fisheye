export function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

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
        anchorElement.appendChild(photographerName);
        article.appendChild(anchorElement);

        // Information
        const div = document.createElement('div');
        div.classList.add('photographer-info')
        article.appendChild(div);
        // Location
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