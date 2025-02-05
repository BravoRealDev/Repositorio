
import java.util.Scanner;

public class Senha2 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        String senha = "padrao";
        String senhaDigitada = "";

        int opcao = 0;
        while (opcao < 3){
            System.out.println("Digite a senha: ");
            senhaDigitada = scanner.next();
            if (senha.equals(senhaDigitada)){
                System.out.println("Senha correta.");
                opcao = 3;
            } else {                
                System.out.println("Senha incorreta, tente novamente. Tentativa: " + opcao);
                opcao++;
            }                      
        }
    }
}
