package Java;

import java.util.Scanner;

public class ConverterSegundos {
    public static void main(String[] args) {
        try (Scanner scanner = new Scanner(System.in)) {
            System.out.print("Digite os segundos para converter em minutos: ");
            int segundos = scanner.nextInt();
            
            int minutos = segundos / 60;
            int segundos2 = segundos % 60;
            
            System.out.println("O tempo informado em segundos após convertido fica: " + minutos + " Minuto(s) e " + segundos2 + " segundos.");
        }
    
    }
}