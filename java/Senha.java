import java.util.Scanner;

public class Senha {
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Digite uma senha para a sua conta: ");
        String senhaOriginal = scanner.nextLine();

        System.out.println("Digite a senha novamente: ");
        String senhaDigitada = scanner.nextLine();

        if (senhaOriginal.equals(senhaDigitada)){
            System.out.println("Senha correta.");
        } else {
            System.out.println("Senha incorreta.");
        }
        scanner.close();
    }
}
