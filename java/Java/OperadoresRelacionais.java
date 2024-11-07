package Java;

public class OperadoresRelacionais {
    public static void main(String[] args) {
        
        int x = 10;
        int y = 5;

        //exemplos de comparações
        boolean igual = x == y;
        System.out.println(igual);

        boolean diferente = x != y;
        System.out.println(diferente);

        boolean menor = x < y;
        System.out.println(menor);
        
        boolean maior = x > y;
        System.out.println(maior);

        boolean maiorIgual = x >= y;
        System.err.println(maiorIgual);

        boolean menorIgual = x <= y;
        System.err.println(menorIgual);
            
    }
    
}
