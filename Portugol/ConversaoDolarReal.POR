programa {
  inclua biblioteca Matematica   
  funcao inicio() {
    
    real valor, cotacao, conversao, resultado
    
      enquanto(verdadeiro){
      escreva("\nDigite o Valor em Dólar: ")
      leia(valor)
      limpa()

      cotacao = 5.69   
      conversao = cotacao * valor
      resultado = Matematica.arredondar(conversao, 2)
      escreva("O valor em Real é ", resultado)

    }
  }    
}