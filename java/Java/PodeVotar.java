package Java;

import java.util.Scanner;

public class PodeVotar {
    public static void main(String[] args) {
        try (Scanner scanner = new Scanner(System.in)) {

            System.out.println("Digite a idade: ");
            int idade = scanner.nextInt();

            if (idade < 16){
                System.out.println("Ainda não é possível tirar o título de eleitor.");                
            
            } else if (idade < 18){
                System.out.println("Pode tirar o título, contudo, o voto é facultativo.");
            
            } else if (idade > 70){
                System.out.println("O voto é facultativo.");

            } else {
                System.out.println("Pode tirar o título e o voto é obrigatório.");
                
            }  
            
            scanner.close();
        }    
    }
}
