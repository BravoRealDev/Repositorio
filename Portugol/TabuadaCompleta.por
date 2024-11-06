programa {

  funcao inicio() {
    
    para (inteiro tabuada = 1; tabuada <= 10; tabuada++) {
      escreva("Tabuada de ", tabuada, ": \n")

      para(inteiro aux = 1; aux <= 10; aux++) {
        escreva(tabuada, " x ", aux, " = ", tabuada * aux)
        escreva("\n")
      }
    }
  }
}