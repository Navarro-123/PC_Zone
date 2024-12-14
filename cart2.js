
function addToCart(itemName, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.push({ itemName, price });

    localStorage.setItem('cart', JSON.stringify(cart));

    renderCart();
	
	alert("I am an alert box!");
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.splice(index, 1);

    localStorage.setItem('cart', JSON.stringify(cart));

    renderCart();
}


function calculateTotal(cart) {
    return cart.reduce((total, item) => total + item.price, 0);
}


function renderCart() {
    const cartContainer = document.getElementById('cart');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cartContainer.innerHTML = '<h3>Your Cart</h3>';
    if (cart.length === 0) {
        cartContainer.innerHTML += '<p>Cart is empty.</p>';
        return;
    }

    const cartList = document.createElement('ul');
    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${item.itemName} - ₱${item.price} 
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartList.appendChild(listItem);
    });

    cartContainer.appendChild(cartList);


    const totalPrice = calculateTotal(cart);
    const totalElement = document.createElement('p');
    totalElement.textContent = `Total: ₱${totalPrice}`;
    cartContainer.appendChild(totalElement);
}


function getGeolocation() {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

      
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
            .then(response => response.json())
            .then(data => {
                const address = data.display_name || "Address not found";
        
                document.getElementById('address').value = address;
            })
            .catch(() => {
                alert("Unable to retrieve address.");
            });
    }, () => {
        alert("Unable to retrieve your location.");
    });
}


function fillAddressWithGeolocation() {
    getGeolocation();
}

function clearCart() {
    localStorage.removeItem('cart');
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    
 
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        clearCart();
    });
});
