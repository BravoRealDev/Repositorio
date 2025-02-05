import java.util.Scanner;

public class Tabuada2 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Digite o número da tabuada desejada: ");
        int numeroTabuada = scanner.nextInt();

        if (numeroTabuada < 0) {
            System.out.println("Número inválido. Digite um número positivo.");
            return; 
        }

        System.out.println("Tabuada do " + numeroTabuada + ":"); 

        int contador = 1;

        while (contador <= 10) {            
            int resultado = contador * numeroTabuada;
            System.out.println(contador + " x " + numeroTabuada + " = " + resultado);
            contador++;
        }

        scanner.close();
    }
}
