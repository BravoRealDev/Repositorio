programa {
  funcao inicio() {
    real nota

    escreva("Digite sua nota: ")
    leia(nota)
    limpa()

    se(nota >= 9 e nota <= 10) {
      escreva("Seu conceito é A")
    }
    se(nota >= 7 e nota <= 8.9) {
      escreva("Seu conceito é B")
    }
    se(nota >= 5 e nota <= 6.9) {
      escreva("Seu conceito é C")
    }
     se(nota >= 0 e nota <= 4.9) {
      escreva("Seu conceito é D")
    }
  }
}