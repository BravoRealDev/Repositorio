package Java;

public class OperadoresLogicos {
    public static void main(String[] args) {
        
        //E - &&
        boolean comparacaoE = (8 > 3) && (4 < 2);
        System.out.println(comparacaoE);

        //OU - ||
        boolean comparacaoOu = (8 > 3) || (4 < 2);
        System.out.println(comparacaoOu);
        
        //NAO - !
        boolean comparacaoNao = (8 > 3) != (4 < 2);
        System.out.println(comparacaoNao);
        
    }
    
}
