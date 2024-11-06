package Java;

import java.text.DecimalFormat;
import java.util.Scanner;

public class Exercicio6 {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        DecimalFormat decimalFormat = new DecimalFormat("0.000");

        System.out.print("Digite a distância em Metros: ");
        double metros = scanner.nextDouble();

        double pes = metros * 3.28084;

        System.out.println("A distância em pés é de " + decimalFormat.format(pes) + "ft");

        scanner.close();

    }
}