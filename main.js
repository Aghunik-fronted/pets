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
    { name: "Katrine", img: "images/pets-katrine.jpg" },
    { name: "Jennifer", img: "images/pets-jennifer.jpg" },
    { name: "Woody", img: "images/pets-woody.jpg" },
    { name: "Sophia", img: "images/4.jpg" },
    { name: "Timmy", img: "images/pets-timmy.png" },
    { name: "Charly", img: "images/pets-charly.jpg" },
    { name: "Scarlett", img: "images/pets-scarlet.jpg" },
    { name: "Freddie", img: "images/8.jpg" }
];

const btnLeft = document.querySelector('.slider__arrow--left');
const btnRight = document.querySelector('.slider__arrow--right');
const sliderWrapper = document.querySelector('.slider__wrapper');

let currentPetsIndices = [];
let previousPetsIndices = []; 

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
    const cardDiv = document.createElement('div');
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

const renderWithAnimation = (nextIndices) => {
    const currentCards = document.querySelectorAll('.slider__item');
    currentCards.forEach(card => card.style.opacity = '0');

    setTimeout(() => {
        sliderWrapper.innerHTML = "";
        nextIndices.forEach(index => {
            const card = createCardElement(index);
            card.style.opacity = '0';
            sliderWrapper.appendChild(card);
            setTimeout(() => card.style.opacity = '1', 50);
        });
        previousPetsIndices = currentPetsIndices;
        currentPetsIndices = nextIndices;
    }, 300);
};

const initSlider = () => {
    const count = getCardsCount();
    currentPetsIndices = generateRandomIndices(count, []);
    sliderWrapper.innerHTML = "";
    currentPetsIndices.forEach(index => sliderWrapper.appendChild(createCardElement(index)));
};

if (btnRight && btnLeft) {
    btnRight.addEventListener('click', () => {
        const count = getCardsCount();
        const nextIndices = generateRandomIndices(count, currentPetsIndices);
        renderWithAnimation(nextIndices);
    });

    btnLeft.addEventListener('click', () => {
        const count = getCardsCount();
        if (previousPetsIndices.length === count) {
            renderWithAnimation(previousPetsIndices);
            previousPetsIndices = []; 
        } else {
            const nextIndices = generateRandomIndices(count, currentPetsIndices);
            renderWithAnimation(nextIndices);
        }
    });

    window.addEventListener('load', initSlider);
    window.addEventListener('resize', initSlider);
}
const petsGrid = document.querySelector('.friends__grid');

if (petsGrid && !document.querySelector('.slider__wrapper')) {
    let fullPetsList = [];
    let currentPage = 1;


    const generate48Pets = () => {
    let res = [];
    for (let i = 0; i < 6; i++) {
        const group = [0, 1, 2, 3, 4, 5, 6, 7].sort(() => Math.random() - 0.5);
        res.push(...group); 
    }
    return res;
};
    fullPetsList = generate48Pets();

    const allLinks = document.querySelectorAll('.pagination__link');
    let btnFirst, btnPrev, btnNext, btnLast, pageNum;

    allLinks.forEach(link => {
        const text = link.innerText.trim();
        if (text === '<<') btnFirst = link;
        else if (text === '<') btnPrev = link;
        else if (text === '>') btnNext = link;
        else if (text === '>>') btnLast = link;
        else if (link.classList.contains('pagination__link--current')) pageNum = link;
    });

    const getItemsPerPage = () => {
        const width = window.innerWidth;
        if (width >= 1280) return 8;
        if (width >= 768) return 6;
        return 3;
    };

    const renderPage = () => {
        const perPage = getItemsPerPage();
        const total = 48 / perPage;

        petsGrid.innerHTML = "";
        fullPetsList.slice((currentPage - 1) * perPage, currentPage * perPage).forEach(idx => {
            petsGrid.appendChild(createCardElement(idx));
        });

        pageNum.innerText = currentPage;

        const updateState = (btn, isDisable) => {
            if (isDisable) {
                btn.classList.add('pagination__link--disable');
                btn.style.pointerEvents = 'none'; 
            } else {
                btn.classList.remove('pagination__link--disable');
                btn.style.pointerEvents = 'auto'; 
            }
        };

        updateState(btnFirst, currentPage === 1);
        updateState(btnPrev, currentPage === 1);
        updateState(btnNext, currentPage === total);
        updateState(btnLast, currentPage === total);
    };

    btnNext.onclick = (e) => { e.preventDefault(); currentPage++; renderPage(); };
    btnPrev.onclick = (e) => { e.preventDefault(); currentPage--; renderPage(); };
    btnFirst.onclick = (e) => { e.preventDefault(); currentPage = 1; renderPage(); };
    btnLast.onclick = (e) => { e.preventDefault(); currentPage = 48 / getItemsPerPage(); renderPage(); };

    window.addEventListener('resize', renderPage);
    window.addEventListener('load', renderPage);
}