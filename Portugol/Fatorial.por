programa {
  funcao inicio() {

    inteiro numero
    inteiro fatorial = 1
   
    escreva("Digite um número inteiro para calcular o fatorial: ")
    leia(numero)

    se (numero < 0){
      escreva("Não é possível calcular fatorial de número negativo.")   
    }
    senao
    {
        para (inteiro aux = 1; aux <= numero ; aux++){ 
           fatorial = (fatorial * aux)
        }
        escreva("O fatorial de ", numero, " é: ", fatorial)
      }
    }
  }
}