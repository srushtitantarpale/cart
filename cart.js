document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('product-list');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const viewCartBtn = document.querySelector('.right button');
    let cart = [];

    // Fetch products from API (replace with your actual API endpoint)
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            data.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');
                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.title}" />
                    <h3>${product.title}</h3>
                    <p>Price: $${product.price.toFixed(2)}</p>
                    <button class="add-to-cart" data-id="${product.id}" data-name="${product.title}" data-price="${product.price}" data-image="${product.image}">Add to Cart</button>
                `;
                productList.appendChild(productDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });

    // Function to add item to cart
    function addToCart(id, name, image, price) {
        const item = { id, name, image, price };
        cart.push(item);
        renderCart();
    }

    // Function to render cart items
    function renderCart() {
        cartItemsList.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${item.image}" alt="${item.name}" />
                ${item.name} - $${item.price.toFixed(2)}
                <button class="remove-from-cart" data-index="${index}">Remove</button>
            `;
            cartItemsList.appendChild(li);
            total += item.price;
        });

        cartTotal.textContent = total.toFixed(2);
    }
     // Add click event listener to productList to handle add-to-cart button clicks
    productList.addEventListener('click', function(event) {
        if (event.target.classList.contains('add-to-cart')) {
            const productId = event.target.getAttribute('data-id');
            const productName = event.target.getAttribute('data-name');
            const productImage = event.target.getAttribute('data-image');
            const productPrice = parseFloat(event.target.getAttribute('data-price'));

            addToCart(productId, productName, productImage, productPrice);
        }
    });

     // Add click event listener to cartItemsList to handle remove-from-cart button clicks
    cartItemsList.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-from-cart')) {
            const index = parseInt(event.target.getAttribute('data-index'));
            cart.splice(index, 1);
            renderCart();
        }
    });
    // Checkout button event listener
    checkoutBtn.addEventListener('click', function() {
        alert('Checkout functionality is not implemented yet.');
        // Implement actual checkout logic here
    });

   
});
