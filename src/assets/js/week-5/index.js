const buttons = document.querySelectorAll('.button');

// Loop through each button and assign listener
buttons.forEach(button => {
    // https://developer.mozilla.org/en-US/docs/Web/Events
    button.addEventListener('mouseenter', buttonHoverAdd);
    button.addEventListener('mouseleave', buttonHoverRemove);
});

function buttonHoverAdd(event) {
    event.target.classList.add('button_over');
}

function buttonHoverRemove(event) {
    event.target.classList.remove('button_over');
}