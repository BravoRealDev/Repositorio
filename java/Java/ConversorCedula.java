package Java;

import java.util.Scanner;

public class ConversorCedula {
    public static void main(String[] args) {
        try (Scanner scanner = new Scanner(System.in)) {
        
        System.out.println("Digite o valor a ser sacado: ");
        int valorSaque = scanner.nextInt();
       
        int[] notas = {100, 50, 20, 10, 5};
        //int[] quantidadeNotas = new int[notas.length];
        int[] quantidadeNotas = {0,0,0,0,0};

        for (int i = 0 ; i < notas.length; i++){
            while (valorSaque >= notas[i]){
                valorSaque = valorSaque - 100;
                quantidadeNotas[i] = quantidadeNotas[i] + 1; 
            }
            System.out.println("A quantidade de notas a serem sacadas é: " + notas[i] + " - " + quantidadeNotas[i]);

    }

        
        scanner.close();
    }
    }    
}
