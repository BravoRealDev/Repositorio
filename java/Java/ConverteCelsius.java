package Java;

import java.util.Scanner;

public class ConverteCelsius {

    public static void main(String[] args) {
        try (Scanner scanner = new Scanner(System.in)) {
            System.out.print("Digite a temperatura em Celsius: ");
            double Celsius = scanner.nextDouble();
            
            double Fahrenheit = (Celsius * 9/5) + 32;
            
            System.out.println("A temperatura em Fahrenheit é de " + Fahrenheit + "Fº");
        }

    }

}