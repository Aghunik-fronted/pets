// --- 1. BURGER MENU ---
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.header__burger'); 
    const menu = document.querySelector('.header__main-menu');
    const overlay = document.querySelector('.overlay');
    const body = document.body;
    const navLinks = document.querySelectorAll('.main-menu__link');

    if (!burger || !menu) return;

    function toggleMenu() {
        burger.classList.toggle('active');
        menu.classList.toggle('active');
        if (overlay) overlay.classList.toggle('active');
        body.classList.toggle('lock');
    }

    burger.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault(); 
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
            if (menu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
});

// --- 2. DATA ---
const petsData = [
    { name: "Katrine", img: "images/pets-katrine.jpg", type: "Cat", breed: "British Shorthair", description: "Katrine is a beautiful girl. She is very gentle and well-behaved. She enjoys spending time with us.", age: "6 months", inoculations: ["panleukopenia"], diseases: ["none"], parasites: ["none"] },
    { name: "Jennifer", img: "images/pets-jennifer.jpg", type: "Dog", breed: "Labrador", description: "Jennifer is a sweet 2-month-old Labrador.", age: "2 months", inoculations: ["none"], diseases: ["none"], parasites: ["none"] },
    { name: "Woody", img: "images/pets-woody.jpg", type: "Dog", breed: "Golden Retriever", description: "Woody is a handsome 3-year-old Golden Retriever.", age: "3 years", inoculations: ["adenovirus"], diseases: ["none"], parasites: ["none"] },
    { name: "Sophia", img: "images/4.jpg", type: "Dog", breed: "Shih tzu", description: "Sophia is a little princess.", age: "1 month", inoculations: ["none"], diseases: ["none"], parasites: ["none"] },
    { name: "Timmy", img: "images/pets-timmy.png", type: "Cat", breed: "British Shorthair", description: "Timmy is a curious kitten.", age: "2.3 years", inoculations: ["calicivirus"], diseases: ["none"], parasites: ["none"] },
    { name: "Charly", img: "images/pets-charly.jpg", type: "Dog", breed: "Jack Russell Terrier", description: "Charly is an active boy.", age: "8 years", inoculations: ["leptospirosis"], diseases: ["none"], parasites: ["none"] },
    { name: "Scarlett", img: "images/pets-scarlet.jpg", type: "Dog", breed: "Jack Russell Terrier", description: "Scarlett is a brave and loyal dog.", age: "3 months", inoculations: ["none"], diseases: ["none"], parasites: ["none"] },
    { name: "Freddie", img: "images/8.jpg", type: "Cat", breed: "British Shorthair", description: "Freddie is a big, fluffy cat.", age: "2 months", inoculations: ["none"], diseases: ["none"], parasites: ["none"] }
];

// --- 3. CARD CREATOR ---
const createCardElement = (petIndex) => {
    const pet = petsData[petIndex];
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('friends-item'); 
    cardDiv.innerHTML = `
        <div class="friends-item__image-container">
            <img src="${pet.img}" alt="${pet.name}">
        </div>
        <div class="friends-item__title">${pet.name}</div>
        <div class="friends-item__button button button--round">Learn more</div>`;
    return cardDiv;
};

// --- 4. SLIDER LOGIC ---
const sliderWrapper = document.querySelector('.slider__wrapper');
if (sliderWrapper) {
    const btnLeft = document.querySelector('.slider__arrow--left');
    const btnRight = document.querySelector('.slider__arrow--right');
    let currentPetsIndices = [];
    let previousPetsIndices = []; 

    const getCardsCount = () => {
        const sw = window.innerWidth;
        return sw >= 1280 ? 3 : (sw >= 768 ? 2 : 1);
    };

    const generateRandomIndices = (count, exclude) => {
        const available = petsData.map((_, i) => i).filter(i => !exclude.includes(i));
        const res = [];
        while (res.length < count) {
            res.push(available.splice(Math.floor(Math.random() * available.length), 1)[0]);
        }
        return res;
    };

    const renderSlider = (indices) => {
        sliderWrapper.innerHTML = "";
        indices.forEach(i => sliderWrapper.appendChild(createCardElement(i)));
        currentPetsIndices = indices;
    };

    btnRight?.addEventListener('click', () => {
        previousPetsIndices = [...currentPetsIndices];
        renderSlider(generateRandomIndices(getCardsCount(), currentPetsIndices));
    });

    btnLeft?.addEventListener('click', () => {
        if (previousPetsIndices.length) {
            const temp = [...currentPetsIndices];
            renderSlider(previousPetsIndices);
            previousPetsIndices = temp;
        }
    });

    renderSlider(generateRandomIndices(getCardsCount(), []));
}

