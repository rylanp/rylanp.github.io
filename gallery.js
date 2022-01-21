const buttons = document.querySelectorAll("[data-carousel-button]")
let userIsActive = false;
let inactiveTimer = 8000;
buttons.forEach(button => {
    button.addEventListener("click", () => {
        userIsActive = true
        inactiveTimer = 8000
        const offset = button.dataset.carouselButton === "next" ? 1 : -1
        const slides = button
            .closest("[data-carousel]")
            .querySelector('[data-slides]')
        const activeSlide = slides.querySelector("[data-active]")
        let newIndex = [...slides.children].indexOf(activeSlide) + offset
        if (newIndex < 0) newIndex = slides.children.length - 1
        if (newIndex >= slides.children.length) newIndex = 0

        slides.children[newIndex].dataset.active = true
        delete activeSlide.dataset.active
    })
});

function advanceslides(){
    const button = document.querySelector("[data-carousel-button]")
    const slides = button.closest("[data-carousel]").querySelector('[data-slides]')
    const activeSlide = slides.querySelector("[data-active]")
    let newIndex = [...slides.children].indexOf(activeSlide) + 1
    if (newIndex < 0) newIndex = slides.children.length - 1
    if (newIndex >= slides.children.length) newIndex = 0

    slides.children[newIndex].dataset.active = true
    delete activeSlide.dataset.active
};
setInterval(() => {
    inactiveTimer = inactiveTimer - 1000
    if (inactiveTimer <= 0){
        userIsActive = false
    }
}, 1000);
setInterval(() => {
    if (userIsActive === false){
        advanceslides()
    }
}, 4500);
