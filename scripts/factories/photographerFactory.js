export function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const photographerName = document.createElement( 'h2' );
        photographerName.textContent = name;
        const photographerLocation = document.createElement('h3');
        photographerLocation.textContent = `${city}, ${country}`
        const photographerTagline = document.createElement('h4');
        photographerTagline.textContent = tagline;
        const photographerPrice = document.createElement('p');
        photographerPrice.textContent = `${price}€/jour`
        article.appendChild(img);
        article.appendChild(photographerName);
        article.appendChild(photographerLocation);
        article.appendChild(photographerTagline);
        article.appendChild(photographerPrice);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}