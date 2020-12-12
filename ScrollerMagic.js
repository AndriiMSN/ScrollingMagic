let delay = false;

let counter = 0;
// let scrollHeight = 0;

const sections = document.querySelectorAll(".scrolling-block");

const modalLets = document.querySelector(".lets__talk");
const modalStart = document.querySelector(".start__earning");

function returnFalse(e) {
    e.preventDefault()
    return false
}

// const navItems =
// document.querySelectorAll(".header__nav__items li");

function scrollDown() {
    window.removeEventListener('wheel', onWheel,)
    window.addEventListener('wheel', returnFalse, { passive: false })
    if (counter + 1 !== sections.length) {
        counter++;
        sections[counter - 1].classList.remove("active");
        sections[counter].classList.add("active");
        sections[counter].classList.add("animate");

        // Disable people or brands block adding invise
        if (counter !== sections.length) {
            sections[counter - 1].classList.add("active");
        } else {
            sections[counter - 1].classList.add("invise");
        }


        // NavBar(); // Change active item Navbar


        if (sections[counter + 1]) {
            sections[counter + 1].classList.remove('active')
            sections[counter + 1].classList.add("invise");
        }
    } else {

        counter = counter;
    }

    return counter
}

function scrollUp() {
    if (counter - 1 !== -1) {
        window.removeEventListener('wheel', onWheel,)
        window.addEventListener('wheel', returnFalse, { passive: false })
        counter--;
        sections[counter].classList.remove("invise");
        sections[counter + 1].classList.remove("active");
        sections[counter].classList.add("animate");
        sections[counter].classList.add("active");
        sections[counter + 1].classList.add("invise");

        // NavBar(); // Change active item Navbar

    } else {

        counter = counter;
    }

    return counter
}

function easeScroll() {
    if (counter === sections.length - 2) {
        $("html,body")
            .animate(
                {
                    scrollTop: sections[counter].offsetTop - (
                        document.documentElement.clientHeight - (sections[counter].clientHeight)) / 2,
                    behavior: "smooth",
                },
                800, (() => {
                    setTimeout(() => {
                        window.removeEventListener('wheel', returnFalse)
                        window.addEventListener('wheel', onWheel, { passive: false })
                    }, 400)

                })
            );
    } else {
        $("html,body")
            .animate(
                {
                    scrollTop: sections[counter].offsetTop,
                    behavior: "smooth",
                },
                800, (() => {
                    setTimeout(() => {
                        window.removeEventListener('wheel', returnFalse)
                        window.addEventListener('wheel', onWheel, { passive: false })
                    }, 400)

                })
            );
    }
}


// function NavBar() {
// 	navItems.forEach((element) => {
// 		element.classList.remove("active");
// 	});
//
// 	if (counter > 0) {
// 		document.querySelector(".header").classList.add("scroll");
//  if (counter <= 4) {
// navItems[0].classList.add("active"); } else if (counter
// == 5) { navItems[1].classList.add("active"); } else if
// (counter == 6) { navItems[2].classList.add("active"); }
// else if (counter == 7) {
// navItems[3].classList.add("active"); } else if (counter
// == 8) { navItems[4].classList.add("active"); } else if
// (counter >= 9) { navItems[5].classList.add("active"); }
// } else {
// document.querySelector(".header").classList.remove("scroll"); } }

function onWheel(e) {
    // If open modals
    if (
        modalLets.classList.contains("open") ||
        modalStart.classList.contains("open")
    ) {
        return false;
    }

    if (document.documentElement.clientWidth >= 1366) {

        let directionY = e.deltaY;

        let directionX = e.deltaX;


        let maxY = sections[sections.length - 1].offsetTop;

        // if (pageYOffset < maxY - 10) {

        // Remove scroll after scrolling to next
        // section by Y
        if (directionY !== 0) {
            e.preventDefault();
        }

        scrollToSection(e,
            directionY,
            directionX);

        // } else {
        // if scroll up start scroll by sections
        // if (pageYOffset < maxY && directionY < 0 && directionX === 0) {
        //
        //     // Remove scroll after scrolling to
        //     // next section by Y
        //     if (directionY !== 0) {
        //         e.preventDefault();
        //     }
        //     scrollToSection(e,
        //         directionY,
        //         directionX);
        // }
    } else {
    }

}

window.addEventListener(
    "wheel",
    onWheel,
    { passive: false }
);

function scrollToSection(e,
    directionY,
    directionX) {


    // if (delay || sections[2].offsetTop === 0) {
    //     return;
    // }
    //
    //
    // delay = true;


    if (directionY !== 0) {
        // if scroll by y
        e.preventDefault();
        // setTimeout(function () {
        //         delay = false;
        //     },
        //     400);
    } else {
        // If scroll by x remove Delay
        delay = false;
    }


    if (directionY > 0 && directionX === 0) {
        //scroll down

        scrollDown()

        // Easy animation


        easeScroll()


    } else if (directionY < 0 && directionX === 0) {
        //scroll up

        scrollUp()


        // Easy animation

        easeScroll()
    }
}

let currentY = 0,
    currentX = 0

