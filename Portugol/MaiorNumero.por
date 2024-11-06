programa {
  funcao inicio() {
    
    real valor1, valor2, resultado  

      enquanto(verdadeiro){
      escreva("\nDigite o primeiro número: ")
      leia(valor1)
      escreva("Digite o segundo número: ")
      leia(valor2)
      limpa()

      se (valor1 == valor2)
        escreva("Os valores são idênticos")
      senao se (valor1 > valor2) 
        escreva("O maior valor é o primeiro, sendo ", valor1)
      senao 
        escreva("O maior valor é o segundo, sendo ", valor2)
      
    }
  }    
}
