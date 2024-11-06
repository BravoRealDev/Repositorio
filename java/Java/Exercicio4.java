package Java;

import java.util.Scanner;

public class Exercicio4 {
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        System.out.print("Digite a rua: ");
        String rua = scanner.nextLine();

        System.out.print("Digite o número: ");
        int numero = scanner.nextInt();

        scanner.nextLine(); // Limpar o buffer
        System.out.print("Digite o bairro: ");
        String bairro = scanner.nextLine();

        System.out.print("Digite o CEP: ");
        String cep = scanner.nextLine();

        System.out.println("O endereço completo do SENAI Criciúma é: " + rua + ", " + numero + ". " + bairro + " - CEP " + cep + ".");
    }
}
