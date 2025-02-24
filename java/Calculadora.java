
import java.util.Scanner;

public class Calculadora {

    public static double adicionar(double num1, double num2) {
        return num1 + num2;
    }

    public static double subtrair(double num1, double num2) {
        return num1 - num2;
    }

    public static double multiplicar(double num1, double num2) {
        return num1 * num2;
    }

    public static double dividir(double num1, double num2) {
        if (num2 == 0) {
            System.out.println("Erro: Divisão por zero não permitida.");
            return Double.NaN; // Retorna "Not a Number" para indicar erro
        }
        return num1 / num2;
    }

    public static double seno(double num) {
        return Math.sin(num);
    }

    public static double cosseno(double num) {
        return Math.cos(num);
    }

    public static double tangente(double num) {
        return Math.tan(num);
    }

    public static double logaritmo(double num) {
        return Math.log(num);
    }

    public static double potencia(double base, double expoente) {
        return Math.pow(base, expoente);
    }

    public static double raizQuadrada(double num) {
        return Math.sqrt(num);
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int opcao;

        do {
            System.out.println("\nMenu de Operações:");
            System.out.println("1. Adição");
            System.out.println("2. Subtração");
            System.out.println("3. Multiplicação");
            System.out.println("4. Divisão");
            System.out.println("5. Seno");
            System.out.println("6. Cosseno");
            System.out.println("7. Tangente");
            System.out.println("8. Logaritmo");
            System.out.println("9. Potência");
            System.out.println("10. Raiz Quadrada");
            System.out.println("0. Sair");
            System.out.print("Escolha uma operação: ");
            opcao = scanner.nextInt();

            if (opcao >= 1 && opcao <= 4) {
                System.out.print("Digite o primeiro número: ");
                double num1 = scanner.nextDouble();
                System.out.print("Digite o segundo número: ");
                double num2 = scanner.nextDouble();

                double resultado = 0;

                switch (opcao) {
                    case 1:
                        resultado = adicionar(num1, num2);
                        break;
                    case 2:
                        resultado = subtrair(num1, num2);
                        break;
                    case 3:
                        resultado = multiplicar(num1, num2);
                        break;
                    case 4:
                        resultado = dividir(num1, num2);
                        break;
                    case 5:
                        resultado = seno(num1);
                        break;
                    case 6:
                        resultado = cosseno(num1);
                        break;
                    case 7:
                        resultado = tangente(num1);
                        break;
                    case 8:
                        resultado = logaritmo(num1);
                        break;
                    case 9:
                        System.out.print("Digite o expoente: ");
                        double expoente = scanner.nextDouble();
                        resultado = potencia(num1, expoente);
                        break;
                    case 10:
                        resultado = raizQuadrada(num1);
                        break;
                }

                System.out.println("Resultado: " + resultado);
            } else if (opcao != 0) {
                System.out.println("Opção inválida. Tente novamente.");
            }
        } while (opcao != 0);

        System.out.println("Sistema encerrado.");
        scanner.close();
    }
}
