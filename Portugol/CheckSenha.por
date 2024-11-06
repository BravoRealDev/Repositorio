programa { 
  funcao inicio() {
    
    real senha, senhadigitada
    
      enquanto(verdadeiro){
      escreva("\nDigite sua senha: ")
      leia(senhadigitada)
      limpa()

      senha = 12345   
      se (senhadigitada == senha)
        escreva("Usuário autenticado")
        senao 
        escreva("Senha incorreta")

    }
  }    
}