package Java;

import java.text.Normalizer;
import java.util.Scanner;
import java.util.regex.Pattern;

public class ContarVogais {
    public static void main(String[] args) {

        try (Scanner scanner = new Scanner(System.in)) {
            System.out.println("Digite uma palavra: ");
            String palavra = scanner.nextLine().toLowerCase();
            palavra = removerAcentos(palavra);            
            int numeroVogais = 0;

            for (int contador = 0; contador < palavra.length(); contador++) {
                char letra = palavra.charAt(contador);
                if (letra == 'a' || letra == 'e' || letra == 'i' || letra == 'o' || letra == 'u') {
                    numeroVogais++;
                }
            }

            System.out.println("A palavra " + palavra + ", possui " + numeroVogais + " vogais.");
        }
    }


    public static String removerAcentos(String str) {
        return Normalizer.normalize(str, Normalizer.Form.NFD).replaceAll("[^\\p{ASCII}]", "");
    }
    public static String deAccent(String str) {
    String nfdNormalizedString = Normalizer.normalize(str, Normalizer.Form.NFD); 
    Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
    return pattern.matcher(nfdNormalizedString).replaceAll("");
}
}
