import java.util.Scanner;

public class ContarPalavras {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Digite uma frase: ");
        String frase = scanner.nextLine();

        int contadorPalavras = 1;

        for (int i = 0; i < frase.length(); i++) {
            char caractere = frase.charAt(i);
            if (caractere == ' ') {
                contadorPalavras++;
            }
        }

        System.out.println("A frase tem " + contadorPalavras + " palavras.");
    }
}