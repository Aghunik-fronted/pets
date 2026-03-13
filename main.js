document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.header__burger'); 
    const menu = document.querySelector('.header__main-menu');
    const overlay = document.querySelector('.overlay');
    const body = document.body;
    const navLinks = document.querySelectorAll('.main-menu__link');

    if (!burger || !menu) {
        console.error("Ошибка: Бургер или Меню не найдены в HTML!");
        return;
    }

    function toggleMenu() {
        burger.classList.toggle('active');
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('lock');
    }

    burger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menu.classList.contains('active')) toggleMenu();
        });
    });
});


const petsData = [
    {name: "Katrine", img: "images/pets-katrine.jpg" },
    {name: "Jennifer", img: "images/pets-jennifer.jpg" },
    {name: "Woody", img: "images/pets-woody.jpg" },
    {name: "Sophia", img: "images/pets-katrine.jpg" },
    {name: "Timmy", img: "images/pets-jennifer.jpg" },
    {name: "Charly", img: "images/pets-woody.jpg" },
    {name: "Scarlett", img: "images/pets-katrine.jpg" },
    {name: "Freddie", img: "images/pets-jennifer.jpg" }
];

const btnLeft = document.querySelector('.slider__arrow--left');
const btnRight = document.querySelector('.slider__arrow--right');
const sliderWrapper = document.querySelector('.slider__wrapper');

let currentPetsIndices = [];

const getCardsCount = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1280) return 3;
    if (screenWidth >= 768) return 2;
    return 1;
};

const generateRandomIndices = (count, excludeIndices) => {
    const newIndices = [];
    const availableIndices = petsData
    .map((_, index) => index)
    .filter(index => !excludeIndices.includes(index));

    while (newIndices.length < count) {
        const randomIndex = Math.floor(Math.random() * availableIndices.length);
        const petIndex = availableIndices.splice(randomIndex, 1)[0];
        newIndices.push(petIndex);
    }
    return newIndices;
};

const createCardElement = (petIndex) => {
    const pet = petsData[petIndex];
    const cardDiv  = document.createElement('div');
    cardDiv.classList.add('slider__item');
    cardDiv.innerHTML = `
        <a class="friends-item" href="#">
            <div class="friends-item__image-container">
                <img src="${pet.img}" alt="${pet.name}">
            </div>
            <div class="friends-item__title">${pet.name}</div>
            <div class="friends-item__button button button--round">Learn more</div>
        </a>`;
    return cardDiv;
};

const initSlider = () => {
    const cardsCount = getCardsCount();
    const currentPetsIndices = generateRandomIndices(cardsCount, []);
    sliderWrapper.innerHTML = "";
    currentPetsIndices.forEach(index => {
        sliderWrapper.appendChild(createCardElement(index));
    });
};

const handleMove = () => {
    const cardsCount = getCardsCount();
    const nextPetsIndices = generateRandomIndices(cardsCount, currentPetsIndices);
    sliderWrapper.innerHTML = "";
    nextPetsIndices.forEach(index => {
        sliderWrapper.appendChild(createCardElement(index));
    });

    currentPetsIndices = nextPetsIndices;
};

window.addEventListener('load', initSlider);
window.addEventListener('resize', initSlider);
btnRight.addEventListener('click', handleMove);
btnLeft.addEventListener('click', handleMove);