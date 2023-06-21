// Combo menu data
const menu = {
    mains: [
      { name: "Burger", price: 10 },
      { name: "Pizza", price: 12 },
      { name: "Pasta", price: 8 }
    ],
    sides: [
      { name: "Fries", price: 4 },
      { name: "Salad", price: 5 },
      { name: "Onion Rings", price: 3 }
    ],
    drinks: [
      { name: "Coke", price: 2 },
      { name: "Pepsi", price: 2 },
      { name: "Sprite", price: 2 }
    ],
    combos: [
      { main: "Burger", side: "Fries", drink: "Coke", discount: 2 },
      { main: "Pizza", side: "Salad", drink: "Pepsi", discount: 3 }
    ]
  };
  
  // Selected items
  let selectedMain = null;
  let selectedSide = null;
  let selectedDrink = null;
  
  // Event listeners
  document.addEventListener("DOMContentLoaded", setup);
  document.getElementById("main-select").addEventListener("change", handleMainChange);
  document.getElementById("side-select").addEventListener("change", handleSideChange);
  document.getElementById("drink-select").addEventListener("change", handleDrinkChange);
  document.getElementById("cancel-btn").addEventListener("click", cancelTransaction);
  document.getElementById("checkout-btn").addEventListener("click", goToCheckout);
  document.getElementById("pay-btn").addEventListener("click", pay);
  
  // Setup function
  function setup() {
    populateMenu("main-select", menu.mains);
    populateMenu("side-select", menu.sides);
    populateMenu("drink-select", menu.drinks);
  }
  
  // Populate menu options
  function populateMenu(selectId, items) {
    const selectElement = document.getElementById(selectId);
    for (const item of items) {
      const option = document.createElement("option");
      option.value = item.name;
      option.textContent = `${item.name} - $${item.price}`;
      selectElement.appendChild(option);
    }
  }
  
  // Handle main selection change
  function handleMainChange() {
    const mainSelect = document.getElementById("main-select");
    const mainQuantity = document.getElementById("main-quantity");
    const selectedIndex = mainSelect.selectedIndex;
    if (selectedIndex > 0) {
      selectedMain = {
        name: mainSelect.value,
        price: menu.mains[selectedIndex - 1].price,
        quantity: parseInt(mainQuantity.value) || 1
      };
    } else {
      selectedMain = null;
    }
  }
  
  // Handle side selection change
  function handleSideChange() {
    const sideSelect = document.getElementById("side-select");
    const sideQuantity = document.getElementById("side-quantity");
    const selectedIndex = sideSelect.selectedIndex;
    if (selectedIndex > 0) {
      selectedSide = {
        name: sideSelect.value,
        price: menu.sides[selectedIndex - 1].price,
        quantity: parseInt(sideQuantity.value) || 1
      };
    } else {
      selectedSide = null;
    }
  }
  
  // Handle drink selection change
  function handleDrinkChange() {
    const drinkSelect = document.getElementById("drink-select");
    const drinkQuantity = document.getElementById("drink-quantity");
    const selectedIndex = drinkSelect.selectedIndex;
    if (selectedIndex > 0) {
      selectedDrink = {
        name: drinkSelect.value,
        price: menu.drinks[selectedIndex - 1].price,
        quantity: parseInt(drinkQuantity.value) || 1
      };
    } else {
      selectedDrink = null;
    }
  }
  
  // Cancel transaction
  function cancelTransaction() {
    selectedMain = null;
    selectedSide = null;
    selectedDrink = null;
    document.getElementById("main-select").selectedIndex = 0;
    document.getElementById("main-quantity").value = "";
    document.getElementById("side-select").selectedIndex = 0;
    document.getElementById("side-quantity").value = "";
    document.getElementById("drink-select").selectedIndex = 0;
    document.getElementById("drink-quantity").value = "";
  }
  
  // Go to checkout
  function goToCheckout() {
    if (selectedMain && selectedSide && selectedDrink) {
      window.location.href = "checkout.html";
    } else {
      alert("Please select a main, side, and drink.");
    }
  }
  
  // Calculate total amount
  function calculateTotal() {
    let total = 0;
    if (selectedMain) total += selectedMain.price * selectedMain.quantity;
    if (selectedSide) total += selectedSide.price * selectedSide.quantity;
    if (selectedDrink) total += selectedDrink.price * selectedDrink.quantity;
    return total;
  }
  
  // Calculate discount
  function calculateDiscount() {
    const combo = menu.combos.find(
      c =>
        c.main === selectedMain.name &&
        c.side === selectedSide.name &&
        c.drink === selectedDrink.name
    );
    return combo ? combo.discount : 0;
  }
  
  // Calculate discounted total
  function calculateDiscountedTotal() {
    const total = calculateTotal();
    const discount = calculateDiscount();
    return total - discount;
  }
  
  // Pay
  function pay() {
    const paymentAmount = parseFloat(document.getElementById("payment-amount").value);
    const discountedTotal = calculateDiscountedTotal();
    if (isNaN(paymentAmount) || paymentAmount < discountedTotal) {
      alert("Payment amount is insufficient. Please enter a valid amount.");
    } else {
      const change = paymentAmount - discountedTotal;
      alert(`Payment successful! Change: $${change.toFixed(2)}`);
      // Save the transaction in the database or perform further actions if needed
    }
  }
  
  // Initialize checkout page
  if (window.location.href.includes("checkout.html")) {
    const orderList = document.getElementById("order-list");
    const totalElement = document.getElementById("total");
    const discountElement = document.getElementById("discount");
    const discountedTotalElement = document.getElementById("discounted-total");
    const mainQuantity = selectedMain.quantity;
    const sideQuantity = selectedSide.quantity;
    const drinkQuantity = selectedDrink.quantity;
  
    // Display selected items
    if (selectedMain) {
      const mainItem = document.createElement("li");
      mainItem.textContent = `${selectedMain.name} x ${mainQuantity} - $${selectedMain.price * mainQuantity}`;
      orderList.appendChild(mainItem);
    }
  
    if (selectedSide) {
      const sideItem = document.createElement("li");
      sideItem.textContent = `${selectedSide.name} x ${sideQuantity} - $${selectedSide.price * sideQuantity}`;
      orderList.appendChild(sideItem);
    }
  
    if (selectedDrink) {
      const drinkItem = document.createElement("li");
      drinkItem.textContent = `${selectedDrink.name} x ${drinkQuantity} - $${selectedDrink.price * drinkQuantity}`;
      orderList.appendChild(drinkItem);
    }
  
    // Calculate and display totals
    const total = calculateTotal();
    const discount = calculateDiscount();
    const discountedTotal = calculateDiscountedTotal();
  
    totalElement.textContent = `$${total.toFixed(2)}`;
    discountElement.textContent = `$${discount.toFixed(2)}`;
    discountedTotalElement.textContent = `$${discountedTotal.toFixed(2)}`;
  }
  