import java.util.Scanner;

public class CustoViagem {

    public static double calcularCustoViagem(String nomeCidade, double qtdKm, double consumoLitro, double precoComb) {
        double qtdLitro = (qtdKm / consumoLitro);
        double custoTotal = (qtdLitro * precoComb);
        System.out.println("Sua viagem para " + nomeCidade + " consumirá " + qtdLitro + " Litros, e terá um custo total de R$" + custoTotal);
        return custoTotal;
    }

    public static void main(String[] args) {
        try (Scanner scanner = new Scanner(System.in)) {

            System.out.println("Qual a cidade destino?");
            String nomeCidade = scanner.nextLine();
            System.out.println("Digite a distância a ser percorrida: ");
            double qtdKm = scanner.nextDouble();
            System.out.println("Digite o consumo do veículo em km/l (ida e volta): ");
            double consumoLitro = scanner.nextDouble();
            System.out.println("Digite o valor do combustível: ");
            double precoComb = scanner.nextDouble();

            calcularCustoViagem(nomeCidade, qtdKm, consumoLitro, precoComb);

            scanner.close();
        }
    }
}