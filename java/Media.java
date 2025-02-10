
import java.util.Scanner;

public class Media {
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        System.out.println("Digite a primeira nota: " );
        double a = scanner.nextDouble();
        System.out.println("Digite a segunda nota: " );
        double b = scanner.nextDouble();
        System.out.println("Digite a terceira nota: " );
        double c = scanner.nextDouble();

        System.out.println("A média é: " + media(a, b, c));
    }

    public static double media(double a, double b, double c) {
        return (a + b + c) / 3;
    }
    
}
