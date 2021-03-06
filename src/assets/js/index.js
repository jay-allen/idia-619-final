const itemList = document.querySelector('.js-list');
const itemInput = document.querySelector('form input');
const submitBtn = document.querySelector('form button[type="submit"]');
const listClass = "list__item";

submitBtn.addEventListener('click', event => submitForm(event) );

addStoredFromLocalStorage();
setupServiceWorker();

function createHtml(htmlString, elementType) {
    let element = document.createElement(elementType);
    element.innerHTML = htmlString;
    element.classList.add(listClass);
    element.querySelector('.list__delete').addEventListener('click', deleteItem);
    return element;
}

function submitForm(event) {
    event.preventDefault();
    addItem(itemList, itemInput.value);
}

function addItem(listElem, inputValue) {
    // Get HTML
    const html = getHtml(inputValue);

    // create new element
    const newElement = createHtml(html, "li");

    // appendChild to DOM
    listElem.classList.remove("u-hidden");
    listElem.appendChild(newElement);

    itemInput.value = "";
    setLocalStorge();
}

function getHtml(text) {
	return `
        <span class="list__title">${text}</span>
        <span><button class="list__delete" type="button">Delete</button></span>
	`;
}

function deleteItem(event) {
    event.target.closest("." + listClass).remove();
    setLocalStorge();
}

function setLocalStorge() {
    const listItems = document.querySelectorAll("." + listClass);
    let itemTextArr = [];

    listItems.forEach(item => {
        const title = item.querySelector('.list__title').textContent;
        itemTextArr.push(title);
    });
    localStorage.setItem("listItems", JSON.stringify(itemTextArr) );
}

function addStoredFromLocalStorage() {
    const savedItems = JSON.parse(localStorage.getItem('listItems'));
    savedItems.forEach( item => { addItem(itemList, item) });
}

function setupServiceWorker() {
    // https://developers.google.com/web/fundamentals/primers/service-workers
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
          navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
          });
        });
    }
}
