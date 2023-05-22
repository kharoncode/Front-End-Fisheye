// Increase Photographers Likes and Media Likes when user add like to media
export function increaseLikes(element, mediaLike, totalLikes){
    const photographerLikes = document.querySelector('.photographerLikes');
    const inputLikes_elts = document.querySelectorAll('.getLikes');
    const labelHeart_elts = document.querySelectorAll('.photograph-main--media-Card_info input + label');
    let addLikes = 0;
    for(let i=0; i<inputLikes_elts.length; i++){
        if(inputLikes_elts[i].checked){
            addLikes++
        }
    }
    if(element.target.checked){
        mediaLike.textContent++
        photographerLikes.textContent = (totalLikes+addLikes);
        for(let i=0; i<labelHeart_elts.length; i++){
            if(labelHeart_elts[i].htmlFor === element.target.id){
                labelHeart_elts[i].innerHTML = `<img src="assets/icons/heart-solid.svg" alt="Likes" aria-label="Likes">`;
                break;
            }
        }
        
    } else {
        mediaLike.textContent--
        photographerLikes.textContent = (totalLikes+addLikes);
        for(let i=0; i<labelHeart_elts.length; i++){
            if(labelHeart_elts[i].htmlFor === element.target.id){
                labelHeart_elts[i].innerHTML = `<img src="assets/icons/heart-regular.svg" alt="Likes" aria-label="Likes">`;
                break;
            }
        }
        
    }
}

// Initialisation of increaseLikes function
export function initIncreaseLikes(totalLikes) {
    const inputLikes_elts = document.querySelectorAll('.getLikes');
    for(let i=0; i<inputLikes_elts.length; i++){
        const mediaLike = document.querySelector(`.media-likes-${i}`);
        inputLikes_elts[i].addEventListener('click', (e)=>{increaseLikes(e, mediaLike, totalLikes)});
    }
}