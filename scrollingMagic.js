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


        let directionY = e.deltaY;

        let directionX = e.deltaX;


        let maxY = sections[sections.length - 1].offsetTop;

        if (pageYOffset > maxY - 10 && maxY !== 0) {
            if (directionY < 0 && directionX === 0) {

                e.preventDefault();

                scrollToSection(e,
                    directionY,
                    directionX);
            }
        } else {

            // Remove scroll after scrolling to next
            // section by Y
            if (directionY !== 0) {
                e.preventDefault();
            }

            scrollToSection(e,
                directionY,
                directionX);

        }
    }
}

function touchToSection(e, directionY, directionX) {
    if (delay || sections[2].offsetTop === 0) {
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

let lastScrollTop = 0;
let i = 0
window.addEventListener('scroll', (e) => {


    if (document.documentElement.clientWidth < breakPoint) {

        let st = window.pageYOffset || document.documentElement.scrollTop

        if (st > lastScrollTop) {

            if (
                pageYOffset > sections[sections.length - 2].offsetTop
            ) {

                counter = sections.length - 1;
                sections[counter].classList.add('animate')
                sections[counter].classList.add('active')
                // console.log(counter, '1')
                return counter
            }


            if (
                sections[i + 1]
                &&
                (pageYOffset + document.documentElement.clientHeight > (sections[i + 1].offsetTop + (sections[i + 1].clientHeight / 10)) - 10)
                // &&
                // (pageYOffset  < (sections[i + 1].offsetTop + (sections[i + 1].clientHeight) / 2))
            ) {
                // console.log(i + 1);
                i = i + 1
                counter = i
                sections[counter].classList.add('animate')
                sections[counter].classList.add('active')
                // console.log(counter, '2')
                return counter, i
            }
        } else {
            if (
                pageYOffset < sections[1].offsetTop
            ) {

                counter = 0;
                sections[counter].classList.add('animate')
                sections[counter].classList.add('active')
                // console.log(counter, '3')
                return counter
            }


            if (
                sections[i - 1]
                &&
                (pageYOffset - document.documentElement.clientHeight < (sections[i - 1].offsetTop + (sections[i - 1].clientHeight / 10)) - 10)
                // &&
                // (pageYOffset  < (sections[i + 1].offsetTop + (sections[i + 1].clientHeight) / 2))
            ) {
                // console.log(i + 1);
                i = i - 1
                counter = i
                sections[counter].classList.add('animate')
                sections[counter].classList.add('active')
                console.log(counter, '4')
                return counter, i
            }
        }
        return lastScrollTop = st <= 0 ? 0 : st
    }
})

// FUNCTIONS END ---------------------------------------------------------------------------------

// EVENTLISTENERS -------------------------------------------------------------------------------

window.addEventListener("wheel", onWheel, {
    passive: false,
});


    let currentY = 0,
    currentX = 0

function touchmove(e) {

        let maxY = sections[sections.length - 1].offsetTop;
        let directionY = e.changedTouches[0].clientY - currentY;
        let directionX = e.changedTouches[0].clientX - currentX;
        // console.log(directionX);
        if ((directionX > 50 || directionX < -50) && (directionY < 50 && directionY > -50)) {

        } else if (pageYOffset > maxY - 10 && maxY !== 0) {

            if (directionY > 0) {
                e.preventDefault()
                e.stopPropagation()
                return false
            }
        } else {


            e.preventDefault()
            e.stopPropagation()
            return false

        }

}

function touchstart(e) {
    currentY = e.changedTouches[0].clientY;
    currentX = e.changedTouches[0].clientX;


    return currentY, currentX, false
}

function touchend(e) {
   
    let directionY = e.changedTouches[0].clientY - currentY;

    let directionX = e.changedTouches[0].clientX - currentX;

    if ((directionY !== 0 && directionX !== 0)) {


        // console.log(directionX, directionY);

        // console.log(directionX, directionY);


        let maxY = sections[sections.length - 1].offsetTop;

        if (pageYOffset < maxY - 10 && maxY !== 0) {


            // Remove scroll after scrolling to next
            // section by Y
            if (directionY < 50 && directionY > -50) {
                e.preventDefault();

                // console.log('prev');
            } else {

                // if (pageYOffset > maxY - 10 && directionY < 0) {
                //     console.log('max');
                // } else {

                touchToSection(e,
                    directionY,
                    directionX);
                // }
            }
        } else {
            if (directionY > 0) {
                // console.log('uup');
                touchToSection(e,
                    directionY,
                    directionX);
            }
        }
    }
}

document.onkeydown = checkKey;


// Remove scroll pc


window.addEventListener('scroll',
    (e) => {
        e.preventDefault()
        if (counter !== sections.length - 1) {
            if ((document.documentElement.clientWidth >= 1366)) {


                    window.scrollTo(0,
                        sections[counter].offsetTop - (
                        document.documentElement.clientHeight - (sections[counter].clientHeight)) / 2
                    )
            
            }
        }
    })

function InitTouchScroll() {
    if (document.documentElement.clientWidth >= 1366) {
        window.addEventListener('touchmove', touchmove,
            {passive: false})


        window.addEventListener('touchstart', touchstart, {passive: false})

        window.addEventListener(
            "touchend",
            touchend,
            {passive: false}
        );
    } else {
        window.removeEventListener('touchmove', touchmove,)
        window.removeEventListener('touchstart', touchstart,)
        window.removeEventListener('touchend', touchend,)
    }
}

InitTouchScroll()

window.addEventListener('resize', InitTouchScroll)

let oldWidth = document.documentElement.clientWidth
let oldHeight = document.documentElement.clientHeight

window.addEventListener('resize', () => {
    if (document.documentElement.clientWidth !== oldWidth && document.documentElement.clientHeight !== oldHeight) {
        // console.log(counter);
        sections[counter].classList.add("active");
        window.scrollTo(
            0,
            sections[counter].offsetTop
        );

        return oldWidth = document.documentElement.clientWidth, oldHeight = document.documentElement.clientHeight
    }
})

