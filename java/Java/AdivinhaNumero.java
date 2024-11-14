package Java;

import java.util.Random;
import java.util.Scanner;


public class AdivinhaNumero {
    public static void main(String[] args) {
        
        Random random = new Random();
        Scanner scanner = new Scanner(System.in);

        int numeroAleatorio = random.nextInt(100) + 1;
        int palpite;

        System.out.println("Adivinhe qual o número gerado! ");

        do { 
            System.out.print("Digite seu palpite: ");
            palpite = scanner.nextInt();
            if (palpite < numeroAleatorio){
                System.out.println("O número é maior.");
                } else if (palpite > numeroAleatorio){
                    System.out.println("O número é menor.");
                } else {
                    System.out.println("Parabéns, você acertou!");
                    
                }
        } while (palpite != numeroAleatorio);
        scanner.close();
    }
    
}
