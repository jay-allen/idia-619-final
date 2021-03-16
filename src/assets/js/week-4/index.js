const addBtn = document.querySelector('form > button[type="submit"]');
        const alert = document.querySelector('.c-alert');
        const dismissBtn = document.querySelector('.c-alert__dismiss-icon');
        const viewListBtn = document.querySelector('#view-list');
        const formSection = document.querySelector('.js-form-section');
        const viewListSection = document.querySelector('.js-view-list-section');
        const productList = document.querySelector('.js-product-list');
        const noProductsMessage = document.querySelector('.js-no-products');
        let productListArray = [];

        function addProduct(event) {
            event.preventDefault();

            const productName = document.querySelector('#product-name')?.value.trim();
            const manufactureYear = document.querySelector('#year-manufactured')?.value.trim();
            const validYear = checkManufactureYear(manufactureYear);

            if (validYear) {
                productListArray.push({
                    name: productName,
                    year: manufactureYear
                })
                resetForm();
                document.querySelector('#product-name').focus();
                console.log(productListArray);
            } else {
                showAlert();
            }    
        }

        function checkManufactureYear(manufactureYear) {
            let year = parseInt(manufactureYear);
            if (year < 2008) {
                return true;
            } else {
                return false;
            }
        }

        function showAlert() {
            alert.setAttribute("tabindex", "0");
            alert.classList.remove("u-hidden");
            alert.focus();
            alert.removeAttribute("tabindex");
        }

        function closeAlert() {
            toggleVisibility(alert);
        }

        function showList() {

            // Remove displayed <li>
            let items = productList.querySelectorAll('li');
            for (let i = 0; i < items.length; i++) {
                const element = items[i];
                element.remove(); // https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove
            }

            // Show message if no products have been entered
            if (productListArray.length < 1) {
                noProductsMessage.classList.remove('u-hidden');
            } else {
                noProductsMessage.classList.add('u-hidden');
            }

            for (let i = 0; i < productListArray.length; i++) {
                const product = productListArray[i];
                const nameAndYear = product.name + " - " + product.year;

                const listItem = getListItemHtml(nameAndYear);
                addList(listItem);
            }

            toggleVisibility(formSection);
            toggleVisibility(viewListSection);
        }

        function toggleVisibility(element) {
            if (element.classList.contains('u-hidden') ) {
                element.classList.remove('u-hidden');
            } else {
                element.classList.add('u-hidden');
            }
        }

        function resetForm() {

            // Clear Values
            let inputs = document.querySelectorAll('form input');
            for (let i = 0; i < inputs.length; i++) {
                const element = inputs[i];
                element.value = '';
            }
        }

        function getListItemHtml( listItemName ) {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
            let listItem = document.createElement('li');
            let nameItem = listItem.appendChild(document.createTextNode(listItemName));
            return listItem;
        }

        function addList( html ) {
            productList.appendChild(html); // https://stackoverflow.com/questions/17773938/add-a-list-item-through-javascript
        }


        addBtn.addEventListener('click', addProduct);
        dismissBtn.addEventListener('click', closeAlert);
        viewListBtn.addEventListener('click', showList);