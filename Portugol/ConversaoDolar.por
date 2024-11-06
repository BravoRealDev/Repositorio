programa {
  inclua biblioteca Matematica   
  funcao inicio() {
    
    real valor, cotacao, conversao, resultado
    
      enquanto(verdadeiro){
      escreva("\nDigite o Valor em Real: ")
      leia(valor)
      limpa()

      cotacao = 5.69   
      conversao = valor * cotacao
      resultado = Matematica.arredondar(conversao, 2)
      escreva("O valor em Dólar é ", resultado)

    }
  }    
}