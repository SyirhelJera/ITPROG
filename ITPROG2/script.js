let cart = {
    main: {},
    side: {},
    drink: {},
  };
  
  const prices = {
    main: {
      burger: 5.0,
      pizza: 8.0,
      sandwich: 6.5,
    },
    side: {
      fries: 2.5,
      salad: 3.0,
      onionRings: 2.0,
    },
    drink: {
      coke: 1.5,
      pepsi: 1.5,
      sprite: 1.5,
    },
  };
  
  function addToCart() {
    const main = document.getElementById('main').value;
    const side = document.getElementById('side').value;
    const drink = document.getElementById('drink').value;
    const quantity = parseInt(document.getElementById('quantity').value);
  
    cart.main = { item: main, price: prices.main[main], quantity };
    cart.side = { item: side, price: prices.side[side], quantity };
    cart.drink = { item: drink, price: prices.drink[drink], quantity };
  
    // Show order summary
    const orderSummary = document.getElementById('orderSummary');
    orderSummary.innerHTML = `
      <p><strong>Main:</strong> ${main} x ${quantity}</p>
      <p><strong>Side:</strong> ${side} x ${quantity}</p>
      <p><strong>Drink:</strong> ${drink} x ${quantity}</p>
    `;
  
    // Calculate and display total
    const totalAmount = document.getElementById('totalAmount');
    const totalPrice = calculateTotal();
    totalAmount.textContent = `$${totalPrice.toFixed(2)}`;
  }
  
  function calculateTotal() {
    const mainPrice = cart.main.price * cart.main.quantity;
    const sidePrice = cart.side.price * cart.side.quantity;
    const drinkPrice = cart.drink.price * cart.drink.quantity;
  
    return mainPrice + sidePrice + drinkPrice;
  }
  
  function cancelTransaction() {
    // Clear cart and inputs
    cart = {
      main: {},
      side: {},
      drink: {},
    };
  
    document.getElementById('main').value = 'burger';
    document.getElementById('side').value = 'fries';
    document.getElementById('drink').value = 'coke';
    document.getElementById('quantity').value = '1';
  
    // Clear order summary and total
    const orderSummary = document.getElementById('orderSummary');
    const totalAmount = document.getElementById('totalAmount');
    orderSummary.innerHTML = '';
    totalAmount.textContent = '';
  }
  
  function processPayment() {
    const paymentAmount = parseFloat(document.getElementById('paymentAmount').value);
    const totalPrice = calculateTotal();
  
    if (paymentAmount < totalPrice) {
      alert('Payment amount is less than the total. Please enter a valid amount.');
      return;
    }
  
    const change = paymentAmount - totalPrice;
    const discountedTotal = applyDiscount(totalPrice);
  
    // Save the successful checkout transaction to the database (not implemented in this example)
  
    // Display payment summary
    const orderSummary = document.getElementById('orderSummary');
    orderSummary.innerHTML += `
      <p><strong>Total:</strong> $${totalPrice.toFixed(2)}</p>
      <p><strong>Discounted Total:</strong> $${discountedTotal.toFixed(2)}</p>
      <p><strong>Payment Amount:</strong> $${paymentAmount.toFixed(2)}</p>
      <p><strong>Change:</strong> $${change.toFixed(2)}</p>
    `;
  
    // Clear cart and inputs
    cart = {
      main: {},
      side: {},
      drink: {},
    };
  
    document.getElementById('main').value = 'burger';
    document.getElementById('side').value = 'fries';
    document.getElementById('drink').value = 'coke';
    document.getElementById('quantity').value = '1';
    document.getElementById('paymentAmount').value = '';
  
    // Clear total
    const totalAmount = document.getElementById('totalAmount');
    totalAmount.textContent = '';
  }
  
  function applyDiscount(totalPrice) {
    // Check if the combo is selected
    const comboMain = cart.main.item;
    const comboSide = cart.side.item;
    const comboDrink = cart.drink.item;
  
    if (comboMain === 'burger' && comboSide === 'fries' && comboDrink === 'coke') {
      return totalPrice * 0.9; // Apply 10% discount
    } else if (comboMain === 'pizza' && comboSide === 'salad' && comboDrink === 'pepsi') {
      return totalPrice * 0.8; // Apply 20% discount
    }
  
    return totalPrice;
  }
  