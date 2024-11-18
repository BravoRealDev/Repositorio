public class Fibonacci {
    public static void main(String[] args) {
        int num1 = 0, num2 = 1;
        int i = 0;

        System.out.print("Os 10 primeiros números de Fibonacci são: ");

        while (i < 10) {
            System.out.print(num1 + " ");

            int temp = num1 + num2;
            num1 = num2;
            num2 = temp;

            i++;
        }
    }
}