
import java.util.Scanner;

public class Media2 {
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        
        System.out.println("Digite a primeira nota: " );
        double a = scanner.nextDouble();
        if (a < 0 || a > 10 ) {
            System.out.println("Nota inválida.");            
            return;
        }
        System.out.println("Digite a segunda nota: " );
        double b = scanner.nextDouble();
        if (b < 0 || b > 10) {
            System.out.println("Nota inválida.");            
            return;
        }
        System.out.println("Digite a terceira nota: " );
        double c = scanner.nextDouble();
        if (c < 0 || c > 10) {
            System.out.println("Nota inválida.");           
            return;
        }
        System.out.println("Digite a quarta nota: " );
        double d = scanner.nextDouble();
        if (d < 0 || d > 10) {
            System.out.println("Nota inválida.");            
            return;
        }
        
        double media = media(a, b, c, d);
        System.out.println("A média é: " + media);
       
        if (media >= 7) {
            System.out.println("Aprovado.");
        } else if (media < 7 && media >= 5) {
            System.out.println("Recuperação.");
        } else {
            System.out.println("Reprovado.");
        }
    }

    public static double media(double a, double b, double c, double d) {
        return (a + b + c + d) / 4;
    }

    
}