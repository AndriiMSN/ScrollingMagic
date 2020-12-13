# ScrollingMagic.js

This is universal scrolling libary for any devisec, which supported touch, wheel, key scroll

Demo-online (https://andriimsn.github.io/ScrollingMagic/)

## Usage

Index.html

```html
    <sections class="scrolling-block">
    </sections>
    <sections class="scrolling-block">
    </sections>
```

Scrolling.js

```javascript
let delayWheel = 400; // Delay for wheel ( PC, NoteBooks touchpad)
let delayTouch = 400; // Delay for smartphones, tablets
let delayKey = 700; // Delay for keyboard arrows
let breakPoint = 768 // Breakpoint for scrolling per 100vh
```


## My solution for possible problems

### Modals 

Insert following code 

prevent Wheel

```javascript
function onWheel(e) {
    // If open modals
    if (
        modalLets.classList.contains("open") ||
        modalStart.classList.contains("open")
    ) {
        return false;
    }
...
```

prevent touch

```javascript
window.addEventListener(
    "touchend",
    function (e) {
        if (
            modalLets.classList.contains("open") ||
            modalStart.classList.contains("open")
        ) {
            return false;
        }
        ....
```

prevent key, but allow keypress oninput

```javascript
if (e.keyCode == "38") {

if ( modalLets.classList.contains("open") ||
      modalStart.classList.contains("open")  ) {
      } else {
        ...
        }
```

### Conflict touch and click

In my plugin I solve this problem, but if you have it yet try something like this

```javascript
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


```
