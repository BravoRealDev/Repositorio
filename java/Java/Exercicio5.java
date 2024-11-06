package Java;

import java.util.Scanner;

public class Exercicio5 {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Digite a temperatura em Celsius: ");
        double Celsius = scanner.nextDouble();

        double Fahrenheit = (Celsius * 9/5) + 32;

        System.out.println("A temperatura em Fahrenheit é de " + Fahrenheit + "Fº");

        scanner.close();

    }

}