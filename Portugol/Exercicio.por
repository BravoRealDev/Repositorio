programa {
   //FALTA FINALIZAR
   
    real saldo = 0
    real saque, deposito
    inteiro opcao = 0
    real valorMedio = 0
    inteiro contagem = 0

  funcao inicio() {
    inteiro opcao
    enquanto(opcao !=3){
      escreva("\n1 - Registrar uma venda.")
      escreva("\n2 - Emitir relatório de vendas.")
      escreva("\n3 - Sair.")

      escreva("\nDigite sua opção: \n")
      leia(opcao)

      se (opcao == 1){
        inicioRegistro()
      }
      se (opcao == 2){
        inicioValorMedio()
      }
      se (opcao == 3){
        limpa()
        escreva("Programa finalizado.")
      }
    }
  }

  funcao inicioRegistro(){
    real valorVenda
      
    escreva("Digite o valor da venda: ")
    leia(valorVenda)
    se (valorVenda >= 1){
      escreva("Valor adicionado ao caixa.")
      saldo = saldo + valorVenda
      contagem = contagem + 1
    }
  }

  funcao inicioValorMedio(){
    valorMedio = saldo / contagem
    escreva("O valor médio de vendas é de ", valorMedio)

  }

}