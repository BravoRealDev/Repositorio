import java.util.Scanner;

public class ContarVogais3 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Digite uma palavra: ");
        String palavra = scanner.nextLine();

        int contadorVogais = 0;

        palavra = palavra.toLowerCase();

        for (int i = 0; i < palavra.length(); i++) {
            char caractere = palavra.charAt(i);
            if (caractere == 'a' || caractere == 'e' || caractere == 'i' || caractere == 'o' || caractere == 'u') {
                contadorVogais++;
            }
        }

        System.out.println("A palavra '" + palavra + "' tem " + contadorVogais + " vogais.");
    }
}