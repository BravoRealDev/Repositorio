package Java;

import java.util.Scanner;

public class OperadorAritmetico {
    public static void main(String[] args){
        try (Scanner scanner = new Scanner(System.in)){
            
            System.out.println("Digite o primeiro valor: ");
            double primeiroValor = scanner.nextDouble();
            
            System.out.println("Digite o segundo valor: ");
            double segundoValor = scanner.nextDouble();


            double soma = primeiroValor + segundoValor;
            System.out.println("O resultado da soma é " + soma);
            
            double subtracao = primeiroValor - segundoValor;
            System.out.println("O resultado da subtração é " + subtracao);
            
            scanner.nextLine();
            double multriplicacao = primeiroValor * segundoValor;
            System.out.println("O resultado da multiplicação é " + multriplicacao);
            
            double divisao = primeiroValor / segundoValor;
            System.out.println("O resultado da divisão é " + divisao);
        }
    }    
}
