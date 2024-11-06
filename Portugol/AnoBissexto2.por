programa {
  funcao inicio() {

    inteiro ano
    inteiro bissexto 

    escreva("Digite o ano: ")
    leia(ano)
    limpa()

    logico expressao = (ano % 400 == 0) ou (ano % 4 == 0 e ano % 100 != 0)

    se(expressao) {
      escreva("Este ano é bissexto.")
        }
      senao {
         escreva("Não é bissexto.") 

        }
      }
    }
  }
}