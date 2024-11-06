package Java;

public class Exercicio3 {
    public static void main(String[] args) {

        byte b = 127;
        short s = 32767;
        int i = 2147483647;
        long l = 9223372036854775807L; // Long precisa do 'L' no final
        float f = 3.14f; // Float precisa do 'f' no final
        double d = 1.7976931348623157e+308;
        char c = 'A';
        boolean bool = true;

        System.out.println("Byte: " + b);
        System.out.println("Short: " + s);
        System.out.println("Int: " + i);
        System.out.println("Long: " + l);
        System.out.println("Float: " + f);
        System.out.println("Double: " + d);
        System.out.println("Char: " + c);
        System.out.println("Boolean: " + bool);
    }
}
