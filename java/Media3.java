
import java.util.Scanner;

public class Media3 {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        double a = obterNotaValida(scanner, "primeira");
        double b = obterNotaValida(scanner, "segunda");
        double c = obterNotaValida(scanner, "terceira");
        double d = obterNotaValida(scanner, "quarta");

        double media = (a + b + c + d) / 4;
        System.out.println("A média é: " + media);

        if (media >= 7) {
            System.out.println("Aprovado.");
        } else if (media >= 5) {
            System.out.println("Recuperação.");
        } else {
            System.out.println("Reprovado.");
        }
        scanner.close();
    }

    public static double obterNotaValida(Scanner scanner, String ordem) {
        double nota;
        while (true) {
            System.out.println("Digite a " + ordem + " nota (entre 0 e 10):");
            nota = scanner.nextDouble();
            if (nota >= 0 && nota <= 10) {
                break;
            } else {
                System.out.println("Nota inválida. Digite novamente.");
            }
        }
        return nota;
    }

    public static double media(double a, double b, double c, double d) {
        return (a + b + c + d) / 4;
    }
}
