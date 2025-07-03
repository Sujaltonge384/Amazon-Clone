// Add to cart functionality using localStorage
function addToCart(productName, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.name === productName);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name: productName, price, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${productName} added to cart!`);
  updateCartCount();
}

// Update cart count in nav (if element exists)
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const countElem = document.getElementById("cart-count");
  if (countElem) countElem.textContent = count;
}

// Display cart contents on cart.html
function displayCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsDiv = document.getElementById("cart-items");
  const cartTotalSpan = document.getElementById("cart-total");

  cartItemsDiv.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <h2>${item.name}</h2>
      <p>Quantity: ${item.qty}</p>
      <p>Price: Rs. ${item.price.toFixed(2)}</p>
      <p>Subtotal: Rs. ${(item.price * item.qty).toFixed(2)}</p>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItemsDiv.appendChild(div);
    total += item.price * item.qty;
  });

  cartTotalSpan.textContent = total.toFixed(2);
}

// Remove item by index
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

// Placeholder checkout function
function checkout() {
  alert("Proceeding to checkout...");
}

// Initialize when page loads
window.onload = function () {
  updateCartCount();
  if (document.getElementById("cart-items")) displayCart();
};

let currentSlide = 0;

function moveSlide(direction) {
  const slides = document.getElementById("carouselSlides");
  const totalSlides = slides.children.length;

  currentSlide += direction;
  if (currentSlide < 0) currentSlide = totalSlides - 1;
  if (currentSlide >= totalSlides) currentSlide = 0;

  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}






