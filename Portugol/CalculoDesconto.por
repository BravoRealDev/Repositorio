programa {
  funcao inicio() {
    real valorCompra, desconto2, desconto1, semDesconto, calculo10, calculo20

    escreva("Forneça o valor da sua compra: ")
    leia(valorCompra)
    se(valorCompra <= 100) {
      escreva("Seu produto não possui desconto e o valor final é R$", valorCompra)
    }
    se(valorCompra > 100 e valorCompra <= 200) {
      calculo10 = valorCompra * 0.9
      escreva("Seu(s) produto(s) possui 10% de desconto, e o valor final fica em: R$", calculo10)
    }
    se(valorCompra > 200) {
      calculo20 = valorCompra * 0.8
      escreva("Seu(s) produto(s) possui desconto de 20% de desconto, e o valor final fica em: R$", calculo20)
    }
  }
}
