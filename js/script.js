// Creiamo array immagini
const imagesArray = [
    {
        title: "Spider-Man: Miles Morales",
        description: "Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.",
        image: "01.webp"
    },

    {
        title: "Ratchet & Clank: Rift Apart",
        description: "Viaggia tra le dimensioni con Ratchet e Clank e affronta un malvagio imperatore proveniente da un'altra realtà. Salta come un fulmine tra mondi ricchi d'azione, tutti immersi in panorami mozzafiato e completi di un arsenale totalmente folle.", 
        image: "02.webp"
    },

    {
        title: "FORTNITE",
        description: "Fortnite is a free-to-play Battle Royale game with numerous game modes for every type of game player. Watch a concert, build an island or fight.",
        image: "03.webp"
    },

    {
        title: "STRAY",
        description: "Stray è un'avventura in terza persona con protagonista un gatto, ambientata nei dettagliati vicoli illuminati al neon di una decadente città cibernetica e nel suo ventre più oscuro. Osserva il mondo dagli occhi di un gatto randagio e interagisci con l'ambiente in modi giocosi.",
        image: "04.webp"
    },

    {
        title: "AVENGERS",
        description: "Riunendo gli Avengers vestirai i panni di ogni membro del gruppo, scoprendo i dettagli sul loro modo di agire. Viaggia in tutto il mondo nei panni degli Avengers, per riaccenderne la fiducia prima che non resti più nulla da salvare.",
        image: "05.webp"
    }
]

// Creiamo dinamicamente i div con le immagini del carosello
let itemsContent = '';

for(let i = 0; i < imagesArray.length; i++){
    itemsContent += `<div class="item">
                         <img src="./img/${imagesArray[i].image}" alt="${imagesArray[i].image}">
                         <div class="title-description">
                             <h2>${imagesArray[i].title}</h2>
                             <p>${imagesArray[i].description}</p>
                         </div>
                     </div>`
}

// Inseriamo le immagini del thumbnails
const thumbnail = document.querySelector('.slide-img');

for(i = 0; i < imagesArray.length; i++) {
    thumbnail.innerHTML += `<div class="container-img">
                                <img src="./img/${imagesArray[i].image}" alt="${imagesArray[i].image}">
                                <div class="cover overlay"></div>
                            </div>`
}

// Creiamo un array di div class container-img
const containerImg = document.getElementsByClassName('container-img');

// Inseriamo le immagini nel div che le deve contenere
const itemsSlider = document.querySelector('.item-slider');
itemsSlider.innerHTML += itemsContent;

// Prendiamo la prima immagine dell'array e la rendiamo attiva
const img_side = document.getElementsByClassName('cover');
const items = document.getElementsByClassName('item');
let itemActive = 0;

items[itemActive].classList.add('active');
img_side[itemActive].classList.add('borderlined');
img_side[itemActive].classList.remove('overlay');

// Rendiamo attivo anche il primo cerchio
const circles = document.getElementsByClassName('circle');

circles[itemActive].classList.add('active');

const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

next.addEventListener('click', function() {
    forward();
});

prev.addEventListener('click', function() {
    backwards();
});

// Diamo addEventListener ad ogni elemento di containerImg del thumbnail
for (let i = 0; i < imagesArray.length; i++) {
    containerImg[i].addEventListener('click', function() {
        // Verifichiamo l'elemento precedente attivo
        const lastActiveItem = items[itemActive];
        const lastCircleActive = circles[itemActive];
        const lastImg_side = img_side[itemActive];

        // Disattiviamo l'elemento precedente
        lastActiveItem.classList.remove('active');
        lastImg_side.classList.remove('borderlined');
        lastImg_side.classList.add('overlay');
        lastCircleActive.classList.remove('active');

        // Rendo itemActive dello stesso valore dell'indice clickato
        itemActive = i;

        // Verifichiamo l'elemento clickato
        const activeItem = items[itemActive];
        const circleActive = circles[itemActive];
        const activeImg_side = img_side[itemActive];

        // Attiviamo l'elemento clickato
        activeItem.classList.add('active');
        activeImg_side.classList.add('borderlined');
        activeImg_side.classList.remove('overlay');
        circleActive.classList.add('active');
    })
}

// Autoplay, Pause e Reverse
let autoPlay = setInterval (forward, 3000);

document.getElementById('autoplay').addEventListener('click', function() {
    clearInterval (autoPlay);
    autoPlay = setInterval (forward, 3000);
})

document.getElementById('stop').addEventListener('click', function() {
    clearInterval (autoPlay);
})

document.getElementById('reverseplay').addEventListener('click', function() {
    clearInterval (autoPlay);
    autoPlay = setInterval (backwards, 3000);
})

// Funzioni per il forward e backwards
function forward() {
    // Verifichiamo l'elemento attivo (itemActive)
    const lastActiveItem = items[itemActive];
    const lastCircleActive = circles[itemActive];
    const lastImg_side = img_side[itemActive];
    
    // Incrementiamo il valore di 1
    if (itemActive == (items.length - 1)) {
        itemActive = 0;
    }
    else {
        itemActive++;
    }
    
    const activeItem = items[itemActive];
    const circleActive = circles[itemActive];
    const activeImg_side = img_side[itemActive];

    // Aggiungiamo la class active al nuovo elemento dell'array items e lo vado a rimuovere da quello precedente
    lastActiveItem.classList.remove('active');
    activeItem.classList.add('active');

    // Aggiungo e rimuovo l'overlay e il borderlined e lo ripeto nei Circle
    lastImg_side.classList.remove('borderlined');
    lastImg_side.classList.add('overlay');
    activeImg_side.classList.add('borderlined');
    activeImg_side.classList.remove('overlay');

    lastCircleActive.classList.remove('active');
    circleActive.classList.add('active');
}

function backwards() {
    // Verifichiamo l'elemento attivo (itemActive)
    const lastActiveItem = items[itemActive];
    const lastCircleActive = circles[itemActive];
    const lastImg_side = img_side[itemActive];

    if (itemActive == 0) {
        itemActive = (items.length - 1);
    }
    else {
        itemActive--;
    }

    const activeItem = items[itemActive];
    const circleActive = circles[itemActive];
    const activeImg_side = img_side[itemActive];
    
    lastActiveItem.classList.remove('active');
    activeItem.classList.add('active');

    // Aggiungiamo e rimuovo l'overlay e il borderlined e lo ripeto nei Circle
    lastImg_side.classList.remove('borderlined');
    lastImg_side.classList.add('overlay');
    activeImg_side.classList.add('borderlined');
    activeImg_side.classList.remove('overlay');

    lastCircleActive.classList.remove('active');
    circleActive.classList.add('active');
}