// --- 4. PAGINATION ---
const petsGrid = document.querySelector('.friends__grid');

if (petsGrid && !document.querySelector('.slider__wrapper')) {
    let fullPetsList = [];
    let currentPage = 1;

    const generate48Pets = () => {
        const baseIds = [0, 1, 2, 3, 4, 5, 6, 7];
        let result = [];
        for (let i = 0; i < 6; i++) {
            let group = [...baseIds];
            for (let j = group.length - 1; j > 0; j--) {
                const k = Math.floor(Math.random() * (j + 1));
                [group[j], group[k]] = [group[k], group[j]];
            }
            result.push(...group);
        }
        return result;
    };

    fullPetsList = generate48Pets();

    const btns = document.querySelectorAll('.pagination__link');
    const btnFirst = document.querySelector('.pagination__link--first') || btns[0];
    const btnPrev = document.querySelector('.pagination__link--prev') || btns[1];
    const pageNum = document.querySelector('.pagination__link--current') || btns[2];
    const btnNext = document.querySelector('.pagination__link--next') || btns[3];
    const btnLast = document.querySelector('.pagination__link--last') || btns[4];

    const getParams = () => {
        const width = window.innerWidth;
        const perPage = width >= 1280 ? 8 : (width >= 768 ? 6 : 3);
        return { perPage, total: 48 / perPage };
    };

    const renderPage = () => {
        const { perPage, total } = getParams();
        if (currentPage > total) currentPage = total;

        petsGrid.innerHTML = "";
        const start = (currentPage - 1) * perPage;
        
        fullPetsList.slice(start, start + perPage).forEach(idx => {
            if (typeof createCardElement === 'function') {
                petsGrid.appendChild(createCardElement(idx));
            }
        });

        if (pageNum) pageNum.innerText = currentPage;

        const updateState = (btn, isDisable) => {
            if (!btn) return;
            btn.classList.toggle('pagination__link--disable', isDisable);
            if (isDisable) {
                btn.style.pointerEvents = 'none';
                btn.style.cursor = 'default';
            } else {
                btn.style.pointerEvents = 'auto';
                btn.style.cursor = 'pointer';
            }
        };

        updateState(btnFirst, currentPage === 1);
        updateState(btnPrev, currentPage === 1);
        updateState(btnNext, currentPage === total);
        updateState(btnLast, currentPage === total);
    };

    if (btnFirst) btnFirst.onclick = () => { currentPage = 1; renderPage(); };
    if (btnLast) btnLast.onclick = () => { currentPage = getParams().total; renderPage(); };
    if (btnPrev) btnPrev.onclick = () => { if (currentPage > 1) { currentPage--; renderPage(); } };
    if (btnNext) btnNext.onclick = () => { if (currentPage < getParams().total) { currentPage++; renderPage(); } };

    renderPage();
    window.addEventListener('resize', renderPage);
}

// --- POPUP LOGIC ---
document.addEventListener('click', (event) => {
    const card = event.target.closest('.friends-item') || event.target.closest('.slider__item');
    
    if (card) {
        const titleEl = card.querySelector('.friends-item__title');
        if (!titleEl) return;

        const petName = titleEl.textContent.trim();
        const petInfo = petsData.find(p => p.name === petName);
        
        if (petInfo) {
            showPetPopup(petInfo);
        }
    }
});

function showPetPopup(pet) {
    // Создаем оверлей
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay'; 
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
        </div>`;

    document.body.appendChild(overlay);
    document.body.classList.add('lock'); 

    setTimeout(() => overlay.classList.add('active'), 10);

    const closePopup = () => {
        overlay.classList.remove('active');
        document.body.classList.remove('lock');
        setTimeout(() => overlay.remove(), 300);
    };

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target.closest('.popup-close-btn')) {
            closePopup();
        }
    });

    overlay.addEventListener('mouseover', (e) => {
        const closeBtn = overlay.querySelector('.popup-close-btn');
        if (e.target === overlay) closeBtn.classList.add('hover');
        else closeBtn.classList.remove('hover');
    });
}