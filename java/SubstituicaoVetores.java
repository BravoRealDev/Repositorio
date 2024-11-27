
import java.util.Scanner;

public class SubstituicaoVetores {
    public static void main(String[] args) {
        try (Scanner scanner = new Scanner(System.in)) {
            int[] x = new int[10];

            for(int i = 0; i < 10; i++){
            System.out.println("Digite o valor " + (i + 1));
            x[i] = scanner.nextInt();
            }

            for (int i = 0; i < 10; i++) {
                if (x[i] <= 0){
                    x[i] = 1;
                }
            }

            for (int i = 0; i < 10; i++) {
                System.out.println("X[" + i + "] = " + x[i]);
            }
        }
        
    }
    
}
