package Java;

import java.util.Locale;
import java.util.Scanner;

public class ValorX {
    public static void main(String[] args) {
        try (Scanner entrada = new Scanner(System.in).useLocale(Locale.US)) {
            System.out.println("Digite o número de tentativas: ");
            int numeroTentativas = entrada.nextInt();
            System.out.println("Foram realizadas " + numeroTentativas);

            System.out.println("Qual o valor de um x-salada? ");
            double x = entrada.nextDouble();
            System.out.println("O valor de um X é de R$" + x);
        }


    }
}