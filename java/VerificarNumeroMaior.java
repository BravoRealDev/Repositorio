public class VerificarNumeroMaior {
    public static void main(String[] args) {
        int num1 = 0;
        int num2 = 0;
        int maior = 0;
        Scanner sc = new Scanner(System.in);
        
        System.out.println("Digite o primeiro número: ");
        num1 = sc.nextInt();

        System.out.println("Digite o segundo número: ");
        num2 = sc.nextInt();

        if (num1 > num2) {
            maior = num1;
        } else if (num1 == num2{
            System.out.println("Os números são iguais");
            return;
        } else {
            maior = num2;
        }

        System.out.println("O maior número é: " + maior);
    }
    
}
