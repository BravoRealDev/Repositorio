
import java.util.Scanner;



public class RevisaoFuncoes {  

    public static int soma(int a, int b) {
        return a + b;
    }
    
    public static int subtrai(int a, int b) {
        return a - b;
    }
    
    public static int multiplica(int a, int b) {
        return a * b;
    }
    
    public static double divide(int a, int b) {
        if (b == 0) {
            throw new IllegalArgumentException("Divisor não pode ser zero");
        }
        return (double) a / b;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.println("Digite o primeiro número: ");
        num1 = sc.nextInt();

        System.out.println("Digite o segundo número: ");
        num2 = sc.nextInt();

        System.out.println("Soma: " + soma(num1, num2));
        System.out.println("Subtração: " + subtrai(num1, num2));
        System.out.println("Multiplicação: " + multiplica(num1, num2));
        System.out.println("Divisão: " + divide(num1, num2));
    }
}