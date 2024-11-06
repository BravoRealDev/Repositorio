programa {
  funcao inicio() {

    inteiro ano
    inteiro bissexto 

    escreva("Digite o ano: ")
    leia(ano)
    limpa()

    bissexto = ano % 400

    se(bissexto == 0) {
       escreva("É bissexto")}
       senao {
       escreva("Não é bissexto")
    }
  }
}

