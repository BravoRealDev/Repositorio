programa {
  funcao inicio() {
    
    inteiro soma = 0
    inteiro numeros


    escreva("Escreva 10 números: ")

    para(inteiro contador = 1; contador <= 10; contador++){
       escreva("\nDigite um número: ")
       leia(numeros)
       limpa() 

       se (numeros % 2 == 0){
        soma = (soma + numeros)
        escreva(soma)
       }

    }
    escreva("A soma dos número pares é ", soma)
  }
}