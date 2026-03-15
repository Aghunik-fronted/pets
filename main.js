// burgermenu
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

// slider
const petsData = [
    {
        name: "Katrine",
        img: "images/pets-katrine.jpg",
        type: "Cat",
        breed: "British Shorthair",
        description: "Katrine is a beautiful girl. She is very gentle and well-behaved. She enjoys spending time with us. She loves to be gazed at, toasted, and petted. Katrine will be a good companion.",
        age: "6 months",
        inoculations: ["panleukopenia"],
        diseases: ["none"],
        parasites: ["none"]
    },
    {
        name: "Jennifer",
        img: "images/pets-jennifer.jpg",
        type: "Dog",
        breed: "Labrador",
        description: "Jennifer is a sweet 2-month-old Labrador that is already trained to enjoy the company of people. She is optimistic and playful. She will be a wonderful family pet.",
        age: "2 months",
        inoculations: ["none"],
        diseases: ["none"],
        parasites: ["none"]
    },
    {
        name: "Woody",
        img: "images/pets-woody.jpg",
        type: "Dog",
        breed: "Golden Retriever",
        description: "Woody is a handsome 3-year-old Golden Retriever. He is smart, loyal, and very friendly. He loves playing catch and long walks in the park.",
        age: "3 years",
        inoculations: ["adenovirus", "distemper"],
        diseases: ["none"],
        parasites: ["none"]
    },
    {
        name: "Sophia",
        img: "images/4.jpg",
        type: "Dog",
        breed: "Shih tzu",
        description: "Sophia is a little princess. She is very calm and likes to sleep on soft pillows. She is perfect for a quiet apartment life.",
        age: "1 month",
        inoculations: ["none"],
        diseases: ["none"],
        parasites: ["none"]
    },
    {
        name: "Timmy",
        img: "images/pets-timmy.png",
        type: "Cat",
        breed: "British Shorthair",
        description: "Timmy is a curious kitten. He explores every corner of the house and loves to jump on high shelves. Very energetic and funny.",
        age: "2.3 years",
        inoculations: ["calicivirus"],
        diseases: ["none"],
        parasites: ["none"]
    },
    {
        name: "Charly",
        img: "images/pets-charly.jpg",
        type: "Dog",
        breed: "Jack Russell Terrier",
        description: "Charly is an active boy who needs a lot of exercise. He is great with children and other dogs. Ready for adventures!",
        age: "8 years",
        inoculations: ["bordetella bronchiseptica", "leptospirosis"],
        diseases: ["none"],
        parasites: ["none"]
    },
    {
        name: "Scarlett",
        img: "images/pets-scarlet.jpg",
        type: "Dog",
        breed: "Jack Russell Terrier",
        description: "Scarlett is a brave and loyal dog. She will protect her home and her owners. She is also very affectionate once she knows you.",
        age: "3 months",
        inoculations: ["none"],
        diseases: ["none"],
        parasites: ["none"]
    },
    {
        name: "Freddie",
        img: "images/8.jpg",
        type: "Cat",
        breed: "British Shorthair",
        description: "Freddie is a big, fluffy cat. He is very lazy and loves to eat. Most of the day he spends sunbathing near the window.",
        age: "2 months",
        inoculations: ["none"],
        diseases: ["none"],
        parasites: ["none"]
    }
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

    document.addEventListener('DOMContentLoaded', initSlider);
    window.addEventListener('resize', initSlider);
}

// pogination
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

// popup
document.addEventListener('click', (event) => {
    // Ищем карточку
    const card = event.target.closest('.slider__item') || event.target.closest('.friends-item');
    
    if (card) {
        event.preventDefault();
        const petName = card.querySelector('.friends-item__title').textContent.trim();
        const petInfo = petsData.find(p => p.name === petName);
        
        if (petInfo) {
            renderPopup(petInfo); // Вызываем новую функцию
        }
    }
});

// 2. Функция, которая САМА создает всё в HTML
function renderPopup(pet) {
    // Создаем оверлей
    const overlay = document.createElement('div');
    overlay.classList.add('popup-overlay'); // проверь, чтобы в CSS был этот класс!
    
    overlay.innerHTML = `
        <div class="popup-window">
            <button class="popup-close-btn">×</button>
            <div class="popup-container">
                <img src="${pet.img}" alt="${pet.name}" class="popup-img">
                <div class="popup-info">
                    <h3 class="popup-name">${pet.name}</h3>
                    <h4 class="popup-type">${pet.type} - ${pet.breed}</h4>
                    <p class="popup-description">${pet.description}</p>
                    <ul class="popup-list">
                        <li><b>Age:</b> ${pet.age}</li>
                        <li><b>Inoculations:</b> ${pet.inoculations.join(', ')}</li>
                        <li><b>Diseases:</b> ${pet.diseases.join(', ')}</li>
                        <li><b>Parasites:</b> ${pet.parasites.join(', ')}</li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
    document.body.classList.add('lock');

    // Плавное появление (через небольшой таймаут)
    setTimeout(() => overlay.classList.add('active'), 10);

    // Закрытие
    const closePopup = () => {
        overlay.classList.remove('active');
        document.body.classList.remove('lock');
        setTimeout(() => overlay.remove(), 300); // Удаляем из HTML совсем
    };

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target.closest('.popup-close-btn')) {
            closePopup();
        }
    });
}