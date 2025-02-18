
import java.util.Scanner;


public class CalculoSalario2 {
    public static void main(String[] args) {
        try (Scanner scanner = new Scanner(System.in)) {
            
            System.out.println("Digite o nome do colaborador: ");
            String nome = scanner.next();
            System.out.println("Digite o salário base: ");
            int salarioBase = scanner.nextInt();
            System.out.println("Digite o tempor de serviço do colaborador: ");
            int tempoDeServico = scanner.nextInt();

            if (tempoDeServico >= 5)  {
                System.out.println("O colaborador " + nome + " tem direito a um bônus de 10% sobre o salário base.");
                System.out.println("O salário total do colaborador " + nome + " é de " + (salarioBase * 1.1));
            } else if (tempoDeServico >= 3)  {
                System.out.println("O colaborador " + nome + " tem direito a um bônus de 5% sobre o salário base.");
                System.out.println("O salário total do colaborador " + nome + " é de " + (salarioBase * 1.05));
                }else {
                System.out.println("O colaborador " + nome + " não tem direito a bônus sobre o salário base.");
                System.out.println("O salário total do colaborador " + nome + " é de R$" + salarioBase);
            }

        }
    }
}
   

    
