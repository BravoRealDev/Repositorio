import java.text.DecimalFormat;
import java.util.InputMismatchException;
import java.util.Scanner;

public class CalculadoraCientifica2 {

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
        double numEmRadianos = Math.toRadians(num); // Converte para radianos
        return Math.sin(numEmRadianos);
    }

    public static double cosseno(double num) {
        double numEmRadianos = Math.toRadians(num); // Converte para radianos
        return Math.cos(numEmRadianos);
    }

    public static double tangente(double num) {
        double numEmRadianos = Math.toRadians(num); // Converte para radianos
        return Math.tan(numEmRadianos);
    }

    public static double logaritmo(double num) {
        return Math.log(num);
    }

    public static double potencia(double base, double expoente) {
        return Math.pow(base, expoente);
    }

    public static double raizQuadrada(double num) {
        if (num < 0) {
            System.out.println("Erro: Não é permitido o cálculo de raizes negativas.");
            return Double.NaN; // Retorna "Not a Number" para indicar erro
        }
        return Math.sqrt(num);
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int opcao = -1;
        double num1 = 0, num2 = 0; // Inicializa as variáveis

        do {
            System.out.println("\nMenu de Operações:");
            System.out.println("1. Adição");
            System.out.println("2. Subtração");
            System.out.println("3. Multiplicação");
            System.out.println("4. Divisão");
            System.out.println("5. Seno");
            System.out.println("6. Cosseno");
            System.out.println("7. Tangente");
            System.out.println("8. Logaritmo Natural (ln)");
            System.out.println("9. Potência");
            System.out.println("10. Raiz Quadrada");
            System.out.println("0. Sair");
            System.out.print("Escolha uma operação: ");

            try {
                opcao = scanner.nextInt();

                if (opcao >= 1 && opcao <= 10) {
                    if (opcao >= 1 && opcao <= 4 || opcao == 9) { // Operações com dois números
                        System.out.print("Digite o primeiro número: ");
                        num1 = scanner.nextDouble();
                        if (opcao >= 1 && opcao <= 4) {
                            System.out.print("Digite o segundo número: ");
                            num2 = scanner.nextDouble();
                        } else {
                            System.out.print("Digite o expoente: ");
                            num2 = scanner.nextDouble();
                        }
                    } else { // Operações com um número
                        System.out.print("Digite o número: ");
                        num1 = scanner.nextDouble();
                    }

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
                            resultado = potencia(num1, num2);
                            break;
                        case 10:
                            resultado = raizQuadrada(num1);
                            break;
                    }

                    // Formata a saída para no máximo 4 casas decimais
                    DecimalFormat df = new DecimalFormat("#.####");
                    System.out.println("Resultado: " + df.format(resultado));
                } else if (opcao != 0) {
                    System.out.println("Opção inválida. Tente novamente.");
                }
            } catch (InputMismatchException e) {
                System.out.println("Entrada inválida. Digite um número inteiro.");
                scanner.next(); // Limpa o buffer do scanner
            }
        } while (opcao != 0);

        System.out.println("Sistema encerrado.");
        scanner.close();
    }
}