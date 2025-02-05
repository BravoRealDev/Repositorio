import java.util.Scanner;

public class VerificaPalindromo {
    public static void main(String[] args) {
        try (Scanner scanner = new Scanner(System.in)) {
            System.out.print("Digite uma palavra: ");
            String palavra = scanner.nextLine();

            palavra = palavra.replaceAll("[^a-zA-Z]", "").toLowerCase();

            int inicio = 0;
            int fim = palavra.length() - 1;
            boolean ehPalindromo = true;

            while (inicio < fim) {
                if (palavra.charAt(inicio) != palavra.charAt(fim)) {
                    ehPalindromo = false;
                    break;
                }
                inicio++;
                fim--;
            }

            if (ehPalindromo) {
                System.out.println("A palavra '" + palavra + "' é um palíndromo.");
            } else {
                System.out.println("A palavra '" + palavra + "' não é um palíndromo.");
            }
        }
    }
}