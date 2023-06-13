const mobilePrice = 1280;

const setMobileWindow = () => {
    const carouselItems = document.querySelectorAll(".carousel-in");
    carouselItems.forEach((el, idx) => {
        el.classList.add("carousel-item");
        if (idx === 1) el.classList.add("active");
    });
};
const setDesctopWindow = () => {
    const carouselItems = document.querySelectorAll(".carousel-in");
    carouselItems.forEach((el) => {
        el.classList.remove("carousel-item");
        el.classList.remove("active");
    });
};

window.onload = (() => {
    document.querySelector("body").style.backgroundColor = "#E5E5E5";
    const clientWidth = window.innerWidth;
    if (clientWidth <= mobilePrice) {
        setMobileWindow();
    }
});
window.addEventListener('resize', () => {
    if (window.innerWidth <= mobilePrice && JSON.parse(localStorage.getItem('device')) !== "mobile") {
        localStorage.setItem('device', JSON.stringify("mobile"));
        setMobileWindow();
    } else if (window.innerWidth > mobilePrice && JSON.parse(localStorage.getItem('device')) === "mobile") {
        localStorage.setItem('device', JSON.stringify("dectop"));
        setDesctopWindow();
    } else {
        console.log('else', document.documentElement.clientWidth, window.innerWidth);
    };
});

const navigateEl = document.querySelector(".header__navigate");
navigateEl.addEventListener('click', (e) => {
    const activeMenuId = (e.target.dataset.link);
    if (!activeMenuId) return;
    const menuEls = navigateEl.querySelectorAll(".button-text");
    menuEls.forEach((el) => {
        if (el.dataset.link === activeMenuId) {
            el.classList.add('header__menu-active');
        } else {
            el.classList.remove('header__menu-active');
        };
    });
    goLink(activeMenuId);
});

const tryForFreeBut = document.querySelector('.header__monitor_button_text');
tryForFreeBut.addEventListener('click', (e) => {
    goLink(e.target.dataset.link);
});
tryForFreeBut.addEventListener('mouseover', (e) => {
    e.target.classList.remove('vibrate-1');
});
tryForFreeBut.addEventListener('mouseout', (e) => {
    e.target.classList.add('vibrate-1');
});

const priceButtons = document.querySelector('.price-title');
priceButtons.addEventListener('click', (e) => {
    if (e.target.classList.contains('plans-grid-button')) {
        goLink(e.target.dataset.link);
    };
});

const footerEl = document.querySelector('.footer');
footerEl.addEventListener('click', (e) => {
    if (e.target.classList.contains('footer-menu-link')) {
        goLink(e.target.dataset.link);
    } else if (e.target.parentNode.classList.contains('footer-menu-link')) {
        goLink(e.target.parentNode.dataset.link);
    };
});

const passwordEls = document.querySelectorAll('.register-password');
passwordEls.forEach((el) => {
    el.addEventListener('input', () => {
        verify();
    })
});
function verify() {
    if (passwordEls[0].value && passwordEls[1].value && passwordEls[0].value === passwordEls[1].value) {
        passwordEls.forEach((el) => {
            el.classList.add('register-password-successful');
            el.classList.remove('register-password-error');
        })
    } else {
        passwordEls.forEach((el) => {
            el.classList.remove('register-password-successful');
            el.classList.add('register-password-error');
        });
    };
}

function hendleSubmit(e) {
    e.preventDefault();
    const formEl = e.target;
    verify();
};


const registerStarsBtns = document.querySelector('.register-stars')
registerStarsBtns.addEventListener('click', (e) => {
    if (e.target.dataset.stars) {
        const stars = registerStarsBtns.querySelectorAll('a');
        stars.forEach((s) => {
            if (s.firstElementChild.dataset.stars <= e.target.dataset.stars) {
                s.firstElementChild.src = "./src/desctop/Star.png";
            } else {
                s.firstElementChild.src = "./src/desctop/StarGrey.png";
            }
        });
    };
});

function goLink(link) {
    console.log('Переход на страницу:', link);
};
