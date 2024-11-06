programa {
  real saldo = 0
  logico sair = falso

  funcao inicio() {
    enquanto(sair == falso){

    inteiro menu
    
    escreva("\nMENU\n")
    escreva("Digite 1 para depositar algum valor; \n")
    escreva("Digite 2 para sacar algum valor; \n")
    escreva("Digite 3 para verificar seu saldo; \n")
    escreva("Digite 4 para sair. \n")
    leia(menu)
    limpa()
    
    se (menu == 1){
      adicionarSaldo()
    }
    se (menu == 2){
      sacarSaldo()
    }
    se (menu == 3){
      informarSaldo()
    }
    se (menu == 4){
      sair = verdadeiro
    }

    }
  }

  funcao adicionarSaldo(){
    real valorDeposito
        
    escreva("Qual valor deseja depositar? ")
    leia(valorDeposito)
      limpa()
    se(valorDeposito <= 0){
      escreva("Valor incorreto.")
    }
    senao{
    saldo = saldo + valorDeposito
      escreva("Saldo adicionado com sucesso.")
      informarSaldo()
    }
  }
  funcao sacarSaldo(){
   real valorSaque

   escreva("Qual valor deseja sacar? ")
   leia(valorSaque)
    limpa()
   se(valorSaque > saldo ou valorSaque < 0){
    escreva("Saldo insuficiente.")
   }   
   senao{
    escreva("Saldo retirado com sucesso.")
    saldo = saldo - valorSaque
    informarSaldo()
   }

  }
  funcao informarSaldo(){

    escreva("\nSeu saldo atualizado é R$", saldo)

  }
}