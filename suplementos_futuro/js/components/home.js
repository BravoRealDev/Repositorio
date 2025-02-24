// components/home.js

// Código JavaScript específico para a página inicial (se necessário)
// Por exemplo, animações de rolagem, efeitos visuais, etc.

document.addEventListener('DOMContentLoaded', function() {
    // Exemplo de animação ao rolar
    const produtosSection = document.getElementById('produtos');
  
    window.addEventListener('scroll', function() {
      if (isElementInViewport(produtosSection)) {
        produtosSection.classList.add('active');
      }
    });
  
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  });