package Java;

import java.text.Normalizer;
import java.util.Scanner;

public class ContarVogais2 {

  public static void main(String[] args) {
    String word;
    Scanner scanner = new Scanner(System.in);
    int counter = 0;
    word = removerAcentos(scanner.nextLine()).toLowerCase();
    System.out.println(word);
    scanner.close();
    String[] processword = word.split("");
    for(String aux : processword){
      switch (aux){
        case "a":
        case "e":
        case "i":
        case "o":
        case "u":
          counter++;
          break;
      }
    }
    System.out.println(counter);
  }

  public static String removerAcentos(String str) {
    return Normalizer.normalize(str, Normalizer.Form.NFD).replaceAll("[^\\p{ASCII}]", "");
  }
}

