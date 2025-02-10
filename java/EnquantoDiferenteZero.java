import java.util.Scanner;

public class LeituraNumeros {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int numero;

        System.out.println("Digite números inteiros (digite 0 para sair):");
        
        while (true) {
            numero = scanner.nextInt();
            
            if (numero == 0) {
                break;
            }
           
            System.out.println("Número digitado: " + numero);
        }

        System.out.println("Programa encerrado.");
        scanner.close();
    }
}