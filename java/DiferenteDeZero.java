
import java.util.Scanner;

public class DiferenteDeZero { 
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int x = 0;
        System.out.println("Digite um número (zero para finalizar): ");
        x = sc.nextInt();

        while (x != 0) {
            System.out.println("Digite um número (zero para finalizar): ");
            x = Integer.parseInt(System.console().readLine());
        }
    }
    
}
