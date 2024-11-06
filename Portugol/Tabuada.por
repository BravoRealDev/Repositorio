programa {
  funcao inicio() {

    //inteiro controle = 1
    inteiro numeroFornecido

    escreva("Qual tabuada desejada?")
    leia(numeroFornecido)

    para(inteiro controle = 1; controle <= 10; controle++){
      escreva(controle * numeroFornecido, "\n")
    }

    //enquanto(controle <= 10){
    //  escreva(controle * numeroFornecido, "\n")
    //  controle++
    //}
  }
}