programa {
  inclua biblioteca Matematica 
    funcao inicio() {
    
    real valor1, valor2, resultado
    caracter operador  

    escreva("Digite o primeiro número: ")
    leia(valor1)
    escreva("Digite o operador matemático: ")
    leia(operador) 
    escreva("Digite o segundo número: ")
    leia(valor2)
    limpa()

    se (operador == '+'){
      resultado = valor1 + valor2
      escreva("O resultado é: ", resultado)
    }
    se (operador == '-'){
      resultado = valor1 - valor2
      escreva("O resultado é: ", resultado)
    }
    se (operador == '*'){
      resultado = valor1 * valor2
      escreva("O resultado é : ", resultado)
    }
    se (operador == '/'){
      resultado = valor1 / valor2
      escreva("O resultado é: ", resultado)
    }
   
    }    
}