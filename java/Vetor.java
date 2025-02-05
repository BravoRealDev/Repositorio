package Java;

public class Vetor {
    public static void main(String[] args) {
        
        int[] notas = new int[4];
        int[] maisNotas = {2, 3, 5, 9};

        notas[0] = 5;
        notas[1] = 6;
        notas[2] = 5;
        notas[3] = 5;

        //System.out.println(Arrays.toString(notas));
        //System.out.println(Arrays.toString(maisNotas));

        for (int i = 0; i < notas.length; i++) {
            System.out.println("Nota " + i + " = " + notas[i]);
        }


    


    }
    
}
