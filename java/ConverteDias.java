package Java;

import java.util.Scanner;

public class ConverteDias {
    public static void main(String[] args) {
        try (Scanner scanner = new Scanner(System.in)) {

            System.out.print("Digite os dias para converter: ");
            int dias = scanner.nextInt();
            
            int semanas = dias / 7;
            int dias2 = dias % 7;
            
            System.out.println("O valor resulta em: " + semanas + " semana(s) e " + dias2 + " dias.");
        }
    
    }
}