window.addEventListener('touchmove', (e) => {
    if (document.documentElement.clientWidth >= 1366) {
        if (modalLets.classList.contains("open")
            ||
            modalStart.classList.contains("open")
        ) {

        } else {
            e.preventDefault()
            e.stopPropagation()
            return false
        }
    }

}, document.documentElement.clientWidth >= 1366 ? { passive: false } : { passive: true })


window.addEventListener('touchstart', (e) => {
    if (document.documentElement.clientWidth >= 1366) {
        //     e.preventDefault()
        currentY = e.changedTouches[0].clientY;
        currentX = e.changedTouches[0].clientX;

        return currentY, currentX
    }
})

window.addEventListener(
    "touchend",
    function (e) {
        // console.log('touchend');
        // If open modals
        // e.preventDefault()
        if (
            modalLets.classList.contains("open") ||
            modalStart.classList.contains("open")
        ) {
            return false;
        }
        let directionY = e.changedTouches[0].clientY - currentY;

        let directionX = e.changedTouches[0].clientX - currentX;

        if (document.documentElement.clientWidth >= 1366 && (directionY !== 0 && directionX !== 0)) {


            // console.log(directionX, directionY);

            // console.log(directionX, directionY);


            let maxY = sections[sections.length - 1].offsetTop;

            // if (pageYOffset < maxY - 10) {

            // Remove scroll after scrolling to next
            // section by Y
            if (directionY < 50 && directionY > -50) {
                e.preventDefault();
                // console.log('prev');
            } else {
                touchToSection(e,
                    directionY,
                    directionX);
            }


            // } else {
            // if scroll up start scroll by sections
            if (pageYOffset < maxY && directionY < 0 && directionX === 0) {

                // Remove scroll after scrolling to
                // next section by Y
                if (directionY !== 0) {
                    e.preventDefault();
                }
                touchToSection(e,
                    directionY,
                    directionX);
            }
        } else {
        }
    },
    {}
);

function touchToSection(e, directionY, directionX) {
    if (delay) {
        return;
    }

    // console.log(directionX);
    delay = true;


    if (directionY > 30 || directionY < -30) {
        // if scroll by y
        e.preventDefault();
        setTimeout(function () {
            delay = false;
        },
            400);
    } else {
        // If scroll by x remove Delay
        delay = false;
    }


    if (directionY < -30) {
        //scroll down

        scrollDown()

        // Easy animation

        easeScroll()

        return counter;


    } else if (directionY > 30) {
        //scroll up

        scrollUp()

        // Easy animation

        easeScroll()
    }
}

// Remove scroll pc

window.addEventListener('scroll',
    (e) => {
        e.preventDefault()
        if (counter !== sections.length - 1) {
            if ((document.documentElement.clientWidth >= 1366)) {

                if (counter === sections.length - 2) {

                    window.scrollTo(0,
                        sections[counter].offsetTop - (
                            document.documentElement.clientHeight - (sections[counter].clientHeight)) / 2
                    )
                } else {
                    window.scrollTo(0,
                        sections[counter].offsetTop)
                }
            }
        }
    })

const ArrowBtnScroll = document.querySelector('.arrow__up');

['click', 'touchend'].forEach(evl => ArrowBtnScroll.addEventListener(evl, () => {
    counter = 0
    $("html,body")
        .animate(
            {
                scrollTop: sections[counter].offsetTop,
                behavior: "smooth",
            },
            800
        );
    return counter
}))


// header anchor

document.querySelectorAll(".header__nav__items li")
    .forEach((el) => {
        let nav = el.getAttribute("data-nav");
        let dataCounter = el.getAttribute("data-counter");
        // console.log(dataCounter);

        ['click', 'touchend'].forEach(evl => el.addEventListener(evl, () => {
            counter = +dataCounter;
            document.querySelector('html').classList.remove('lock')
            // sections[counter - 1].classList.remove("active");
            sections.forEach((el) => {
                el.classList.add("active");
            });
            // sections[counter - 1].classList.add("invise");
            // console.log(counter);
            $("html,body")
                .animate(
                    {
                        scrollTop: document.querySelector(`.${nav}`).offsetTop,
                        behavior: "smooth",
                    },
                    800
                );
            setTimeout(() => {
                sections[counter].classList.add('animate')
            },
                300)
        }, false))

        // el.addEventListener("click", );
    });

// Arrow keyboard

document.onkeydown = checkKey;

function checkKey(e) {

    if (document.documentElement.clientWidth >= 1366) {

        // Remove scroll by space
        if (e.keyCode === 32 && e.target === document.body) {
            e.preventDefault();
        }

        if (e.keyCode == "38") {
            // up arrow
            if (delay) {
                e.preventDefault();
                return;
            }

            delay = true;

            setTimeout(function () {
                delay = false;
            },
                700);
            if (
                modalLets.classList.contains("open") ||
                modalStart.classList.contains("open")
            ) {
                return false;
            }

            scrollUp()

            // Easy animation

            easeScroll()


        } else if (e.keyCode == "40") {
            if (delay) {
                e.preventDefault();
                return;
            }

            delay = true;

            setTimeout(function () {
                delay = false;
            },
                700);
            if (
                modalLets.classList.contains("open") ||
                modalStart.classList.contains("open")
            ) {
                return false;
            }


            scrollDown()

            // Easy animation

            easeScroll()

        }
    }
}


