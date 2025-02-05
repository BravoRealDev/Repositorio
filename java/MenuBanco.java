import java.util.Scanner;

public class MenuBanco {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        double saldo = 0;

        while (true) {
            System.out.println("\nMenu do Banco:");
            System.out.println("1. Depositar valor");
            System.out.println("2. Saldo");
            System.out.println("3. Sacar valor");
            System.out.println("4. Sair");
            System.out.print("Escolha uma opção: ");

            int opcao = scanner.nextInt();

            switch (opcao) {
                case 1:
                    System.out.print("Digite o valor a depositar: ");
                    double valorDeposito = scanner.nextDouble();
                    saldo += valorDeposito;
                    System.out.println("Depósito realizado com sucesso.");
                    break;
                case 2:
                    System.out.println("Saldo atual: R$" + saldo);
                    break;
                case 3:
                    System.out.print("Digite o valor a sacar: ");
                    double valorSaque = scanner.nextDouble();
                    if (valorSaque <= saldo) {
                        saldo -= valorSaque;
                        System.out.println("Saque realizado com sucesso.");
                    } else {
                        System.out.println("Saldo insuficiente.");
                    }
                    break;
                case 4:
                    System.out.println("Saindo do menu.");
                    return;
                default:
                    System.out.println("Opção inválida.");
            }
        }
    }
}