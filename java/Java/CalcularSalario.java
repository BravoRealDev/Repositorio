package Java;
import java.util.Scanner;

public class CalcularSalario {
    public static void main(String[] args) {
        try (Scanner scanner = new Scanner(System.in)) {

            System.out.println("Digite a quantidade de dias trabalhados: ");
            int diasTrabalhados = scanner.nextInt();
            System.out.println("Digite o valor da hora trabalhada: ");
            int valorHoraTrabalhada = scanner.nextInt();
        
            int valorDiasTrabalhados = diasTrabalhados * valorHoraTrabalhada;
        
        if (valorDiasTrabalhados <= 2259.20){
        System.out.println("O salário referente ao(s) " + diasTrabalhados + " dias trabalhados é de R$" + valorDiasTrabalhados);

        } else if (valorDiasTrabalhados <= 2826.65){
            int valorDiasTrabalhados1 = (int) (valorDiasTrabalhados - (valorDiasTrabalhados * 0.075));      
        System.out.println("O salário referente ao(s) " + diasTrabalhados + " dias trabalhados é de R$" + valorDiasTrabalhados1);
        
        } else if (valorDiasTrabalhados <= 3751.05){
            int valorDiasTrabalhados2 = (int) (valorDiasTrabalhados - (valorDiasTrabalhados * 0.15));   
            System.out.println("O salário referente ao(s) " + diasTrabalhados + " dias trabalhados é de R$" + valorDiasTrabalhados2);

        } else if (valorDiasTrabalhados <= 4664.68){            
            int valorDiasTrabalhados3 = (int) (valorDiasTrabalhados - (valorDiasTrabalhados * 0.225)); 
            System.out.println("O salário referente ao(s) " + diasTrabalhados + " dias trabalhados é de R$" + valorDiasTrabalhados3);
        } else {
            int valorDiasTrabalhados4 = (int) (valorDiasTrabalhados - (valorDiasTrabalhados * 0.275));
            System.out.println("O salário referente ao(s) " + diasTrabalhados + " dias trabalhados é de R$" + valorDiasTrabalhados4);
        }  

        scanner.close();
        }
    }
}
