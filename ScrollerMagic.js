// SETINGS -----------------------------------------------------------------------------------

let delay = false;
let counter = 0;
let delayWheel = 400;
let delayTouch = 400;
let delayKey = 700;
let breakPoint = 768

window.scrollTo({
    top: 0
})

const sections = document.querySelectorAll(".scrolling-block");

// SETTINGS END----------------------------------------------------------------------------------------------

// const modalLets = document.querySelector(".lets__talk");
// const modalStart = document.querySelector(".start__earning");

// FUNCTIONS ------------------------------------------------------------------------------------

function returnFalse(e) {
    e.preventDefault();
    return false;
}

function scrollDown() {

    window.removeEventListener("wheel", onWheel);
    window.addEventListener("wheel", returnFalse, {
        passive: false,
    });

    if (counter + 1 !== sections.length) {
        counter++;

        sections[counter - 1].classList.remove("active");
        sections[counter - 1].classList.add("invise");

        sections[counter].classList.remove("invise");
        sections[counter].classList.add("active");

        if (sections[counter + 1]) {
            sections[counter + 1].classList.remove("active");
            sections[counter + 1].classList.add("invise");
        }
    } else {
        counter = counter;
    }

    return counter;
}

function scrollUp() {

    window.removeEventListener("wheel", onWheel);
    window.addEventListener("wheel", returnFalse, {
        passive: false,
    });

    if (counter - 1 !== -1) {
        counter--;

        sections[counter].classList.remove("invise");
        sections[counter].classList.add("active");

        sections[counter + 1].classList.remove("active");
        sections[counter + 1].classList.add("invise");
    } else {
        counter = counter;
    }

    return counter;
}

function easeScroll() {
    $("html,body").animate(
        {
            scrollTop:
                sections[counter].offsetTop -
                (document.documentElement.clientHeight -
                    sections[counter].clientHeight) /
                2,
            behavior: "smooth",
        },
        800,
        () => {
            setTimeout(() => {
                window.removeEventListener("wheel", returnFalse);
                window.addEventListener("wheel", onWheel, {
                    passive: false,
                });
            }, delayWheel);
        }
    );
}

function scrollToSection(e, directionY, directionX) {
    if (directionY !== 0) {
        // if scroll by y
        e.preventDefault();
    } else {
        // If scroll by x remove Delay
        delay = false;
    }

    if (directionY > 0 && directionX === 0) {
        scrollDown();
        easeScroll();
    } else if (directionY < 0 && directionX === 0) {
        scrollUp();
        easeScroll();
    }
}

function onWheel(e) {

    if (document.documentElement.clientWidth >= breakPoint) {
        console.log(counter);
        let directionY = e.deltaY;

        let directionX = e.deltaX;

        // section by Y
        if (directionY !== 0) {
            e.preventDefault();
        }

        scrollToSection(e, directionY, directionX);
    }
}

function touchToSection(e, directionY) {

    if (delay) {
        return;
    }

    delay = true;

    if (directionY > 30 || directionY < -30) {
        // if scroll by y
        e.preventDefault();
        setTimeout(function () {
            delay = false;
        }, delayTouch);
    } else {
        // If scroll by x remove Delay
        delay = false;
    }

    if (directionY < -30) {
        scrollDown();
        easeScroll();
    } else if (directionY > 30) {
        scrollUp();
        easeScroll();
    }
}

function checkKey(e) {
    if (document.documentElement.clientWidth >= breakPoint) {

        // Remove scroll by space
        if (e.keyCode === 32 && e.target === document.body) {
            e.preventDefault();
        }

        // key up
        if (e.keyCode == "38") {

            if (delay) {
                e.preventDefault();
                return;
            }

            delay = true;

            setTimeout(function () {
                delay = false;
            }, delayKey);

            scrollUp();
            easeScroll();


        } else if (e.keyCode == "40") { // key down

            if (delay) {
                e.preventDefault();
                return;
            }

            delay = true;

            setTimeout(function () {
                delay = false;
            }, delayKey);

            scrollDown();
            easeScroll();
        }
    }
}

// FUNCTIONS END ---------------------------------------------------------------------------------

// EVENTLISTENERS -------------------------------------------------------------------------------

window.addEventListener("wheel", onWheel, {
    passive: false,
});

let currentY = 0,
    currentX = 0;

window.addEventListener(
    "touchmove",
    (e) => {
        if (document.documentElement.clientWidth >= breakPoint) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    },
    document.documentElement.clientWidth >= breakPoint
        ? {
            passive: false,
        }
        : {
            passive: true,
        }
);

window.addEventListener('resize', () => {

})

window.addEventListener("touchstart", (e) => {
    if (document.documentElement.clientWidth >= breakPoint) {
        //     e.preventDefault()
        currentY = e.changedTouches[0].clientY;
        currentX = e.changedTouches[0].clientX;

        return currentY, currentX;
    }
});

window.addEventListener(
    "touchend",
    function (e) {
        let directionY = e.changedTouches[0].clientY - currentY;

        let directionX = e.changedTouches[0].clientX - currentX;

        if (
            document.documentElement.clientWidth >= breakPoint &&
            directionY !== 0 &&
            directionX !== 0
        ) {

            let maxY = sections[sections.length - 1].offsetTop;


            // section by Y
            if (directionY < 50 && directionY > -50) {
                e.preventDefault();

            } else {
                touchToSection(e, directionY, directionX);
            }


            if (pageYOffset < maxY && directionY < 0 && directionX === 0) {

                if (directionY !== 0) {
                    e.preventDefault();
                }
                touchToSection(e, directionY, directionX);
            }
        } else {
        }
    },
    {}
);

document.onkeydown = checkKey;

// Remove scroll pc

let lastScrollOffset = 0

function detectResizeCounter() {

    if (document.documentElement.clientWidth < breakPoint
        &&
        !(sections[counter + 1] ? sections[counter + 1].classList.contains('invise') : false
            ||
            sections[counter - 1] ? sections[counter - 1].classList.contains('invise') : false)) {



        let clientHeight = document.documentElement.clientHeight

        if (pageYOffset < (sections[0].offsetTop + sections[0].clientHeight) / 2) {
            return counter = 0
        } else if (
            pageYOffset > sections[sections.length - 1].offsetTop + sections[sections.length - 1].clientHeight / 2
        ) {
            return counter = sections.length;
        }

        for (let i = 0; i < sections.length; i++) {
            if (
                sections[i + 1]
                &&
                ((pageYOffset > (sections[i].offsetTop + (sections[i].clientHeight / 2)) - 10)
                    &&
                    (pageYOffset < (sections[i + 1].offsetTop + sections[i + 1].clientHeight / 2)))
            ) {
                return counter = i + 1
            }



        }
    }
}

window.addEventListener("scroll", (e) => {
    e.preventDefault();
    if (counter !== sections.length - 1) {
        if (document.documentElement.clientWidth >= breakPoint) {
            window.scrollTo(
                0,
                sections[counter].offsetTop -
                (document.documentElement.clientHeight -
                    sections[counter].clientHeight) /
                2
            );
        }
    }
});

window.addEventListener('resize', () => {
    detectResizeCounter()
    if (document.documentElement.clientWidth < breakPoint) {

        sections.forEach((el) => {
            el.classList.remove('invise')
            el.classList.add('active')
        })

    } else {
        sections.forEach((el) => {
            el.classList.remove('active')
            el.classList.add('invise')
        })

    }

    sections[counter].classList.add('active')

    window.scrollTo(
        0,
        sections[counter].offsetTop -
        (document.documentElement.clientHeight -
            sections[counter].clientHeight) /
        2
    );
})
