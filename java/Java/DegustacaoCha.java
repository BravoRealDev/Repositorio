import java.util.Scanner;

public class DegustacaoCha {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int tipoChaCorreto = scanner.nextInt();

        int competidorA = scanner.nextInt();
        int competidorB = scanner.nextInt();
        int competidorC = scanner.nextInt();
        int competidorD = scanner.nextInt();
        int competidorE = scanner.nextInt();

        int acertos = 0;

        if (competidorA == tipoChaCorreto) {
            acertos++;
        }
        if (competidorB == tipoChaCorreto) {
            acertos++;
        }
        if (competidorC == tipoChaCorreto) {
            acertos++;
        }
        if (competidorD == tipoChaCorreto) {
            acertos++;
        }
        if (competidorE == tipoChaCorreto) {
            acertos++;

        System.out.println(acertos);
        }
    }    
}