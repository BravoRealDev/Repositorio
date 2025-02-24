// js/components/product.js

document.addEventListener('DOMContentLoaded', function() {
    // Seleciona os elementos relevantes
    const quantityInput = document.querySelector('.quantity-selector input');
    const incrementButton = document.querySelector('.quantity-selector button:last-of-type');
    const decrementButton = document.querySelector('.quantity-selector button:first-of-type');
  
    // Função para atualizar o valor do input
    function updateQuantity(value) {
      quantityInput.value = value;
    }
  
    // Evento para o botão de incremento
    incrementButton.addEventListener('click', function() {
      let currentValue = parseInt(quantityInput.value);
      updateQuantity(currentValue + 1);
    });
  
    // Evento para o botão de decremento
    decrementButton.addEventListener('click', function() {
      let currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        updateQuantity(currentValue - 1);
      }
    });
  
    // Evento para validar a entrada no input
    quantityInput.addEventListener('input', function() {
      let currentValue = parseInt(quantityInput.value);
      if (isNaN(currentValue) || currentValue < 1) {
        updateQuantity(1);
      }
    });
  });