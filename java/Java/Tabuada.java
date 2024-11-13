package Java;

public class Tabuada {
    public static void main(String[] args) {
        
        int numeroTabuada = 5;
        int contador = 1;

        while (contador <= 10) {
            int resultado = contador + numeroTabuada;
            System.out.println(contador + " x " + numeroTabuada + " = " + resultado);
            contador++;            
        }
    }
    
}
